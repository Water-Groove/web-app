export type NotificationType =
  | 'deposit_request'
  | 'withdrawal_request'
  | 'deposit_approved'
  | 'withdrawal_approved'
  | 'investment_activated'
  | 'investment_completed'
  | 'roi_credited'
  | 'welcome'
  | 'account_verified'
  | 'password_reset'
  | 'security_alert'
  | 'admin_deposit_alert'
  | 'admin_withdrawal_alert';

export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export type NotificationChannel = 'email' | 'sms' | 'push' | 'in_app';

export interface NotificationLog {
  id: string;
  userId: string;
  type: NotificationType;
  status: 'sent' | 'failed' | 'pending';
  channel: NotificationChannel;
  recipient: string;
  subject: string;
  metadata?: Record<string, any>;
  sentAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserNotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  depositNotifications: boolean;
  withdrawalNotifications: boolean;
  roiNotifications: boolean;
  marketingEmails: boolean;
}

export type EmailUser = {
  id: string;
  email: string;
  fullName: string;
};

export type EmailTransactionDetail = {
  id: string;
  investmentId: string | null;
  type: string;
  status: string;
  amount: number;
  description: string | null;
  processedByAdminId: string | null;
  processedAt: Date | null;
  createdAt: Date;
};

export type NotificationOptions = {
  userId: string;
  type: NotificationType;
  channels?: NotificationChannel[];
  priority?: Priority;
  metadata?: Record<string, any>;
  scheduleFor?: Date;
};