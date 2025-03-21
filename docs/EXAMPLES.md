# Eventbrite MCP Server Usage Examples

This document provides examples of how to use the Eventbrite MCP Server with Claude or other MCP clients for common event management and analytics tasks.

## Event Management Examples

### Listing Your Events

**Example Query**: "Show me my upcoming events"

**Claude Response**:
```
I'll retrieve your upcoming events from Eventbrite.

[Claude calls list_events tool with status=live]

Here are your upcoming events:

1. Tech Conference 2025 - April 15-17, 2025
   - Status: Live
   - Tickets sold: 245/500

2. Product Launch Webinar - March 30, 2025
   - Status: Live
   - Tickets sold: 178/unlimited

3. Networking Mixer - May 5, 2025
   - Status: Live
   - Tickets sold: 32/100

Would you like more details about any of these events?
```

### Creating a New Event

**Example Query**: "Create a new virtual workshop called 'Advanced Python Techniques' on June 10, 2025 from 1pm to 4pm"

**Claude Response**:
```
I'll help you create a new virtual workshop on Eventbrite.

[Claude calls create_event tool with appropriate parameters]

I've created your "Advanced Python Techniques" virtual workshop:

- Date: June 10, 2025
- Time: 1:00 PM - 4:00 PM
- Type: Online Event
- Status: Draft

The event has been created as a draft. Would you like to:
1. Add more details to the event description?
2. Set up ticket types?
3. Publish the event now?
```

### Updating an Event

**Example Query**: "Update the description for my Tech Conference event to include information about the keynote speaker"

**Claude Response**:
```
I'll help you update your Tech Conference event description.

[Claude calls get_event_details to find the event ID]
[Claude calls update_event with the new description]

I've updated the description for "Tech Conference 2025" to include information about the keynote speaker. The event page has been updated successfully.

Would you like to review the updated description?
```

## Attendee Management Examples

### Checking Attendee List

**Example Query**: "Show me who's registered for my Product Launch Webinar"

**Claude Response**:
```
I'll retrieve the attendee list for your Product Launch Webinar.

[Claude calls get_event_details to find the event ID]
[Claude calls list_attendees with the event ID]

Here are the attendees for your Product Launch Webinar (showing first 10):

1. John Smith - john.smith@example.com - General Admission
2. Jane Doe - jane.doe@example.com - VIP Access
3. Robert Johnson - robert.j@example.com - General Admission
...

Total attendees: 178
VIP Access: 24
General Admission: 154

Would you like to see more attendees or export the complete list?
```

### Exporting Attendee Data

**Example Query**: "Export the attendee list for my Tech Conference to CSV"

**Claude Response**:
```
I'll export the attendee list for your Tech Conference to CSV format.

[Claude calls get_event_details to find the event ID]
[Claude calls export_attendee_data with format=csv]

I've generated a CSV export of all 245 attendees for "Tech Conference 2025".

You can download the file here: [Download Link]

The CSV includes the following information:
- Name
- Email
- Ticket Type
- Order Date
- Check-in Status
```

## Analytics & Reporting Examples

### Sales Report

**Example Query**: "Generate a sales report for my Networking Mixer event"

**Claude Response**:
```
I'll generate a sales report for your Networking Mixer event.

[Claude calls get_event_details to find the event ID]
[Claude calls generate_sales_report with the event ID]

## Sales Report: Networking Mixer (May 5, 2025)

### Summary
- Total tickets sold: 32/100
- Total revenue: $1,600.00
- Average ticket price: $50.00

### Sales by Ticket Type
- Early Bird: 20 tickets - $800.00
- Regular: 12 tickets - $800.00
- VIP: 0 tickets - $0.00

### Sales Trend
- Last 7 days: 8 tickets sold
- Previous 7 days: 5 tickets sold
- Growth: +60%

Would you like to see a visual chart of the sales trend or a more detailed breakdown?
```

### Attendance Analytics

**Example Query**: "Show me attendance analytics for my past events this year"

