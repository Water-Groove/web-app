import { Metadata } from 'next';
import { resolveServerAuth } from '@/lib/server/auth0-server';
import SupportClient from '../_components/SupportClient';
import { getSupportTickets } from '@/services/client/support.service';
import { SupportTicketStatus, SupportTicketPriority } from '@/types/support';

export const metadata: Metadata = {
  title: "Support | Water Grove",
  description: "Get help and support for your Water Grove investment account",
};

interface SupportPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const SupportPage = async ({ searchParams }: SupportPageProps) => {
  const { user } = await resolveServerAuth();
  
  // Helper function to validate status
  const validateStatus = (status: string): SupportTicketStatus | undefined => {
    const validStatuses: SupportTicketStatus[] = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
    return validStatuses.includes(status as SupportTicketStatus) 
      ? status as SupportTicketStatus 
      : undefined;
  };

  // Helper function to validate priority
  const validatePriority = (priority: string): SupportTicketPriority | undefined => {
    const validPriorities: SupportTicketPriority[] = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];
    return validPriorities.includes(priority as SupportTicketPriority)
      ? priority as SupportTicketPriority
      : undefined;
  };

  // Build query params from search params
  const queryParams = {
    page: typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1,
    limit: typeof searchParams.limit === 'string' ? parseInt(searchParams.limit) : 10,
    status: typeof searchParams.status === 'string' ? validateStatus(searchParams.status) : undefined,
    priority: typeof searchParams.priority === 'string' ? validatePriority(searchParams.priority) : undefined,
  };

  // Fetch initial support tickets
  const res = await getSupportTickets(user.id, queryParams);
  
  const data = res?.data ?? {
    data: [], // tickets array is inside data property for paginated response
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    unreadMessages: 0,
  };

  return (
    <div className="">
      <SupportClient
        initialTickets={data.data}
        total={data.total}
        page={data.page}
        limit={data.limit}
        totalPages={data.totalPages}
        unreadMessages={data.unreadMessages ?? 0}
        userId={user.id}
        userEmail={user.email}
        userName={`${user.firstName} ${user.lastName}`}
      />
    </div>
  );
};

export default SupportPage;