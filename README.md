# Eventbrite MCP Server

A Model Context Protocol (MCP) server for Eventbrite event management, reporting, and analytics.

## Project Overview

This MCP server integrates with the Eventbrite API to provide tools for managing events, tracking attendees, and generating analytics reports. It's designed to work with Claude and other MCP clients to provide AI-assisted event management capabilities.

## Project Status

| Status | Description |
|--------|-------------|
| 🚧 In Progress | Basic functionality implemented |

Currently, the following tools are implemented:
- `list_events`: List events with optional filtering
- `get_event_details`: Get detailed information about a specific event

## Features

- **Event Management**: View, create, update, and publish events
- **Attendee Management**: List attendees, view details, and export attendee data
- **Sales Analytics**: Generate reports on ticket sales, revenue, and trends
- **Custom Reports**: Create and save custom reporting templates
- **Data Visualization**: Generate charts and graphs for key metrics

## Implementation Plan

### Phase 1: Setup & Core Infrastructure
- [x] Initialize project structure
- [x] Set up MCP server framework
- [x] Implement Eventbrite API authentication
- [x] Create basic API wrapper functions

### Phase 2: Event Management Tools
- [x] Implement `list_events` tool
- [x] Implement `get_event_details` tool
- [ ] Implement `create_event` tool
- [ ] Implement `update_event` tool
- [ ] Implement `publish_event` tool

### Phase 3: Attendee Management Tools
- [ ] Implement `list_attendees` tool
- [ ] Implement `get_attendee_details` tool
- [ ] Implement `export_attendee_data` tool

### Phase 4: Analytics & Reporting
- [ ] Implement `generate_sales_report` tool
- [ ] Implement `generate_attendance_report` tool
- [ ] Implement `generate_analytics_chart` tool
- [ ] Create data visualization components

### Phase 5: Testing & Documentation
- [x] Implement test MCP client
- [x] Create events viewer web interface
- [x] Comprehensive testing of event listing functionality
- [ ] Create comprehensive usage documentation
- [ ] Create example workflows

## Development Log

| Date | Description | Status |
|------|-------------|--------|
| 2025-03-20 | Project planning initiated | Completed |
| 2025-03-20 | Reviewed Eventbrite API documentation | Completed |
| 2025-03-20 | Reviewed MCP server implementation examples | Completed |
| 2025-03-20 | Created initial project documentation | Completed |
| 2025-03-20 | Implemented core MCP server structure | Completed |
| 2025-03-20 | Implemented Eventbrite API client | Completed |
| 2025-03-20 | Implemented list_events and get_event_details tools | Completed |
| 2025-03-20 | Created test MCP client | Completed |
| 2025-03-20 | Implemented events viewer UI | Completed |
| 2025-03-20 | Tested event retrieval with date filtering | Completed |

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Eventbrite API token (private token from your Eventbrite account)
- Claude Desktop or other MCP client

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/eventbrite-mcp.git

# Install dependencies
cd eventbrite-mcp
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your Eventbrite API token

# Build the project
npm run build

# Start the server
npm start
```

### Getting Your Eventbrite API Token

1. Log in to your Eventbrite account
2. Go to Account Settings > Developer Links > API Keys
3. Copy your private token
4. Add it to your .env file as EVENTBRITE_API_KEY=your_token_here

### Configuration with Claude Desktop

Add the following to your `claude_desktop_config.json` (located at `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

#### Option 1: Using npm start

```json
{
  "mcpServers": {
    "eventbrite": {
      "command": "npm",
      "args": ["start"],
      "cwd": "/path/to/eventbrite-mcp",
      "env": {
        "EVENTBRITE_API_KEY": "your_api_token_here"
      }
    }
  }
}
```

#### Option 2: Direct Node.js execution (recommended)

```json
{
  "mcpServers": {
    "eventbrite": {
      "command": "node",
      "args": ["/path/to/eventbrite-mcp/dist/index.js"],
      "cwd": "/path/to/eventbrite-mcp",
      "env": {
        "EVENTBRITE_API_KEY": "your_api_token_here"
      }
    }
  }
}
```

## Testing and Event Viewer

This project includes tools for testing the MCP server and viewing events:

### Test MCP Client

The `test-mcp-client-final.js` script allows you to test the MCP server's event retrieval functionality:

```bash
# Run the test client with default parameters
node test-mcp-client-final.js

# Run with custom date range
node test-mcp-client-final.js --start-date="2025-01-01" --end-date="2025-12-31"

# Run with specific status filter
node test-mcp-client-final.js --status="live"
```

### Events Viewer

The project includes a web-based events viewer for displaying and filtering events:

```bash
# Start the events viewer
node view-events.js
```

This will start a local web server and open the events viewer in your browser. The viewer allows you to:

- View all events retrieved from Eventbrite
- Filter events by date range
- Filter events by status
- View detailed event information

If the `events.json` file doesn't exist, the script will automatically fetch events from the Eventbrite API.

## License

MIT
