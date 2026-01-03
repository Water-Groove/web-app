/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Plus,
  MessageSquare,
  Mail,
  Phone,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  HelpCircle,
  Filter,
  Search,
  Paperclip,
  Send,
  Calendar,
  User,
  FileText,
  ChevronRight,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { SupportTicket, SupportTicketStatus, SupportTicketPriority, SupportMessage } from '@/types/support';
import { ApiResponse, PaginatedResponse } from '@/types/type';

interface SupportClientProps {
  initialTickets: SupportTicket[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  unreadMessages: number;
  userId: string;
  userEmail: string;
  userName: string;
}

const SupportClient = ({
  initialTickets,
  total,
  page,
  limit,
  totalPages,
  unreadMessages,
  userId,
  userEmail,
  userName,
}: SupportClientProps) => {
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);
  const [loading, setLoading] = useState(false);
  const [creatingTicket, setCreatingTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Filters
  const [filters, setFilters] = useState({
    page,
    limit,
    status: undefined as string | undefined,
    priority: undefined as string | undefined,
    search: '',
  });

  // New ticket form
  const [newTicket, setNewTicket] = useState({
    subject: '',
    message: '',
    priority: 'MEDIUM' as SupportTicketPriority,
    category: 'GENERAL',
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch support tickets
  const fetchTickets = useCallback(async (filterParams: any) => {
    setLoading(true);
    try {
      const queryString = new URLSearchParams(filterParams).toString();
      const res = await fetch(`/api/client/support/tickets?${queryString}`);
      
      if (!res.ok) throw new Error('Failed to fetch tickets');
      
      const result: ApiResponse<PaginatedResponse<SupportTicket[]>> = await res.json();
      
      if (result.success && result.data) {
        setTickets(result.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch messages for a ticket
  const fetchMessages = useCallback(async (ticketId: string) => {
    try {
      const res = await fetch(`/api/client/support/tickets/${ticketId}/messages`);
      if (!res.ok) throw new Error('Failed to fetch messages');
      
      const result: ApiResponse<SupportMessage[]> = await res.json();
      if (result.success && result.data) {
        setMessages(result.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, []);

  // Handle filter changes
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTickets(filters);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters, fetchTickets]);

  const handleStatusChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      page: 1,
      status: value === 'all' ? undefined : value
    }));
  };

  const handlePriorityChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      page: 1,
      priority: value === 'all' ? undefined : value
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      page: 1,
      search: e.target.value
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  // Create new ticket
  const handleCreateTicket = async () => {
    if (!newTicket.subject.trim() || !newTicket.message.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setCreatingTicket(true);
    try {
      const res = await fetch('/api/client/support/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTicket),
      });

      if (!res.ok) throw new Error('Failed to create ticket');

      const result = await res.json();
      if (result.success) {
        // Refresh tickets
        fetchTickets(filters);
        // Reset form
        setNewTicket({
          subject: '',
          message: '',
          priority: 'MEDIUM',
          category: 'GENERAL',
        });
        // Show success message
        alert('Support ticket created successfully!');
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Failed to create support ticket. Please try again.');
    } finally {
      setCreatingTicket(false);
    }
  };

  // Send message
  const handleSendMessage = async () => {
    if (!selectedTicket || !newMessage.trim()) return;

    try {
      const res = await fetch(`/api/client/support/tickets/${selectedTicket.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMessage }),
      });

      if (!res.ok) throw new Error('Failed to send message');

      const result = await res.json();
      if (result.success && result.data) {
        setMessages(prev => [...prev, result.data]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  // Select ticket and fetch messages
  const handleSelectTicket = async (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    await fetchMessages(ticket.id);
  };

  const getStatusIcon = (status: SupportTicketStatus) => {
    switch (status) {
      case 'OPEN':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'IN_PROGRESS':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'RESOLVED':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'CLOSED':
        return <XCircle className="h-4 w-4 text-gray-500" />;
      default:
        return <HelpCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority: SupportTicketPriority) => {
    switch (priority) {
      case 'LOW':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Low</Badge>;
      case 'MEDIUM':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Medium</Badge>;
      case 'HIGH':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">High</Badge>;
      case 'URGENT':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Urgent</Badge>;
      default:
        return <Badge variant="outline">Normal</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-wg-primary">Support Center</h1>
          <p className="text-wg-primary/70 mt-1">
            Get help with your account, investments, and more
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {unreadMessages > 0 && (
            <Badge variant="destructive" className="animate-pulse">
              {unreadMessages} unread
            </Badge>
          )}
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-to-r from-wg-primary to-wg-primary/80 hover:from-wg-secondary/90 hover:to-wg-secondary">
                <Plus className="h-4 w-4" />
                New Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-wg-neutral border-wg-primary/10">
              <DialogHeader>
                <DialogTitle className="text-wg-primary">Create Support Ticket</DialogTitle>
                <DialogDescription>
                  Describe your issue and we&apos;ll get back to you as soon as possible.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-wg-primary">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                    placeholder="Brief description of your issue"
                    className="border-wg-primary/20 focus:border-wg-accent"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-wg-primary">
                    Priority
                  </Label>
                  <Select
                    value={newTicket.priority}
                    onValueChange={(value: SupportTicketPriority) => 
                      setNewTicket({ ...newTicket, priority: value })
                    }
                  >
                    <SelectTrigger className="border-wg-primary/20">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="URGENT">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-wg-primary">
                    Category
                  </Label>
                  <Select
                    value={newTicket.category}
                    onValueChange={(value) => 
                      setNewTicket({ ...newTicket, category: value })
                    }
                  >
                    <SelectTrigger className="border-wg-primary/20">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GENERAL">General Inquiry</SelectItem>
                      <SelectItem value="ACCOUNT">Account Issues</SelectItem>
                      <SelectItem value="INVESTMENT">Investment Related</SelectItem>
                      <SelectItem value="WITHDRAWAL">Withdrawal Issues</SelectItem>
                      <SelectItem value="TECHNICAL">Technical Support</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-wg-primary">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    value={newTicket.message}
                    onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                    placeholder="Please provide details about your issue..."
                    className="min-h-[150px] border-wg-primary/20 focus:border-wg-accent"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button
                  onClick={handleCreateTicket}
                  disabled={creatingTicket || !newTicket.subject.trim() || !newTicket.message.trim()}
                  className="gap-2 bg-gradient-to-r from-wg-primary to-wg-primary/80 hover:from-wg-secondary/90 hover:to-wg-secondary"
                >
                  {creatingTicket && <Loader2 className="h-4 w-4 animate-spin" />}
                  {creatingTicket ? 'Creating...' : 'Submit Ticket'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-wg-primary/10 hover:border-wg-accent/30 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-wg-primary">Email Support</h3>
                <a 
                  href="mailto:support@watergrooveinvestment.com" 
                  className="text-sm text-wg-accent hover:underline"
                >
                  support@watergrooveinvestment.com
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-wg-primary/10 hover:border-wg-accent/30 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-50">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-wg-primary">Phone Support</h3>
                <a 
                  href="tel:+2348035026480" 
                  className="text-sm text-wg-accent hover:underline"
                >
                  +234 803 502 6480
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-wg-primary/10 hover:border-wg-accent/30 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-50">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-wg-primary">Response Time</h3>
                <p className="text-sm text-wg-primary/70">
                  Within 24 hours for urgent issues
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Tickets List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-wg-primary/40" />
                <Input
                  placeholder="Search tickets..."
                  className="pl-9 w-full sm:w-[250px] border-wg-primary/20"
                  value={filters.search}
                  onChange={handleSearchChange}
                />
              </div>
              
              <Select
                value={filters.status || 'all'}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="w-[140px] border-wg-primary/20">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="OPEN">Open</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="RESOLVED">Resolved</SelectItem>
                  <SelectItem value="CLOSED">Closed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={filters.priority || 'all'}
                onValueChange={handlePriorityChange}
              >
                <SelectTrigger className="w-[140px] border-wg-primary/20">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="URGENT">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                <TabsTrigger value="open" className="text-xs">Open</TabsTrigger>
                <TabsTrigger value="progress" className="text-xs">Progress</TabsTrigger>
                <TabsTrigger value="resolved" className="text-xs">Resolved</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Tickets List */}
          <Card className="border-wg-primary/10">
            <CardContent className="p-0">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-wg-primary/40" />
                </div>
              ) : tickets.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <MessageSquare className="h-12 w-12 text-wg-primary/30 mb-4" />
                  <h3 className="text-lg font-semibold text-wg-primary mb-2">No support tickets</h3>
                  <p className="text-wg-primary/60">Create your first support ticket to get help</p>
                </div>
              ) : (
                <div className="divide-y divide-wg-primary/10">
                  {tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className={`p-4 hover:bg-wg-primary/5 cursor-pointer transition-colors ${
                        selectedTicket?.id === ticket.id ? 'bg-wg-primary/5' : ''
                      }`}
                      onClick={() => handleSelectTicket(ticket)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-wg-primary">
                              #{ticket.ticketNumber}
                            </span>
                            <span className="text-sm font-medium text-wg-primary/90">
                              {ticket.subject}
                            </span>
                            {ticket.unreadMessages > 0 && (
                              <Badge variant="destructive" className="h-5 px-1.5 text-xs">
                                {ticket.unreadMessages}
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-sm text-wg-primary/70 line-clamp-2 mb-2">
                            {ticket.lastMessage || ticket.description}
                          </p>
                          
                          <div className="flex items-center gap-3 text-xs text-wg-primary/60">
                            <span className="flex items-center gap-1">
                              {getStatusIcon(ticket.status)}
                              {ticket.status.replace('_', ' ')}
                            </span>
                            <span>{getPriorityBadge(ticket.priority)}</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(ticket.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        
                        <ChevronRight className="h-5 w-5 text-wg-primary/40" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(page - 1)}
                    className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => handlePageChange(pageNum)}
                        isActive={page === pageNum}
                        className={cn(
                          page === pageNum
                            ? 'bg-gradient-to-r from-wg-accent to-wg-accent/80 text-wg-neutral'
                            : 'hover:bg-wg-primary/5'
                        )}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                {totalPages > 5 && (
                  <>
                    <span className="px-2">...</span>
                    <PaginationItem>
                      <PaginationLink onClick={() => handlePageChange(totalPages)}>
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
                
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(page + 1)}
                    className={page >= totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>

        {/* Ticket Details / Chat */}
        <div className="lg:col-span-1">
          <Card className="border-wg-primary/10 h-full">
            <CardContent className="p-0 h-full">
              {selectedTicket ? (
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="p-4 border-b border-wg-primary/10">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-wg-primary">
                        Ticket #{selectedTicket.ticketNumber}
                      </h3>
                      <Badge
                        variant={
                          selectedTicket.status === 'OPEN' ? 'default' :
                          selectedTicket.status === 'IN_PROGRESS' ? 'secondary' :
                          selectedTicket.status === 'RESOLVED' ? 'outline' : 'destructive'
                        }
                      >
                        {selectedTicket.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-wg-primary/90">{selectedTicket.subject}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-wg-primary/60">
                      <User className="h-3 w-3" />
                      <span>{userName}</span>
                      <span>•</span>
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(selectedTicket.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto max-h-[400px]">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.senderId === userId ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.senderId === userId
                                ? 'bg-gradient-to-r from-wg-primary to-wg-primary/80 text-wg-neutral'
                                : 'bg-wg-primary/5 text-wg-primary'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <div className="text-xs opacity-70 mt-1">
                              {new Date(message.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Message Input */}
                  {selectedTicket.status !== 'CLOSED' && (
                    <div className="p-4 border-t border-wg-primary/10">
                      <div className="flex gap-2">
                        <Textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="min-h-[60px] border-wg-primary/20 focus:border-wg-accent"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                        <Button
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                          className="gap-2 bg-gradient-to-r from-wg-primary to-wg-primary/80 hover:from-wg-secondary/90 hover:to-wg-secondary"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <MessageSquare className="h-12 w-12 text-wg-primary/30 mb-4" />
                  <h3 className="text-lg font-semibold text-wg-primary mb-2">Select a Ticket</h3>
                  <p className="text-wg-primary/60">
                    Choose a support ticket from the list to view messages and respond
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-wg-primary mb-4">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              question: 'How long does withdrawal processing take?',
              answer: 'Withdrawals typically take 3-7 business days to process after approval.'
            },
            {
              question: 'Can I cancel my investment?',
              answer: 'Investments are locked for 18 months. Early cancellation is not permitted.'
            },
            {
              question: 'How do I update my bank details?',
              answer: 'Contact support with verification documents to update your bank information.'
            },
            {
              question: 'When are monthly ROI payments made?',
              answer: 'ROI is calculated and credited on the last day of each month.'
            }
          ].map((faq, index) => (
            <Card key={index} className="border-wg-primary/10 hover:border-wg-accent/30 transition-colors">
              <CardContent className="p-4">
                <h4 className="font-semibold text-wg-primary mb-2">{faq.question}</h4>
                <p className="text-sm text-wg-primary/70">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-6">
          <Button variant="outline" className="border-wg-primary/20">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Full FAQ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SupportClient;