export type SupportTicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export type SupportTicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type SupportTicketCategory = 'GENERAL' | 'ACCOUNT' | 'INVESTMENT' | 'WITHDRAWAL' | 'TECHNICAL' | 'OTHER';

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  userId: string;
  subject: string;
  description: string;
  category: SupportTicketCategory;
  priority: SupportTicketPriority;
  status: SupportTicketStatus;
  createdAt: Date;
  updatedAt: Date;
  lastMessage?: string;
  lastMessageAt?: Date;
  unreadMessages: number;
  adminAssigneeId?: string;
  adminAssigneeName?: string;
}

export interface SupportMessage {
  id: string;
  ticketId: string;
  senderId: string;
  senderName: string;
  senderRole: 'USER' | 'ADMIN';
  content: string;
  isRead: boolean;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SupportTicketQueryParams {
  page?: number;
  limit?: number;
  status?: SupportTicketStatus;
  priority?: SupportTicketPriority;
  category?: SupportTicketCategory;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateTicketRequest {
  subject: string;
  message: string;
  priority: SupportTicketPriority;
  category: SupportTicketCategory;
}

export interface CreateMessageRequest {
  content: string;
  attachments?: File[];
}