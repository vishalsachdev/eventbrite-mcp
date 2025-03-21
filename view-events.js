const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const http = require('http');
const { spawn } = require('child_process');

// Check if events.json exists, if not run the client to fetch events
if (!fs.existsSync('./events.json')) {
  console.log('Events file not found. Fetching events...');
  const client = spawn('node', ['test-mcp-client-final.js'], {
    stdio: 'inherit'
  });
  
  client.on('exit', (code) => {
    if (code === 0) {
      startServer();
    } else {
      console.error('Failed to fetch events. Please check the error and try again.');
      process.exit(1);
    }
  });
} else {
  startServer();
}

function startServer() {
  // Create a simple HTTP server to serve the HTML and JSON files
  const server = http.createServer((req, res) => {
    let filePath = '.';
    
    if (req.url === '/' || req.url === '/index.html') {
      filePath += '/events-viewer.html';
    } else if (req.url === '/events.json') {
      filePath += '/events.json';
    } else {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end(`Error loading ${filePath}: ${err.code}`);
        return;
      }
      
      // Set the appropriate content type
      const ext = path.extname(filePath);
      let contentType = 'text/html';
      
      if (ext === '.json') {
        contentType = 'application/json';
      }
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    });
  });
  
  const PORT = 3000;
  
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('Opening browser...');
    
    // Open the browser
    const url = `http://localhost:${PORT}/`;
    let command = '';
    
    switch (process.platform) {
      case 'darwin': // macOS
        command = `open ${url}`;
        break;
      case 'win32': // Windows
        command = `start ${url}`;
        break;
      default: // Linux and others
        command = `xdg-open ${url}`;
        break;
    }
    
    exec(command, (err) => {
      if (err) {
        console.error(`Failed to open browser: ${err}`);
        console.log(`Please open ${url} manually in your browser.`);
      }
    });
  });
  
  // Handle server shutdown
  process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  });
}
