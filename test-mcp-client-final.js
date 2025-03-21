const { spawn } = require('child_process');
const readline = require('readline');
const fs = require('fs');

// Start the MCP server
const server = spawn('node', ['dist/index.js'], {
  cwd: process.cwd(),
  env: { ...process.env },
  stdio: ['pipe', 'pipe', 'pipe']
});

// Create readline interface for reading server stdout line by line
const rl = readline.createInterface({
  input: server.stdout,
  crlfDelay: Infinity
});

// Handle server stderr
server.stderr.on('data', (data) => {
  console.error(`Server stderr: ${data}`);
});

// Handle server exit
server.on('exit', (code) => {
  console.log(`Server exited with code ${code}`);
  process.exit(0);
});

// Handle process termination
process.on('SIGINT', () => {
  server.kill();
  process.exit(0);
});

// Parse command line arguments
const args = process.argv.slice(2);
let status = 'live';
let startDate = '2023-01-01';
let endDate = '2025-12-31';

// Parse command line arguments
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--status' && i + 1 < args.length) {
    status = args[i + 1];
    i++;
  } else if (args[i] === '--start-date' && i + 1 < args.length) {
    startDate = args[i + 1];
    i++;
  } else if (args[i] === '--end-date' && i + 1 < args.length) {
    endDate = args[i + 1];
    i++;
  }
}

// Send initialize request
const initializeRequest = {
  jsonrpc: '2.0',
  id: 1,
  method: 'initialize',
  params: {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: {
      name: 'test-client',
      version: '1.0.0'
    }
  }
};

console.log('Sending initialize request...');
server.stdin.write(JSON.stringify(initializeRequest) + '\n');

// Process server responses
rl.on('line', (line) => {
  try {
    const response = JSON.parse(line);
    console.log('Received response:', JSON.stringify(response, null, 2));
    
    // If this is the initialize response, send the tool request
    if (response.id === 1 && response.result) {
      console.log('Server initialized successfully, sending tool request...');
      
      // Using the correct method name as per MCP specification
      setTimeout(() => {
        const toolRequest = {
          jsonrpc: '2.0',
          id: 2,
          method: 'tools/call',
          params: {
            name: 'list_events',
            arguments: {
              status: status,
              start_date: startDate,
              end_date: endDate
            }
          }
        };
        
        console.log('Sending list_events request:', JSON.stringify(toolRequest, null, 2));
        server.stdin.write(JSON.stringify(toolRequest) + '\n');
      }, 500);
    }
    
    // If this is the tool response, save it to a file and exit
    if (response.id === 2) {
      console.log('Tool execution completed');
      
      if (response.result && response.result.content && response.result.content[0] && response.result.content[0].text) {
        const eventsData = JSON.parse(response.result.content[0].text);
        const events = eventsData.events || eventsData;
        console.log(`Found ${events.length} events`);
        
        // Save the events to a file
        fs.writeFileSync('events.json', JSON.stringify(events, null, 2));
        console.log('Events saved to events.json');
      } else if (response.error) {
        console.error('Error executing tool:', response.error);
      }
      
      setTimeout(() => {
        server.kill();
        process.exit(0);
      }, 1000);
    }
  } catch (error) {
    console.error('Error parsing server response:', error);
  }
});
