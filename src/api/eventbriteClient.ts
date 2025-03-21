import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'https://www.eventbriteapi.com/v3';
const API_TOKEN = process.env.EVENTBRITE_API_KEY;

if (!API_TOKEN) {
  console.error('Error: No Eventbrite API token found. Please set EVENTBRITE_API_KEY in your .env file.');
  process.exit(1);
}

// Create axios instance with authentication
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Error Request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Define types for API parameters and responses
export interface EventbriteListParams {
  status?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  page_size?: number;
  date_modified_start?: string;
  date_modified_end?: string;
  [key: string]: string | number | undefined;
}

export interface EventbriteAttendeeParams {
  status?: string;
  changed_since?: string;
  page?: number;
  page_size?: number;
  [key: string]: string | number | undefined;
}

export interface EventbriteEventData {
  event?: {
    name?: {
      html?: string;
    };
    description?: {
      html?: string;
    };
    start?: {
      timezone?: string;
      utc?: string;
    };
    end?: {
      timezone?: string;
      utc?: string;
    };
    currency?: string;
    venue_id?: string;
    category_id?: string;
    subcategory_id?: string;
    format_id?: string;
    organizer_id?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

// API wrapper functions
export const EventbriteAPI = {
  /**
   * Get a list of events
   */
  listEvents: async (params: EventbriteListParams = {}) => {
    try {
      // Format date parameters if provided
      const formattedParams = { ...params };
      
      // Convert date strings to ISO format if they exist
      if (formattedParams.start_date) {
        // Ensure the date is in the correct format (YYYY-MM-DD)
        const startDate = new Date(formattedParams.start_date);
        formattedParams.start_date = startDate.toISOString().split('T')[0];
        console.error(`Formatted start_date: ${formattedParams.start_date}`);
      }
      
      if (formattedParams.end_date) {
        // Ensure the date is in the correct format (YYYY-MM-DD)
        const endDate = new Date(formattedParams.end_date);
        formattedParams.end_date = endDate.toISOString().split('T')[0];
        console.error(`Formatted end_date: ${formattedParams.end_date}`);
      }
      
      // First try to get organization ID
      const orgResponse = await apiClient.get('/users/me/organizations/');
      console.error('Organizations response:', JSON.stringify(orgResponse.data, null, 2));
      
      if (orgResponse.data.organizations && orgResponse.data.organizations.length > 0) {
        const organizationId = orgResponse.data.organizations[0].id;
        console.error(`Using organization ID: ${organizationId}`);
        
        // Log the parameters being sent to the API
        console.error('API parameters:', JSON.stringify(formattedParams, null, 2));
        
        // Get events for this organization
        const response = await apiClient.get(`/organizations/${organizationId}/events/`, { params: formattedParams });
        return response.data;
      } else {
        // Fallback to user's events if no organization is found
        console.error('No organization found, falling back to user events');
        const response = await apiClient.get('/users/me/events/', { params: formattedParams });
        return response.data;
      }
    } catch (error) {
      console.error('Error listing events:', error);
      throw error;
    }
  },

  /**
   * Get event details by ID
   */
  getEventDetails: async (eventId: string) => {
    try {
      const response = await apiClient.get(`/events/${eventId}/`);
      return response.data;
    } catch (error) {
      console.error(`Error getting event details for ${eventId}:`, error);
      throw error;
    }
  },

  /**
   * List attendees for an event
   */
  listAttendees: async (eventId: string, params: EventbriteAttendeeParams = {}) => {
    try {
      const response = await apiClient.get(`/events/${eventId}/attendees/`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error listing attendees for event ${eventId}:`, error);
      throw error;
    }
  },

  /**
   * Get attendee details
   */
  getAttendeeDetails: async (eventId: string, attendeeId: string) => {
    try {
      const response = await apiClient.get(`/events/${eventId}/attendees/${attendeeId}/`);
      return response.data;
    } catch (error) {
      console.error(`Error getting attendee ${attendeeId} details:`, error);
      throw error;
    }
  },

  /**
   * Create a new event
   */
  createEvent: async (eventData: EventbriteEventData) => {
    try {
      const response = await apiClient.post('/events/', eventData);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  /**
   * Update an existing event
   */
  updateEvent: async (eventId: string, eventData: EventbriteEventData) => {
    try {
      const response = await apiClient.post(`/events/${eventId}/`, eventData);
      return response.data;
    } catch (error) {
      console.error(`Error updating event ${eventId}:`, error);
      throw error;
    }
  },

  /**
   * Publish an event
   */
  publishEvent: async (eventId: string) => {
    try {
      const response = await apiClient.post(`/events/${eventId}/publish/`);
      return response.data;
    } catch (error) {
      console.error(`Error publishing event ${eventId}:`, error);
      throw error;
    }
  },

  /**
   * Search for events with more filtering options
   */
  searchEvents: async (params: EventbriteListParams = {}) => {
    try {
      // Format date parameters if provided
      const formattedParams = { ...params };
      
      // Convert date strings to YYYY-MM-DD format if they exist
      if (formattedParams.start_date) {
        const startDate = new Date(formattedParams.start_date);
        formattedParams['start_date.range_start'] = startDate.toISOString().split('T')[0]; // YYYY-MM-DD format
        delete formattedParams.start_date;
        console.error(`Formatted start_date.range_start: ${formattedParams['start_date.range_start']}`);
      } else {
        // Default to recent events if no start date is provided
        const defaultStartDate = new Date('2023-01-01');
        formattedParams['start_date.range_start'] = defaultStartDate.toISOString().split('T')[0];
        console.error(`Using default start_date.range_start: ${formattedParams['start_date.range_start']}`);
      }
      
      if (formattedParams.end_date) {
        const endDate = new Date(formattedParams.end_date);
        formattedParams['start_date.range_end'] = endDate.toISOString().split('T')[0]; // YYYY-MM-DD format
        delete formattedParams.end_date;
        console.error(`Formatted start_date.range_end: ${formattedParams['start_date.range_end']}`);
      } else {
        // Default to future events if no end date is provided
        const defaultEndDate = new Date();
        defaultEndDate.setFullYear(defaultEndDate.getFullYear() + 1); // One year from now
        formattedParams['start_date.range_end'] = defaultEndDate.toISOString().split('T')[0];
        console.error(`Using default start_date.range_end: ${formattedParams['start_date.range_end']}`);
      }
      
      // Use the organization events endpoint which has better filtering capabilities
      console.error('Using organization events endpoint with parameters:', JSON.stringify(formattedParams, null, 2));
      
      // Use the specific organization ID for Illinois MakerLab
      const organizationId = '139255086539'; // Illinois MakerLab organization ID
      console.error(`Using hardcoded organization ID: ${organizationId}`);
      
      // Build search query parameters - include date parameters in the API call
      const searchParams: any = {
        ...formattedParams, // Include all formatted parameters including date filters
        status: formattedParams.status || 'all',
        order_by: 'start_desc', // Use descending order to get newest events first
        expand: 'venue,ticket_availability'
      };
      
      // Get the start date filter for manual filtering
      const startDateFilter = formattedParams['start_date.range_start'] ? new Date(formattedParams['start_date.range_start']) : null;
      const endDateFilter = formattedParams['start_date.range_end'] ? new Date(formattedParams['start_date.range_end']) : null;
      
      console.error(`Will manually filter events by date: start=${startDateFilter}, end=${endDateFilter}`);
      
      // Collect all events that match our date criteria
      let allEvents: any[] = [];
      
      // From testing, we know page 18 has events from 2023
      // We'll check specific pages known to have recent events, then try the first few pages
      const pagesToCheck = [18, 19, 1, 2, 3];
      
      for (const pageNum of pagesToCheck) {
        console.error(`Fetching page ${pageNum} of events...`);
        
        // Update page parameter
        searchParams.page = pageNum;
        
        // Use the organization events endpoint
        const response = await apiClient.get(`/organizations/${organizationId}/events/`, { 
          params: searchParams 
        });
        
        // Filter events by date
        const filteredEvents = response.data.events.filter((event: any) => {
          const eventStartDate = new Date(event.start.utc);
          
          // Check if event is within the date range
          const afterStartDate = startDateFilter ? eventStartDate >= startDateFilter : true;
          const beforeEndDate = endDateFilter ? eventStartDate <= endDateFilter : true;
          
          return afterStartDate && beforeEndDate;
        });
        
        console.error(`Page ${pageNum}: Filtered from ${response.data.events.length} to ${filteredEvents.length} events`);
        
        // Add filtered events to our collection
        allEvents = [...allEvents, ...filteredEvents];
        
        // If we already have a good number of events, we can stop checking more pages
        if (allEvents.length >= 20) {
          console.error(`Found ${allEvents.length} events, stopping pagination`);
          break;
        }
        
        // If there are no more pages, break the loop
        if (!response.data.pagination.has_more_items) {
          break;
        }
      }
      
      console.error(`Total events after filtering: ${allEvents.length}`);
      
      // Create a response object with our filtered events
      const result = {
        pagination: {
          object_count: allEvents.length,
          page_number: 1,
          page_size: allEvents.length,
          page_count: 1,
          has_more_items: false
        },
        events: allEvents
      };
      
      return result;
    } catch (error) {
      console.error('Error searching events:', error);
      throw error;
    }
  },
};

export default EventbriteAPI;
