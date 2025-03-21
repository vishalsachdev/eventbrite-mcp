# Eventbrite MCP Server Setup Guide

This guide will help you set up and configure the Eventbrite MCP Server for local development and usage with Claude Desktop or other MCP clients.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Eventbrite API key or OAuth credentials
- Claude Desktop or other MCP client
- Web browser (for using the events viewer)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/eventbrite-mcp.git
cd eventbrite-mcp
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file and add your Eventbrite API credentials:

```
EVENTBRITE_API_KEY=your_api_key_here
EVENTBRITE_OAUTH_TOKEN=your_oauth_token_here
```

## Obtaining Eventbrite API Credentials

### Personal Token (Simplest Method)

1. Log in to your Eventbrite account
2. Visit [your API Keys page](https://www.eventbrite.com/platform/api-keys)
3. Copy your private token

### OAuth App (For Multi-User Applications)

1. Visit [Eventbrite API Key Management](https://www.eventbrite.com/account-settings/apps)
2. Create a new OAuth application
3. Note your API Key, Client Secret, and set a Redirect URI
4. Follow the OAuth flow in the application to obtain user tokens

## Running the Server

### Development Mode

```bash
npm run dev
# or
yarn dev
```

### Production Mode

```bash
npm start
# or
yarn start
```

## Configuring with Claude Desktop

1. Open Claude Desktop
2. Go to Settings > MCP Servers
3. Add a new server with the following configuration:

```json
{
  "mcpServers": {
    "eventbrite": {
      "command": "npm",
      "args": ["start"],
      "cwd": "/path/to/eventbrite-mcp",
      "env": {
        "EVENTBRITE_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

4. Restart Claude Desktop
5. You should now see the Eventbrite MCP server available in Claude

## Testing the Server

### Manual Testing with Claude Desktop

1. Start the server
2. Open Claude Desktop
3. Try a simple command like: "List my upcoming Eventbrite events"

### Testing with the MCP Test Client

The project includes a dedicated test client that can be used to test the MCP server without requiring Claude Desktop.

```bash
# Run the test client with default parameters
node test-mcp-client-final.js

# Run with custom date range
node test-mcp-client-final.js --start-date="2025-01-01" --end-date="2025-12-31"

# Run with specific status filter
node test-mcp-client-final.js --status="live"
```

This client will start the MCP server, send an initialization request, and then call the `list_events` tool with the specified parameters.

### Using the Events Viewer

The project includes a web-based events viewer for displaying and filtering events.

```bash
# Start the events viewer
node view-events.js
```

This will:
1. Start a local HTTP server
2. Open your default web browser to the events viewer
3. If the `events.json` file doesn't exist, automatically fetch events from the Eventbrite API

The events viewer provides a user-friendly interface for:
- Viewing all events retrieved from Eventbrite
- Filtering events by date range
- Filtering events by status
- Viewing detailed event information

### Automated Testing

```bash
npm test
# or
yarn test
```

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Verify your API key is correct
   - Check that your token has the necessary permissions

2. **Connection Issues**
   - Ensure the server is running
   - Check Claude Desktop configuration
   - Verify network connectivity

3. **Rate Limiting**
   - Eventbrite API has rate limits
   - Implement caching for frequent requests

## Next Steps

After setup, you can:

1. Explore the available tools in the [API Documentation](./API.md)
2. Check out example workflows in the [Examples Documentation](./EXAMPLES.md)
3. Contribute to the project by implementing new tools or improving existing ones
