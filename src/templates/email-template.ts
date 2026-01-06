import { formatCurrency, formatDate } from "@/lib/utils";
import { EmailUser, EmailTransactionDetail } from "@/types/notification.type";

const baseTemplate = (content: string): string => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 30px 20px;
        }
        .button {
            display: inline-block;
            padding: 12px 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
        }
        .footer {
            padding: 20px;
            text-align: center;
            color: #666;
            font-size: 14px;
            border-top: 1px solid #eee;
        }
        .transaction-details {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
        }
        .detail-label {
            font-weight: 600;
            color: #495057;
        }
        .detail-value {
            color: #212529;
        }
        .highlight {
            color: #28a745;
            font-weight: 600;
        }
        .alert {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
        }
        @media (max-width: 600px) {
            .container {
                padding: 10px;
            }
            .content {
                padding: 20px 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        ${content}
    </div>
</body>
</html>
`;

export const userDepositTemplate = (user: EmailUser, data: EmailTransactionDetail): string => {
  const content = `
    <div class="header">
        <h1>Deposit Request Received</h1>
    </div>
    <div class="content">
        <h2>Hello ${user.fullName},</h2>
        <p>We have received your deposit request and it's currently being processed.</p>
        
        <div class="transaction-details">
            <h3>Transaction Details:</h3>
            <div class="detail-row">
                <span class="detail-label">Amount:</span>
                <span class="detail-value highlight">${formatCurrency(data.amount)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Transaction ID:</span>
                <span class="detail-value">${data.id}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${formatDate(data.createdAt)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-value">${data.status}</span>
            </div>
        </div>
        
        <div class="alert">
            <strong>Important:</strong> Your deposit will be processed within 1-24 hours. You'll receive another email once it's approved.
        </div>
        
        <p>If you have any questions, please contact our support team.</p>
        
        <p>Best regards,<br>The Investment Team</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
        <p>This is an automated message, please do not reply to this email.</p>
    </div>
  `;
  
  return baseTemplate(content);
};

export const adminDepositTemplate = (user: EmailUser, data: EmailTransactionDetail): string => {
  const content = `
    <div class="header" style="background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);">
        <h1>New Deposit Request</h1>
    </div>
    <div class="content">
        <h2>Admin Alert</h2>
        <p>A new deposit request requires your attention.</p>
        
        <div class="transaction-details">
            <h3>User Details:</h3>
            <div class="detail-row">
                <span class="detail-label">User:</span>
                <span class="detail-value">${user.fullName} (${user.email})</span>
            </div>
            
            <h3>Transaction Details:</h3>
            <div class="detail-row">
                <span class="detail-label">Amount:</span>
                <span class="detail-value highlight">${formatCurrency(data.amount)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Transaction ID:</span>
                <span class="detail-value">${data.id}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${formatDate(data.createdAt)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Description:</span>
                <span class="detail-value">${data.description || 'No description provided'}</span>
            </div>
        </div>
        
        <div class="alert">
            <strong>Action Required:</strong> Please review and process this deposit request in the admin panel.
        </div>
        
        <a href="${process.env.ADMIN_URL}/transactions/${data.id}" class="button">Review Deposit</a>
        
        <p>Best regards,<br>System Notification</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Admin Dashboard</p>
    </div>
  `;
  
  return baseTemplate(content);
};

export const userWithdrawalTemplate = (user: EmailUser, data: EmailTransactionDetail): string => {
  const content = `
    <div class="header" style="background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);">
        <h1>Withdrawal Request Received</h1>
    </div>
    <div class="content">
        <h2>Hello ${user.fullName},</h2>
        <p>We have received your withdrawal request and it's currently being processed.</p>
        
        <div class="transaction-details">
            <h3>Transaction Details:</h3>
            <div class="detail-row">
                <span class="detail-label">Amount:</span>
                <span class="detail-value highlight">${formatCurrency(data.amount)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Transaction ID:</span>
                <span class="detail-value">${data.id}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${formatDate(data.createdAt)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-value">${data.status}</span>
            </div>
        </div>
        
        <div class="alert">
            <strong>Processing Time:</strong> Withdrawals are typically processed within 24-48 hours.
        </div>
        
        <p>You'll receive another notification once your withdrawal is approved and processed.</p>
        
        <p>Best regards,<br>The Investment Team</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
    </div>
  `;
  
  return baseTemplate(content);
};

export const adminWithdrawalTemplate = (user: EmailUser, data: EmailTransactionDetail): string => {
  const content = `
    <div class="header" style="background: linear-gradient(135deg, #ffc107 0%, #e0a800 100%);">
        <h1>New Withdrawal Request</h1>
    </div>
    <div class="content">
        <h2>Admin Alert</h2>
        <p>A new withdrawal request requires your attention.</p>
        
        <div class="transaction-details">
            <h3>User Details:</h3>
            <div class="detail-row">
                <span class="detail-label">User:</span>
                <span class="detail-value">${user.fullName} (${user.email})</span>
            </div>
            
            <h3>Transaction Details:</h3>
            <div class="detail-row">
                <span class="detail-label">Amount:</span>
                <span class="detail-value highlight">${formatCurrency(data.amount)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Transaction ID:</span>
                <span class="detail-value">${data.id}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${formatDate(data.createdAt)}</span>
            </div>
        </div>
        
        <div class="alert">
            <strong>Action Required:</strong> Please review and process this withdrawal request in the admin panel.
        </div>
        
        <a href="${process.env.ADMIN_URL}/transactions/${data.id}" class="button">Review Withdrawal</a>
        
        <p>Best regards,<br>System Notification</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Admin Dashboard</p>
    </div>
  `;
  
  return baseTemplate(content);
};

export const activateInvestmentTemplate = (user: EmailUser, data: EmailTransactionDetail): string => {
  const content = `
    <div class="header" style="background: linear-gradient(135deg, #28a745 0%, #218838 100%);">
        <h1>Deposit Approved & Investment Activated! 🎉</h1>
    </div>
    <div class="content">
        <h2>Congratulations ${user.fullName}!</h2>
        <p>Your deposit has been approved and your investment is now active.</p>
        
        <div class="transaction-details">
            <h3>Investment Details:</h3>
            <div class="detail-row">
                <span class="detail-label">Investment Amount:</span>
                <span class="detail-value highlight">${formatCurrency(data.amount)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Transaction ID:</span>
                <span class="detail-value">${data.id}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Investment ID:</span>
                <span class="detail-value">${data.investmentId}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Activated Date:</span>
                <span class="detail-value">${formatDate(data.processedAt || new Date())}</span>
            </div>
        </div>
        
        <div class="alert">
            <strong>Next Steps:</strong> Your investment will now start earning returns. You'll receive ROI notifications as they are credited to your account.
        </div>
        
        <a href="${process.env.APP_URL}/dashboard/investments" class="button">View My Investments</a>
        
        <p>Thank you for investing with us!</p>
        <p>Best regards,<br>The Investment Team</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
    </div>
  `;
  
  return baseTemplate(content);
};

export const investmentActivatedTemplate = (user: EmailUser, data: EmailTransactionDetail): string => {
  return baseTemplate(`
    <div class="header" style="background: linear-gradient(135deg, #28a745 0%, #218838 100%);">
        <h1>🎉 Investment Activated Successfully!</h1>
    </div>
    <div class="content">
        <h2>Hello ${user.fullName},</h2>
        <p>Great news! Your investment has been activated and is now earning returns.</p>
        
        <div class="transaction-details">
            <h3>Investment Details:</h3>
            <div class="detail-row">
                <span class="detail-label">Investment Amount:</span>
                <span class="detail-value highlight">${formatCurrency(data.amount)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Investment ID:</span>
                <span class="detail-value">${data.investmentId}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Activation Date:</span>
                <span class="detail-value">${formatDate(new Date())}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-value highlight">Active</span>
            </div>
        </div>
        
        <div class="alert">
            <strong>💡 Pro Tip:</strong> Monitor your investment growth in your dashboard. You'll receive regular ROI updates.
        </div>
        
        <a href="${process.env.APP_URL}/dashboard/investments/${data.investmentId}" class="button">View Investment Details</a>
        
        <p>Best regards,<br>Your Investment Team</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
    </div>
  `);
};

export const roiTemplate = (user: EmailUser, data: {
  investmentId: string;
  amount: number;
  totalBalance: number;
  date: string;
}): string => {
  return baseTemplate(`
    <div class="header" style="background: linear-gradient(135deg, #20c997 0%, #17a2b8 100%);">
        <h1>💰 ROI Credited to Your Investment!</h1>
    </div>
    <div class="content">
        <h2>Hello ${user.fullName},</h2>
        <p>Your investment continues to grow! We've just credited ROI to your account.</p>
        
        <div class="transaction-details">
            <h3>ROI Details:</h3>
            <div class="detail-row">
                <span class="detail-label">ROI Amount:</span>
                <span class="detail-value highlight">+${formatCurrency(data.amount)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Investment ID:</span>
                <span class="detail-value">${data.investmentId}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Total Balance:</span>
                <span class="detail-value highlight">${formatCurrency(data.totalBalance)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Credit Date:</span>
                <span class="detail-value">${formatDate(data.date)}</span>
            </div>
        </div>
        
        <div class="alert">
            <strong>📈 Keep Growing:</strong> Your investment continues to earn returns. Keep an eye on your dashboard for more updates!
        </div>
        
        <a href="${process.env.APP_URL}/dashboard/investments/${data.investmentId}" class="button">View Investment Details</a>
        
        <p>Happy Investing!</p>
        <p>Best regards,<br>The Investment Team</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
    </div>
  `);
};

export const investmentCompletedTemplate = (user: EmailUser, data: {
  investmentId: string;
  principalAmount: number;
  totalReturns: number;
  duration: string;
  completionDate: string;
}): string => {
  const totalAmount = data.principalAmount + data.totalReturns;
  
  return baseTemplate(`
    <div class="header" style="background: linear-gradient(135deg, #6f42c1 0%, #6610f2 100%);">
        <h1>🏆 Investment Completed Successfully!</h1>
    </div>
    <div class="content">
        <h2>Congratulations ${user.fullName}! 🎊</h2>
        <p>Your investment has reached maturity and has been completed successfully.</p>
        
        <div class="transaction-details">
            <h3>Investment Summary:</h3>
            <div class="detail-row">
                <span class="detail-label">Principal Amount:</span>
                <span class="detail-value">${formatCurrency(data.principalAmount)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Total Returns:</span>
                <span class="detail-value highlight">+${formatCurrency(data.totalReturns)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Total Received:</span>
                <span class="detail-value highlight">${formatCurrency(totalAmount)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Investment Duration:</span>
                <span class="detail-value">${data.duration}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Completion Date:</span>
                <span class="detail-value">${formatDate(data.completionDate)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Investment ID:</span>
                <span class="detail-value">${data.investmentId}</span>
            </div>
        </div>
        
        <div class="alert">
            <strong>🎯 What's Next?</strong> The total amount (principal + returns) has been credited to your account balance. You can withdraw it or reinvest for continued growth!
        </div>
        
        <a href="${process.env.APP_URL}/dashboard/investments" class="button">View All Investments</a>
        <a href="${process.env.APP_URL}/dashboard/withdraw" style="margin-left: 10px;" class="button">Make a Withdrawal</a>
        
        <p>Thank you for investing with us. We look forward to serving you again!</p>
        <p>Best regards,<br>The Investment Team</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
    </div>
  `);
};

export const welcomeEmailTemplate = (user: EmailUser): string => {
  return baseTemplate(`
    <div class="header">
        <h1>👋 Welcome to Our Platform!</h1>
    </div>
    <div class="content">
        <h2>Hello ${user.fullName},</h2>
        <p>Welcome to our investment platform! We're excited to have you on board.</p>
        
        <div class="alert">
            <strong>Get Started:</strong>
            <ol style="margin: 10px 0; padding-left: 20px;">
                <li>Complete your profile verification</li>
                <li>Make your first deposit</li>
                <li>Choose an investment plan</li>
                <li>Start earning returns</li>
            </ol>
        </div>
        
        <p>Here are some resources to help you get started:</p>
        <a href="${process.env.APP_URL}/dashboard" class="button">Go to Dashboard</a>
        <a href="${process.env.APP_URL}/faq" style="margin-left: 10px;" class="button">View FAQ</a>
        
        <p>If you have any questions, our support team is here to help.</p>
        
        <p>Best regards,<br>The Investment Team</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
    </div>
  `);
};

export const passwordResetTemplate = (user: EmailUser, data: {
  resetLink: string;
  expiryHours: number;
}): string => {
  return baseTemplate(`
    <div class="header" style="background: linear-gradient(135deg, #fd7e14 0%, #e9690c 100%);">
        <h1>🔒 Password Reset Request</h1>
    </div>
    <div class="content">
        <h2>Hello ${user.fullName},</h2>
        <p>We received a request to reset your password. Click the button below to create a new password:</p>
        
        <a href="${data.resetLink}" class="button">Reset Password</a>
        
        <div class="alert">
            <strong>Security Note:</strong>
            <ul style="margin: 10px 0; padding-left: 20px;">
                <li>This link will expire in ${data.expiryHours} hours</li>
                <li>If you didn't request this, please ignore this email</li>
                <li>Never share your password with anyone</li>
            </ul>
        </div>
        
        <p>For security reasons, this link can only be used once.</p>
        
        <p>Best regards,<br>Security Team</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
        <p><small>If the button doesn't work, copy and paste this link: ${data.resetLink}</small></p>
    </div>
  `);
};

export const securityAlertTemplate = (user: EmailUser, data: {
  alertType: string;
  deviceInfo: string;
  location: string;
  timestamp: string;
}): string => {
  const alertMessages: Record<string, string> = {
    login: 'New login detected on your account',
    password_change: 'Your password was recently changed',
    profile_update: 'Important changes were made to your profile',
  };

  return baseTemplate(`
    <div class="header" style="background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);">
        <h1>⚠️ Security Alert</h1>
    </div>
    <div class="content">
        <h2>Hello ${user.fullName},</h2>
        <p>${alertMessages[data.alertType] || 'Security activity detected on your account'}.</p>
        
        <div class="transaction-details">
            <h3>Activity Details:</h3>
            <div class="detail-row">
                <span class="detail-label">Activity Type:</span>
                <span class="detail-value">${data.alertType.replace('_', ' ').toUpperCase()}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Device:</span>
                <span class="detail-value">${data.deviceInfo}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Location:</span>
                <span class="detail-value">${data.location}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Time:</span>
                <span class="detail-value">${formatDate(data.timestamp)}</span>
            </div>
        </div>
        
        <div class="alert">
            <strong>If you recognize this activity:</strong> No action is needed.
            <br><br>
            <strong>If you don't recognize this activity:</strong>
            <ol style="margin: 10px 0; padding-left: 20px;">
                <li>Change your password immediately</li>
                <li>Enable two-factor authentication</li>
                <li>Contact our support team</li>
            </ol>
        </div>
        
        <a href="${process.env.APP_URL}/dashboard/security" class="button">Review Account Security</a>
        
        <p>Best regards,<br>Security Team</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
    </div>
  `);
};

export const accountVerifiedTemplate = (user: EmailUser): string => {
  return baseTemplate(`
    <div class="header" style="background: linear-gradient(135deg, #28a745 0%, #218838 100%);">
        <h1>✅ Account Verified Successfully!</h1>
    </div>
    <div class="content">
        <h2>Congratulations ${user.fullName}!</h2>
        <p>Your account has been successfully verified. You now have full access to all platform features.</p>
        
        <div class="alert">
            <strong>Unlocked Features:</strong>
            <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Unlimited deposits and withdrawals</li>
                <li>Access to all investment plans</li>
                <li>Priority customer support</li>
                <li>Advanced trading features</li>
            </ul>
        </div>
        
        <a href="${process.env.APP_URL}/dashboard/invest" class="button">Start Investing Now</a>
        
        <p>Thank you for completing the verification process.</p>
        <p>Best regards,<br>Verification Team</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
    </div>
  `);
};

export const rejectInvestmentDepositTemplate = (
  user: EmailUser,
  data: EmailTransactionDetail
): string => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Deposit Rejected</h2>

      <p>Dear ${user.fullName},</p>

      <p>
        We regret to inform you that your investment deposit request
        <strong>(Investment ID: ${data.investmentId})</strong>
        has been reviewed and rejected.
      </p>

      <p><strong>Transaction Details:</strong></p>
      <ul>
        <li>Amount: ${data.amount}</li>
        <li>Status: ${data.status}</li>
        <li>Submitted On: ${data.createdAt}</li>
      </ul>

      ${
        data.description
          ? `<p><strong>Reason:</strong> ${data.description}</p>`
          : ""
      }

      <p>
        If you believe this was a mistake or need further clarification,
        please contact our support team.
      </p>

      <p>Best regards,<br />Support Team</p>
    </div>
  `;
};

export const rejectWithdrawalTemplate = (
  user: EmailUser,
  data: EmailTransactionDetail
): string => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Withdrawal Request Rejected</h2>

      <p>Dear ${user.fullName},</p>

      <p>
        Your withdrawal request has been reviewed and unfortunately
        could not be approved at this time.
      </p>

      <p><strong>Withdrawal Details:</strong></p>
      <ul>
        <li>Amount: ${data.amount}</li>
        <li>Status: ${data.status}</li>
        <li>Requested On: ${data.createdAt}</li>
      </ul>

      ${
        data.description
          ? `<p><strong>Reason:</strong> ${data.description}</p>`
          : ""
      }

      <p>
        Please review your account details or reach out to support
        if you require further assistance.
      </p>

      <p>Best regards,<br />Support Team</p>
    </div>
  `;
};

export const paidWithdrawalTemplate = (
  user: EmailUser,
  data: EmailTransactionDetail
): string => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Withdrawal Successfully Processed</h2>

      <p>Dear ${user.fullName},</p>

      <p>
        Good news! Your withdrawal request has been successfully processed
        and the funds have been sent to your registered payment method.
      </p>

      <p><strong>Transaction Details:</strong></p>
      <ul>
        <li>Amount: ${data.amount}</li>
        <li>Status: ${data.status}</li>
        <li>Processed On: ${data.processedAt}</li>
      </ul>

      <p>
        If you do not receive the funds within the expected timeframe,
        please contact our support team immediately.
      </p>

      <p>Thank you for investing with us.</p>

      <p>Best regards,<br />Finance Team</p>
    </div>
  `;
};
