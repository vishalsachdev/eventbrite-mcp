import EventbriteAPI from '../../api/eventbriteClient';

export interface ListEventsParams {
  status?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  page_size?: number;
}

interface EventbriteEvent {
  id: string;
  name: {
    text: string;
    html?: string;
  };
  description?: {
    text: string;
    html?: string;
  };
  url: string;
  start: {
    utc: string;
    timezone: string;
    local: string;
  };
  end: {
    utc: string;
    timezone: string;
    local: string;
  };
  status: string;
  currency: string;
  online_event: boolean;
  venue_id?: string;
  organizer_id?: string;
  created: string;
  changed: string;
  capacity?: number;
  is_free: boolean;
}

interface EventbriteResponse {
  events: EventbriteEvent[];
  pagination: {
    object_count: number;
    page_number: number;
    page_size: number;
    page_count: number;
    has_more_items: boolean;
  };
}

/**
 * List events with filtering options
 */
export async function listEvents(params: ListEventsParams = {}): Promise<any> {
  try {
    // Map MCP tool parameters to Eventbrite API parameters
    const apiParams: Record<string, string | number> = {
      status: params.status || '',
      start_date: params.start_date || '',
      end_date: params.end_date || '',
      page: params.page || 1,
      page_size: params.page_size || 50
    };

    // Filter out empty values
    Object.keys(apiParams).forEach(key => {
      if (apiParams[key] === '') {
        delete apiParams[key];
      }
    });

    // Log the parameters we're using
    console.error('MCP listEvents parameters:', JSON.stringify(params, null, 2));
    console.error('API parameters after filtering:', JSON.stringify(apiParams, null, 2));

    // Call Eventbrite API using the organization events endpoint for better filtering
    const response = await EventbriteAPI.searchEvents(apiParams) as EventbriteResponse;

    // Transform response to a more usable format for the MCP client
    const events = response.events.map((event: EventbriteEvent) => ({
      id: event.id,
      name: event.name.text,
      description: event.description?.text || '',
      url: event.url,
      start: event.start.utc,
      end: event.end.utc,
      status: event.status,
      currency: event.currency,
      online_event: event.online_event,
      venue_id: event.venue_id,
      organizer_id: event.organizer_id,
      created: event.created,
      changed: event.changed,
      capacity: event.capacity,
      is_free: event.is_free
    }));

    return {
      events,
      pagination: response.pagination
    };
  } catch (error) {
    console.error('Error in listEvents tool:', error);
    throw new Error(`Failed to list events: ${(error as Error).message}`);
  }
}
