/* eslint-disable @typescript-eslint/no-explicit-any */
import { SupportTicket, SupportTicketQueryParams } from '@/types/support';
import { ApiResponse, PaginatedResponse } from '@/types/type';

export const getSupportTickets = async (
  userId: string,
  params?: SupportTicketQueryParams
): Promise<ApiResponse<PaginatedResponse<SupportTicket[]>> | null> => {
  try {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }

    const res = await fetch(`/api/client/support/tickets?${queryParams}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching support tickets:', error);
    return null;
  }
};

export const createSupportTicket = async (
  userId: string,
  data: {
    subject: string;
    message: string;
    priority: string;
    category: string;
  }
): Promise<ApiResponse<{ ticketId: string }> | null> => {
  try {
    const res = await fetch('/api/client/support/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, userId }),
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error creating support ticket:', error);
    return null;
  }
};

export const getTicketMessages = async (
  ticketId: string
): Promise<ApiResponse<any[]> | null> => {
  try {
    const res = await fetch(`/api/client/support/tickets/${ticketId}/messages`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching ticket messages:', error);
    return null;
  }
};

export const sendMessage = async (
  ticketId: string,
  content: string
): Promise<ApiResponse<any> | null> => {
  try {
    const res = await fetch(`/api/client/support/tickets/${ticketId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error sending message:', error);
    return null;
  }
};