**Claude Response**:
```
I'll analyze attendance for your past events this year.

[Claude calls list_events with status=completed]
[Claude calls generate_attendance_report for each event]

## Attendance Analytics (2025 YTD)

### Overall Statistics
- Total events: 5
- Total registrations: 1,245
- Actual attendance: 876 (70.4% show rate)

### By Event
1. Winter Workshop (Jan 2025)
   - Registrations: 200
   - Attendance: 142 (71% show rate)

2. Q1 Product Demo (Feb 2025)
   - Registrations: 350
   - Attendance: 273 (78% show rate)

3. Industry Panel (Mar 2025)
   - Registrations: 175
   - Attendance: 103 (59% show rate)

4. Spring Showcase (Apr 2025)
   - Registrations: 320
   - Attendance: 224 (70% show rate)

5. Developer Meetup (May 2025)
   - Registrations: 200
   - Attendance: 134 (67% show rate)

I've generated a chart showing attendance trends across these events. Would you like me to explain any specific patterns?
```

### Revenue Visualization

**Example Query**: "Create a chart showing my event revenue by month for Q1"

**Claude Response**:
```
I'll create a chart showing your event revenue by month for Q1 2025.

[Claude calls list_events with appropriate date range]
[Claude calls generate_analytics_chart with metric=revenue, dimension=month]

I've generated a line chart showing your event revenue by month for Q1 2025:

[Chart Image]

## Q1 2025 Revenue Analysis

- January: $12,450
- February: $18,275
- March: $15,830

Total Q1 Revenue: $46,555

Key insights:
- February had the highest revenue, driven by your Q1 Product Demo event
- Your average monthly revenue was $15,518
- Revenue grew 46.8% from January to February, then decreased 13.4% in March

Would you like to see this broken down by event type or ticket category?
```

## Advanced Use Cases

### Comprehensive Event Analysis

**Example Query**: "Analyze the performance of my Tech Conference compared to my previous conferences"

**Claude Response**:
```
I'll perform a comprehensive analysis of your Tech Conference compared to previous similar events.

[Claude calls multiple tools to gather and analyze data]

## Tech Conference 2025 Performance Analysis

### Comparison to Previous Conferences

| Metric | Tech Conf 2025 | Tech Conf 2024 | Tech Conf 2023 | Trend |
|--------|---------------|---------------|---------------|-------|
| Registrations | 500 (projected) | 425 | 380 | ↑ 17.6% YoY |
| Revenue | $75,000 (projected) | $59,500 | $49,400 | ↑ 26.1% YoY |
| Avg. Ticket Price | $150 | $140 | $130 | ↑ 7.1% YoY |
| Early Bird % | 45% | 40% | 35% | ↑ 5% |
| VIP Tickets | 50 | 35 | 25 | ↑ 42.9% |

### Key Insights

1. **Growth Trajectory**: Your Tech Conference continues to show strong year-over-year growth in both attendance and revenue.

2. **Pricing Strategy**: The gradual increase in average ticket price hasn't deterred attendance, suggesting room for further optimization.

3. **Early Adoption**: More attendees are purchasing early bird tickets, indicating growing anticipation for your event.

4. **Premium Experience**: The significant increase in VIP tickets suggests attendees value premium offerings.

5. **Marketing Effectiveness**: Current registration pace is 15% ahead of last year at the same point in the sales cycle.

Would you like specific recommendations based on this analysis?
```

### Strategic Planning

**Example Query**: "Help me plan my event calendar for the next quarter based on past performance"

**Claude Response**:
```
I'll help you plan your event calendar for the next quarter based on historical performance data.

[Claude calls multiple tools to analyze past events and identify patterns]

## Strategic Event Calendar: Q3 2025

Based on analysis of your past 24 months of events, here are my recommendations:

### Recommended Events

1. **Technical Workshop Series** (July 10-12)
   - Format: In-person + virtual hybrid
   - Rationale: Your technical workshops have averaged 92% capacity and 4.8/5 satisfaction
   - Revenue projection: $28,500

2. **Industry Networking Mixer** (August 15)
   - Format: In-person only
   - Rationale: Q3 mixers historically outperform Q2/Q4 by 35% in attendance
   - Revenue projection: $12,000

3. **Product Showcase Webinar** (September 7)
   - Format: Virtual only
   - Rationale: Aligns with industry product cycle; previous showcases generated 40+ qualified leads
   - Revenue projection: $8,500

4. **Executive Roundtable** (September 22)
   - Format: In-person, limited capacity
   - Rationale: High-value format with 85% conversion to enterprise deals
   - Revenue projection: $15,000

### Optimal Timing & Spacing

- Maintain 3-4 week spacing between events to prevent audience fatigue
- Schedule technical content early in quarter before vacation season peaks
- Position roundtable near quarter-end to influence buying decisions

Would you like me to generate a detailed marketing timeline for these events?
```
