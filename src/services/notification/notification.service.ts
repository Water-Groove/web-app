/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendNotification } from "@/lib/server/notification-api";
import prisma from "@/lib/prisma";
import {
  userDepositTemplate,
  adminDepositTemplate,
  userWithdrawalTemplate,
  adminWithdrawalTemplate,
  activateInvestmentTemplate,
  roiTemplate,
  investmentActivatedTemplate,
  investmentCompletedTemplate,
  passwordResetTemplate,
  welcomeEmailTemplate,
  securityAlertTemplate,
  paidWithdrawalTemplate,
  rejectInvestmentDepositTemplate,
  rejectWithdrawalTemplate
} from "@/templates/email-template";
import { EmailUser, EmailTransactionDetail } from "@/types/notification.type";
import { mapTransactionToEmailDetail } from "@/utils/mapper";

class NotificationService {
  private async getUserForEmail(id: string): Promise<EmailUser | null> {
    try {
      return await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      });
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      return null;
    }
  }

  private async getTransactionForEmail(id: string): Promise<EmailTransactionDetail | null> {
    try {
      const txn = await prisma.transaction.findUnique({
        where: { id },
        select: {
          id: true,
          investmentId: true,
          type: true,
          status: true,
          amount: true,
          description: true,
          processedByAdminId: true,
          processedAt: true,
          createdAt: true,
        },
      });

      return mapTransactionToEmailDetail(txn as any);
    } catch (error) {
      console.error(`Error fetching transaction ${id}:`, error);
      return null;
    }
  }

  private async sendWithRetry(
    sendFn: () => Promise<any>,
    maxRetries: number = 3
  ): Promise<boolean> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await sendFn();
        return true;
      } catch (error) {
        lastError = error as Error;
        console.error(`Attempt ${attempt} failed:`, error);

        if (attempt < maxRetries) {
          await new Promise(resolve =>
            setTimeout(resolve, Math.pow(2, attempt) * 1000)
          );
        }
      }
    }

    throw lastError!;
  }

  public async sendDepositNotification(params: {
    userId: string;
    transactionId: string;
  }): Promise<void> {
    try {
      const [user, txn] = await Promise.all([
        this.getUserForEmail(params.userId),
        this.getTransactionForEmail(params.transactionId),
      ]);

      if (!user || !txn) {
        throw new Error('User or transaction not found');
      }

      await this.sendWithRetry(async () => {
        await Promise.all([
          sendNotification({
            to: user.email,
            subject: "Deposit Request Received",
            template: userDepositTemplate(user, txn),
          }),

          // Admin notification
          sendNotification({
            to: process.env.ADMIN_EMAIL!,
            subject: `New Deposit Request - ${user.fullName}`,
            template: adminDepositTemplate(user, txn),
          })
        ])
      });

      console.log(`Deposit notifications sent for transaction ${params.transactionId}`);
    } catch (error) {
      console.error('Error sending deposit notification:', error);
      throw error;
    }
  }

  public async sendWithdrawalNotification(params: {
    userId: string;
    transactionId: string;
  }): Promise<void> {
    try {
      const [user, txn] = await Promise.all([
        this.getUserForEmail(params.userId),
        this.getTransactionForEmail(params.transactionId),
      ]);

      if (!user || !txn) {
        throw new Error('User or transaction not found');
      }

      await this.sendWithRetry(async () => {
        await Promise.all([
          // User notification
          sendNotification({
            to: user.email,
            subject: "Withdrawal Request Received",
            template: userWithdrawalTemplate(user, txn),
          }),

          // Admin notification
          sendNotification({
            to: process.env.ADMIN_EMAIL!,
            subject: `New Withdrawal Request - ${user.fullName}`,
            template: adminWithdrawalTemplate(user, txn),
          })
        ]);
      });

      console.log(`Withdrawal notifications sent for transaction ${params.transactionId}`);
    } catch (error) {
      console.error('Error sending withdrawal notification:', error);
      throw error;
    }
  }

  public async sendApproveDepositNotification(params: {
    userId: string;
    transactionId: string;
  }): Promise<void> {
    try {
      const [user, txn] = await Promise.all([
        this.getUserForEmail(params.userId),
        this.getTransactionForEmail(params.transactionId),
      ]);

      if (!user || !txn) {
        throw new Error('User or transaction not found');
      }

      await this.sendWithRetry(async () => {
        await Promise.all([
          // Deposit approved notification
          sendNotification({
            to: user.email,
            subject: "Deposit Approved Successfully",
            template: activateInvestmentTemplate(user, txn),
          }),

          // Investment activated notification (if investment exists)
          txn.investmentId && sendNotification({
            to: user.email,
            subject: "Investment Activated",
            template: investmentActivatedTemplate(user, txn),
          })
        ]);
      });

      console.log(`Deposit approval notifications sent for transaction ${params.transactionId}`);
    } catch (error) {
      console.error('Error sending deposit approval notification:', error);
      throw error;
    }
  }

  public async sendApproveWithdrawalNotification(params: {
    userId: string;
    transactionId: string;
  }): Promise<void> {
    try {
      const [user, txn] = await Promise.all([
        this.getUserForEmail(params.userId),
        this.getTransactionForEmail(params.transactionId),
      ]);

      if (!user || !txn) {
        throw new Error('User or transaction not found');
      }

      await this.sendWithRetry(async () => {
        await sendNotification({
          to: user.email,
          subject: "Withdrawal Approved & Processed",
          template: userWithdrawalTemplate(user, {
            ...txn,
            status: 'completed',
            description: `Withdrawal of $${txn.amount.toFixed(2)} has been processed and funds transferred to your account.`,
          }),
        })
      });

      console.log(`Withdrawal approval notification sent for transaction ${params.transactionId}`);
    } catch (error) {
      console.error('Error sending withdrawal approval notification:', error);
      throw error;
    }
  }

  // Configure
  public async sendRejectDepositNotification(params: {
    userId: string;
    transactionId: string;
  }): Promise<void> {
    try {
      const [user, txn] = await Promise.all([
        this.getUserForEmail(params.userId),
        this.getTransactionForEmail(params.transactionId),
      ]);

      if (!user || !txn) {
        throw new Error('User or transaction not found');
      }

      await this.sendWithRetry(async () => {
        await
          // Deposit approved notification
          sendNotification({
            to: user.email,
            subject: "Deposit Rejected",
            template: rejectInvestmentDepositTemplate(user, txn),
          })
      });

      console.log(`Deposit approval notifications sent for transaction ${params.transactionId}`);
    } catch (error) {
      console.error('Error sending deposit approval notification:', error);
      throw error;
    }
  }

  // Configure
  public async sendRejectWithdrawalNotification(params: {
    userId: string;
    transactionId: string;
  }): Promise<void> {
    try {
      const [user, txn] = await Promise.all([
        this.getUserForEmail(params.userId),
        this.getTransactionForEmail(params.transactionId),
      ]);

      if (!user || !txn) {
        throw new Error('User or transaction not found');
      }

      await this.sendWithRetry(async () => {
        await sendNotification({
          to: user.email,
          subject: "Withdrawal Rejected",
          template: rejectWithdrawalTemplate(user, {
            ...txn,
            status: 'rejected',
            description: `Withdrawal of $${txn.amount.toFixed(2)} has been processed and funds transferred to your account.`,
          }),
        })
      });

      console.log(`Withdrawal approval notification sent for transaction ${params.transactionId}`);
    } catch (error) {
      console.error('Error sending withdrawal approval notification:', error);
      throw error;
    }
  }

  // Configure
  public async sendPaidWithdrawalNotification(params: {
    userId: string;
    transactionId: string;
  }): Promise<void> {
    try {
      const [user, txn] = await Promise.all([
        this.getUserForEmail(params.userId),
        this.getTransactionForEmail(params.transactionId),
      ]);

      if (!user || !txn) {
        throw new Error('User or transaction not found');
      }

      await this.sendWithRetry(async () => {
        await 
          sendNotification({
            to: user.email,
            subject: "Paid withdrawal",
            template: paidWithdrawalTemplate(user, txn),
          })
      });

      console.log(`Deposit approval notifications sent for transaction ${params.transactionId}`);
    } catch (error) {
      console.error('Error sending deposit approval notification:', error);
      throw error;
    }
  }

  public async notifyRoiCredited(params: {
    userId: string;
    investmentId: string;
    roiAmount: number;
    totalBalance: number;
  }): Promise<void> {
    try {
      const user = await this.getUserForEmail(params.userId);
      if (!user) {
        throw new Error('User not found');
      }

      await this.sendWithRetry(async () => {
        await sendNotification({
          to: user.email,
          subject: "ROI Credited to Your Investment",
          template: roiTemplate(user, {
            investmentId: params.investmentId,
            amount: params.roiAmount,
            totalBalance: params.totalBalance,
            date: new Date().toISOString(),
          }),
        })
      });

      console.log(`ROI notification sent for investment ${params.investmentId}`);
    } catch (error) {
      console.error('Error sending ROI notification:', error);
      throw error;
    }
  }

  public async notifyInvestmentCompleted(params: {
    userId: string;
    investmentId: string;
    principalAmount: number;
    totalReturns: number;
    duration: string;
  }): Promise<void> {
    try {
      const user = await this.getUserForEmail(params.userId);
      if (!user) {
        throw new Error('User not found');
      }

      await this.sendWithRetry(async () => {
        await sendNotification({
          to: user.email,
          subject: "Investment Completed Successfully",
          template: investmentCompletedTemplate(user, {
            investmentId: params.investmentId,
            principalAmount: params.principalAmount,
            totalReturns: params.totalReturns,
            duration: params.duration,
            completionDate: new Date().toISOString(),
          }),
        })
      });

      console.log(`Investment completion notification sent for ${params.investmentId}`);
    } catch (error) {
      console.error('Error sending investment completion notification:', error);
      throw error;
    }
  }

  public async sendWelcomeEmail(params: {
    userId: string;
  }): Promise<void> {
    try {
      const user = await this.getUserForEmail(params.userId);
      if (!user) {
        throw new Error('User not found');
      }

      await this.sendWithRetry(async () => {
        await sendNotification({
          to: user.email,
          subject: "Welcome to Our Platform!",
          template: welcomeEmailTemplate(user),
        })
      });
    } catch (error) {
      console.error('Error sending welcome email:', error);
      throw error;
    }
  }

  public async sendPasswordResetEmail(params: {
    userId: string;
    resetToken: string;
    expiryHours: number;
  }): Promise<void> {
    try {
      const user = await this.getUserForEmail(params.userId);
      if (!user) {
        throw new Error('User not found');
      }

      const resetLink = `${process.env.APP_URL}/reset-password?token=${params.resetToken}`;

      await this.sendWithRetry(async () => {
        await sendNotification({
          to: user.email,
          subject: "Password Reset Request",
          template: passwordResetTemplate(user, {
            resetLink,
            expiryHours: params.expiryHours,
          }),
        })
      });
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  }

  public async sendSecurityAlert(params: {
    userId: string;
    alertType: 'login' | 'password_change' | 'profile_update';
    deviceInfo: string;
    location: string;
  }): Promise<void> {
    try {
      const user = await this.getUserForEmail(params.userId);
      if (!user) {
        throw new Error('User not found');
      }

      await this.sendWithRetry(async () => {
        await sendNotification({
          to: user.email,
          subject: "Security Alert",
          template: securityAlertTemplate(user, {
            alertType: params.alertType,
            deviceInfo: params.deviceInfo,
            location: params.location,
            timestamp: new Date().toISOString(),
          }),
        })
      });
    } catch (error) {
      console.error('Error sending security alert:', error);
      throw error;
    }
  }
}

export const notificationService = new NotificationService();