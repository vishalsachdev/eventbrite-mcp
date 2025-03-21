import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenv.config();

// Import tool implementations
import { listEvents, ListEventsParams } from './tools/events/listEvents';
import { getEventDetails, GetEventDetailsParams } from './tools/events/getEventDetails';

// Create MCP server
const server = new McpServer({
  name: process.env.MCP_SERVER_NAME || 'eventbrite',
  version: process.env.MCP_SERVER_VERSION || '0.1.0'
});

// Define event listing tool
server.tool(
  'list_events',
  {
    status: z.string().optional().describe('Filter by event status (draft, live, started, ended, completed, canceled)'),
    start_date: z.string().optional().describe('Filter by start date (ISO 8601 format)'),
    end_date: z.string().optional().describe('Filter by end date (ISO 8601 format)'),
    page: z.number().optional().describe('Page number for pagination'),
    page_size: z.number().optional().describe('Number of results per page')
  },
  async (args, extra) => {
    try {
      const result = await listEvents(args as ListEventsParams);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    } catch (error) {
      console.error(`Error executing list_events:`, error);
      throw error;
    }
  }
);

// Define event details tool
server.tool(
  'get_event_details',
  {
    event_id: z.string().describe('ID of the event to retrieve')
  },
  async (args, extra) => {
    try {
      const result = await getEventDetails(args as GetEventDetailsParams);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    } catch (error) {
      console.error(`Error executing get_event_details:`, error);
      throw error;
    }
  }
);

// Start the server
console.error('Starting Eventbrite MCP server...');

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
server.connect(transport).catch(error => {
  console.error('Error connecting to transport:', error);
  process.exit(1);
});

// Handle process termination
process.on('SIGINT', () => {
  console.error('Shutting down Eventbrite MCP server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error('Shutting down Eventbrite MCP server...');
  process.exit(0);
});
