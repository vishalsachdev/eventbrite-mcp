import EventbriteAPI from '../../api/eventbriteClient';

export interface GetEventDetailsParams {
  event_id: string;
}

interface EventbriteEventDetail {
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
  created: string;
  changed: string;
  published?: string;
  status: string;
  currency: string;
  online_event: boolean;
  organizer_id?: string;
  venue_id?: string;
  format_id?: string;
  category_id?: string;
  subcategory_id?: string;
  capacity?: number;
  is_free: boolean;
  is_series?: boolean;
  is_series_parent?: boolean;
  show_remaining?: boolean;
  hide_start_date?: boolean;
  hide_end_date?: boolean;
  shareable?: boolean;
  invite_only?: boolean;
  show_pick_a_seat?: boolean;
  show_seatmap_thumbnail?: boolean;
  show_colors_in_seatmap_thumbnail?: boolean;
  source?: string;
  locale?: string;
  logo_id?: string;
  logo?: any;
  ticket_classes?: any[];
}

/**
 * Get detailed information about a specific event
 */
export async function getEventDetails(params: GetEventDetailsParams): Promise<any> {
  try {
    if (!params.event_id) {
      throw new Error('event_id is required');
    }

    // Call Eventbrite API
    const event = await EventbriteAPI.getEventDetails(params.event_id) as EventbriteEventDetail;

    // Transform response to a more usable format for the MCP client
    return {
      id: event.id,
      name: event.name.text,
      description: event.description?.text || '',
      url: event.url,
      start: {
        utc: event.start.utc,
        timezone: event.start.timezone,
        local: event.start.local
      },
      end: {
        utc: event.end.utc,
        timezone: event.end.timezone,
        local: event.end.local
      },
      created: event.created,
      changed: event.changed,
      published: event.published,
      status: event.status,
      currency: event.currency,
      online_event: event.online_event,
      organizer_id: event.organizer_id,
      venue_id: event.venue_id,
      format_id: event.format_id,
      category_id: event.category_id,
      subcategory_id: event.subcategory_id,
      capacity: event.capacity,
      is_free: event.is_free,
      is_series: event.is_series,
      is_series_parent: event.is_series_parent,
      show_remaining: event.show_remaining,
      hide_start_date: event.hide_start_date,
      hide_end_date: event.hide_end_date,
      shareable: event.shareable,
      invite_only: event.invite_only,
      show_pick_a_seat: event.show_pick_a_seat,
      show_seatmap_thumbnail: event.show_seatmap_thumbnail,
      show_colors_in_seatmap_thumbnail: event.show_colors_in_seatmap_thumbnail,
      source: event.source,
      locale: event.locale,
      logo_id: event.logo_id,
      logo: event.logo,
      ticket_classes: event.ticket_classes
    };
  } catch (error) {
    console.error('Error in getEventDetails tool:', error);
    throw new Error(`Failed to get event details: ${(error as Error).message}`);
  }
}
