# Eventbrite MCP Server API Documentation

This document describes the MCP tools provided by the Eventbrite MCP Server.

## Tool Categories

- [Event Management](#event-management)
- [Attendee Management](#attendee-management)
- [Analytics & Reporting](#analytics--reporting)

## Event Management

### `list_events`

**Description**: List all events with filtering options

**Parameters**:
- `status` (string, optional): Filter by event status (draft, live, started, ended, completed, canceled)
- `start_date` (string, optional): Filter by start date (ISO 8601 format)
- `end_date` (string, optional): Filter by end date (ISO 8601 format)
- `page` (number, optional): Page number for pagination
- `page_size` (number, optional): Number of results per page

**Returns**:
- Array of event objects with basic information

**Example**:
```json
{
  "name": "list_events",
  "arguments": {
    "status": "live",
    "start_date": "2025-04-01T00:00:00Z",
    "page": 1,
    "page_size": 10
  }
}
```

**Implementation Status**: Not Started

### `get_event_details`

**Description**: Get detailed information about a specific event

**Parameters**:
- `event_id` (string, required): ID of the event to retrieve

**Returns**:
- Detailed event object with all available information

**Example**:
```json
{
  "name": "get_event_details",
  "arguments": {
    "event_id": "123456789"
  }
}
```

**Implementation Status**: Not Started

### `create_event`

**Description**: Create a new event

**Parameters**:
- `name` (string, required): Event name
- `description` (string, optional): Event description
- `start_date` (string, required): Event start date (ISO 8601 format)
- `end_date` (string, required): Event end date (ISO 8601 format)
- `currency` (string, required): Currency code (e.g., USD)
- `online_event` (boolean, optional): Whether the event is online
- `venue_id` (string, optional): ID of the venue
- `category_id` (string, optional): ID of the category
- `format_id` (string, optional): ID of the format
- `organizer_id` (string, optional): ID of the organizer

**Returns**:
- Created event object

**Example**:
```json
{
  "name": "create_event",
  "arguments": {
    "name": "My Awesome Event",
    "description": "This is going to be an amazing event!",
    "start_date": "2025-06-15T18:00:00Z",
    "end_date": "2025-06-15T21:00:00Z",
    "currency": "USD",
    "online_event": true
  }
}
```

**Implementation Status**: Not Started

### `update_event`

**Description**: Update an existing event

**Parameters**:
- `event_id` (string, required): ID of the event to update
- `name` (string, optional): Event name
- `description` (string, optional): Event description
- `start_date` (string, optional): Event start date (ISO 8601 format)
- `end_date` (string, optional): Event end date (ISO 8601 format)
- `currency` (string, optional): Currency code (e.g., USD)
- `online_event` (boolean, optional): Whether the event is online
- `venue_id` (string, optional): ID of the venue
- `category_id` (string, optional): ID of the category
- `format_id` (string, optional): ID of the format
- `organizer_id` (string, optional): ID of the organizer

**Returns**:
- Updated event object

**Example**:
```json
{
  "name": "update_event",
  "arguments": {
    "event_id": "123456789",
    "name": "Updated Event Name",
    "description": "Updated event description"
  }
}
```

**Implementation Status**: Not Started

### `publish_event`

**Description**: Publish a draft event

**Parameters**:
- `event_id` (string, required): ID of the event to publish

**Returns**:
- Published event object

**Example**:
```json
{
  "name": "publish_event",
  "arguments": {
    "event_id": "123456789"
  }
}
```

**Implementation Status**: Not Started

## Attendee Management

### `list_attendees`

**Description**: List attendees for an event with filtering options

**Parameters**:
- `event_id` (string, required): ID of the event
- `status` (string, optional): Filter by attendee status
- `page` (number, optional): Page number for pagination
- `page_size` (number, optional): Number of results per page

**Returns**:
- Array of attendee objects

**Example**:
```json
{
  "name": "list_attendees",
  "arguments": {
    "event_id": "123456789",
    "status": "attending",
    "page": 1,
    "page_size": 50
  }
}
```

**Implementation Status**: Not Started

### `get_attendee_details`

**Description**: Get detailed information about a specific attendee

**Parameters**:
- `attendee_id` (string, required): ID of the attendee

**Returns**:
- Detailed attendee object

**Example**:
```json
{
  "name": "get_attendee_details",
  "arguments": {
    "attendee_id": "987654321"
  }
}
```

**Implementation Status**: Not Started

### `export_attendee_data`

**Description**: Export attendee data in various formats

**Parameters**:
- `event_id` (string, required): ID of the event
- `format` (string, required): Export format (csv, json, excel)
- `fields` (array, optional): Specific fields to include

**Returns**:
- URL to download the exported data

**Example**:
```json
{
  "name": "export_attendee_data",
  "arguments": {
    "event_id": "123456789",
    "format": "csv",
    "fields": ["name", "email", "ticket_class", "order_date"]
  }
}
```

**Implementation Status**: Not Started

## Analytics & Reporting

### `generate_sales_report`

**Description**: Generate a sales report for an event or time period

**Parameters**:
- `event_id` (string, optional): ID of the event (if not provided, generates report for all events)
- `start_date` (string, optional): Start date for the report (ISO 8601 format)
- `end_date` (string, optional): End date for the report (ISO 8601 format)
- `report_type` (string, required): Type of report (summary, detailed, daily, weekly, monthly)

**Returns**:
- Report object with sales data

**Example**:
```json
{
  "name": "generate_sales_report",
  "arguments": {
    "event_id": "123456789",
    "report_type": "weekly",
    "start_date": "2025-01-01T00:00:00Z",
    "end_date": "2025-03-31T23:59:59Z"
  }
}
```

**Implementation Status**: Not Started

### `generate_attendance_report`

**Description**: Generate an attendance report for an event

**Parameters**:
- `event_id` (string, required): ID of the event
- `include_checkins` (boolean, optional): Include check-in data

**Returns**:
- Report object with attendance data

**Example**:
```json
{
  "name": "generate_attendance_report",
  "arguments": {
    "event_id": "123456789",
    "include_checkins": true
  }
}
```

**Implementation Status**: Not Started

### `generate_analytics_chart`

**Description**: Generate a chart for specified metrics

**Parameters**:
- `event_id` (string, optional): ID of the event (if not provided, generates chart for all events)
- `metric` (string, required): Metric to chart (sales, attendance, revenue, etc.)
- `dimension` (string, required): Dimension to group by (day, week, month, ticket_type, etc.)
- `start_date` (string, optional): Start date for the chart data (ISO 8601 format)
- `end_date` (string, optional): End date for the chart data (ISO 8601 format)
- `chart_type` (string, optional): Type of chart (bar, line, pie)

**Returns**:
- Chart data object and image URL

**Example**:
```json
{
  "name": "generate_analytics_chart",
  "arguments": {
    "event_id": "123456789",
    "metric": "sales",
    "dimension": "day",
    "start_date": "2025-03-01T00:00:00Z",
    "end_date": "2025-03-31T23:59:59Z",
    "chart_type": "line"
  }
}
```

**Implementation Status**: Not Started
