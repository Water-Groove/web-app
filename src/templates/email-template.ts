import { config } from "@/lib/config";
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
            background-color: #152333;
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
            background-color: #3182ce;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
            border: none;
            cursor: pointer;
        }
        .button:hover {
            background-color: #2c5282;
        }
        .button-success {
            background-color: #38a169;
        }
        .button-success:hover {
            background-color: #2f855a;
        }
        .button-warning {
            background-color: #ed8936;
        }
        .button-warning:hover {
            background-color: #dd6b20;
        }
        .button-danger {
            background-color: #e53e3e;
        }
        .button-danger:hover {
            background-color: #c53030;
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
            padding-bottom: 10px;
            border-bottom: 1px solid #e9ecef;
        }
        .detail-row:last-child {
            border-bottom: none;
            padding-bottom: 0;
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
        .highlight-danger {
            color: #e53e3e;
            font-weight: 600;
        }
        .highlight-info {
            color: #3182ce;
            font-weight: 600;
        }
        .alert {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
        }
        .alert-info {
            background: #ebf8ff;
            border: 1px solid #bee3f8;
        }
        .alert-success {
            background: #f0fff4;
            border: 1px solid #c6f6d5;
        }
        .alert-danger {
            background: #fff5f5;
            border: 1px solid #fed7d7;
        }
        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
        }
        .status-pending {
            background-color: #fffaf0;
            color: #c05621;
            border: 1px solid #fed7d7;
        }
        .status-approved {
            background-color: #f0fff4;
            color: #38a169;
            border: 1px solid #c6f6d5;
        }
        .status-completed {
            background-color: #ebf8ff;
            color: #3182ce;
            border: 1px solid #bee3f8;
        }
        .status-rejected {
            background-color: #fff5f5;
            color: #e53e3e;
            border: 1px solid #fed7d7;
        }
        .amount-display {
            font-size: 28px;
            font-weight: 700;
            text-align: center;
            margin: 20px 0;
        }
        @media (max-width: 600px) {
            .container {
                padding: 10px;
            }
            .content {
                padding: 20px 10px;
            }
            .detail-row {
                flex-direction: column;
                gap: 5px;
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
        <p>Water Grove Investment Platform</p>
    </div>
    <div class="content">
        <h2>Hello ${user.fullName},</h2>
        <p>We have received your deposit request and it's currently being processed.</p>
        
        <div class="transaction-details">
            <h3>Transaction Details:</h3>
            <div class="amount-display" style="color: #3182ce;">₦${formatCurrency(data.amount)}</div>
            
            <div class="detail-row">
                <span class="detail-label">Transaction ID:</span>
                <span class="detail-value">${data.investmentId}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-value">
                    <span class="status-badge status-${data.status.toLowerCase()}">${data.status}</span>
                </span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${formatDate(data.createdAt)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Reference:</span>
                <span class="detail-value">${data.reference || 'N/A'}</span>
            </div>
        </div>
        
        <div class="alert alert-info">
            <strong>Important:</strong> Your deposit will be processed within 1-24 hours. You'll receive another email once it's approved.
        </div>
        
        <p>If you have any questions, please contact our support team.</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${config.USER_URL}/transactions" class="button">View Deposit</a>
        </div>
        
        <p>Best regards,<br>The Water Grove Investment Team</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Water Grove Investment Platform. All rights reserved.</p>
        <p>This is an automated message, please do not reply to this email.</p>
    </div>
  `;

    return baseTemplate(content);
};

export const adminDepositTemplate = (user: EmailUser, data: EmailTransactionDetail): string => {
    const content = `
    <div class="header" style="background-color: #152333;">
        <h1>New Deposit Request</h1>
        <p>Admin Alert - Action Required</p>
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
            <div class="amount-display" style="color: #38a169;">₦${formatCurrency(data.amount)}</div>
            
            <div class="detail-row">
                <span class="detail-label">Transaction ID:</span>
                <span class="detail-value">${data.investmentId}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${formatDate(data.createdAt)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-value">
                    <span class="status-badge status-${data.status.toLowerCase()}">${data.status}</span>
                </span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Description:</span>
                <span class="detail-value">${data.description || 'No description provided'}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Reference:</span>
                <span class="detail-value">${data.reference || 'N/A'}</span>
            </div>
        </div>
        
        <div class="alert alert-danger">
            <strong>Action Required:</strong> Please review and process this deposit request in the admin panel.
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${config.ADMIN_URL}/deposits" class="button button-success">Review Deposit</a>
        </div>
        
        <p>Best regards,<br>Water Grove Admin System</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Water Grove Admin Dashboard</p>
        <p>This notification was sent to administrators only.</p>
    </div>
  `;

    return baseTemplate(content);
};

export const userWithdrawalTemplate = (user: EmailUser, data: EmailTransactionDetail): string => {
    const content = `
    <div class="header" style="background-color: #3182ce;">
        <h1>Withdrawal Request Received</h1>
        <p>Water Grove Investment Platform</p>
    </div>
    <div class="content">
        <h2>Hello ${user.fullName},</h2>
        <p>We have received your withdrawal request and it's currently being processed.</p>
        
        <div class="transaction-details">
            <h3>Transaction Details:</h3>
            <div class="amount-display" style="color: #e53e3e;">-₦${formatCurrency(data.amount)}</div>
            
            <div class="detail-row">
                <span class="detail-label">Transaction ID:</span>
                <span class="detail-value">${data.investmentId}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-value">
                    <span class="status-badge status-${data.status.toLowerCase()}">${data.status}</span>
                </span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${formatDate(data.createdAt)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Reference:</span>
                <span class="detail-value">${data.reference || 'N/A'}</span>
            </div>
        </div>
        
        <div class="alert alert-info">
            <strong>Processing Time:</strong> Withdrawals are typically processed within 24-48 hours.
        </div>
        
        <p>You'll receive another notification once your withdrawal is approved and processed.</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${config.USER_URL}/transactions" class="button">Track Withdrawal</a>
        </div>
        
        <p>Best regards,<br>The Water Grove Investment Team</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Water Grove Investment Platform. All rights reserved.</p>
    </div>
  `;

    return baseTemplate(content);
};

export const adminWithdrawalTemplate = (user: EmailUser, data: EmailTransactionDetail): string => {
    const content = `
    <div class="header" style="background-color: #ed8936;">
        <h1>New Withdrawal Request</h1>
        <p>Admin Alert - Action Required</p>
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
            <div class="amount-display" style="color: #e53e3e;">-₦${formatCurrency(data.amount)}</div>
            
            <div class="detail-row">
                <span class="detail-label">Transaction ID:</span>
                <span class="detail-value">${data.investmentId}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${formatDate(data.createdAt)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-value">
                    <span class="status-badge status-${data.status.toLowerCase()}">${data.status}</span>
                </span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Reference:</span>
                <span class="detail-value">${data.reference || 'N/A'}</span>
            </div>
        </div>
        
        <div class="alert alert-danger">
            <strong>Action Required:</strong> Please review and process this withdrawal request in the admin panel.
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${config.ADMIN_URL}/withdrawals" class="button button-success">Review Withdrawal</a>
        </div>
        
        <p>Best regards,<br>Water Grove Admin System</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Water Grove Admin Dashboard</p>
    </div>
  `;

    return baseTemplate(content);
};

export const activateInvestmentTemplate = (user: EmailUser, data: EmailTransactionDetail): string => {
    const content = `
    <div class="header" style="background-color: #38a169;">
        <h1>Deposit Approved & Investment Activated!</h1>
        <p>Water Grove Investment Platform</p>
    </div>
    <div class="content">
        <h2>Congratulations ${user.fullName}!</h2>
        <p>Your deposit has been approved and your investment is now active.</p>
        
        <div class="transaction-details">
            <h3>Investment Details:</h3>
            <div class="amount-display" style="color: #38a169;">₦${formatCurrency(data.amount)}</div>
            
            <div class="detail-row">
                <span class="detail-label">Transaction ID:</span>
                <span class="detail-value">${data.investmentId}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Investment ID:</span>
                <span class="detail-value">${data.investmentId}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-value">
                    <span class="status-badge status-approved">Approved</span>
                </span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Activated Date:</span>
                <span class="detail-value">${formatDate(data.processedAt || new Date())}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Processed By:</span>
                <span class="detail-value">${data.processedByAdminId || 'System'}</span>
            </div>
        </div>
        
        <div class="alert alert-success">
            <strong>Next Steps:</strong> Your investment will now start earning returns. You'll receive ROI notifications as they are credited to your account.
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${config.USER_URL}investments" class="button button-success">View My Investments</a>
        </div>
        
        <p>Thank you for investing with us!</p>
        <p>Best regards,<br>The Water Grove Investment Team</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Water Grove Investment Platform. All rights reserved.</p>
    </div>
  `;

    return baseTemplate(content);
};

export const investmentActivatedTemplate = (user: EmailUser, data: EmailTransactionDetail): string => {
    const content = `
    <div class="header" style="background-color: #38a169;">
        <h1>Investment Activated Successfully!</h1>
        <p>Water Grove Investment Platform</p>
    </div>
    <div class="content">
        <h2>Hello ${user.fullName},</h2>
        <p>Great news! Your investment has been activated and is now earning returns.</p>
        
        <div class="transaction-details">
            <h3>Investment Details:</h3>
            <div class="amount-display" style="color: #38a169;">₦${formatCurrency(data.amount)}</div>
            
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
                <span class="detail-value">
                    <span class="status-badge status-approved">Active</span>
                </span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Investment Type:</span>
                <span class="detail-value">${data.type || 'Standard'}</span>
            </div>
        </div>
        
        <div class="alert alert-info">
            <strong>Pro Tip:</strong> Monitor your investment growth in your dashboard. You'll receive regular ROI updates.
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${config.USER_URL}/investments" class="button button-success">View Investment Details</a>
        </div>
        
        <p>Best regards,<br>Your Water Grove Investment Team</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Water Grove Investment Platform. All rights reserved.</p>
    </div>
  `;

    return baseTemplate(content);
};

export const roiTemplate = (user: EmailUser, data: {
    investmentId: string;
    amount: number;
    totalBalance: number;
    date: string;
}): string => {
    const content = `
    <div class="header" style="background-color: #20c997;">
        <h1>ROI Credited to Your Investment!</h1>
        <p>Water Grove Investment Platform</p>
    </div>
    <div class="content">
        <h2>Hello ${user.fullName},</h2>
        <p>Your investment continues to grow! We've just credited ROI to your account.</p>
        
        <div class="transaction-details">
            <h3>ROI Details:</h3>
            <div class="amount-display" style="color: #20c997;">+₦${formatCurrency(data.amount)}</div>
            
            <div class="detail-row">
                <span class="detail-label">Investment ID:</span>
                <span class="detail-value">${data.investmentId}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Total Balance:</span>
                <span class="detail-value highlight">₦${formatCurrency(data.totalBalance)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Credit Date:</span>
                <span class="detail-value">${formatDate(data.date)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Transaction Type:</span>
                <span class="detail-value">
                    <span class="status-badge status-completed">ROI Payment</span>
                </span>
            </div>
        </div>
        
        <div class="alert alert-success">
            <strong>Keep Growing:</strong> Your investment continues to earn returns. Keep an eye on your dashboard for more updates!
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${config.USER_URL}/transactions" class="button button-success">View ROI Details</a>
        </div>
        
        <p>Happy Investing!</p>
        <p>Best regards,<br>The Water Grove Investment Team</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Water Grove Investment Platform. All rights reserved.</p>
    </div>
  `;

    return baseTemplate(content);
};

export const investmentCompletedTemplate = (user: EmailUser, data: {
    investmentId: string;
    principalAmount: number;
    totalReturns: number;
    duration: string;
    completionDate: string;
}): string => {
    const totalAmount = data.principalAmount + data.totalReturns;

    const content = `
    <div class="header" style="background-color: #6f42c1;">
        <h1>Investment Completed Successfully!</h1>
        <p>Water Grove Investment Platform</p>
    </div>
    <div class="content">
        <h2>Congratulations ${user.fullName}!</h2>
        <p>Your investment has reached maturity and has been completed successfully.</p>
        
        <div class="transaction-details">
            <h3>Investment Summary:</h3>
            <div class="amount-display" style="color: #6f42c1;">₦${formatCurrency(totalAmount)}</div>
            
            <div class="detail-row">
                <span class="detail-label">Principal Amount:</span>
                <span class="detail-value">₦${formatCurrency(data.principalAmount)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Total Returns:</span>
                <span class="detail-value highlight">+₦${formatCurrency(data.totalReturns)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Total Received:</span>
                <span class="detail-value highlight">₦${formatCurrency(totalAmount)}</span>
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
        
        <div class="alert alert-success">
            <strong>What's Next?</strong> The total amount (principal + returns) has been credited to your account balance. You can withdraw it or reinvest for continued growth!
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${config.USER_URL}/investments" class="button button-success">View All Investments</a>
        </div>
        
        <p>Thank you for investing with us. We look forward to serving you again!</p>
        <p>Best regards,<br>The Water Grove Investment Team</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Water Grove Investment Platform. All rights reserved.</p>
    </div>
  `;

    return baseTemplate(content);
};

export const welcomeEmailTemplate = (user: EmailUser): string => {
    const content = `
    <div class="header">
        <h1>Welcome to Our Platform!</h1>
        <p>Water Grove Investment Platform</p>
    </div>
    <div class="content">
        <h2>Hello ${user.fullName},</h2>
        <p>Welcome to Water Grove Investment Platform! We're excited to have you on board.</p>
        
        <div class="alert alert-info">
            <strong>Get Started:</strong>
            <ol style="margin: 10px 0; padding-left: 20px;">
                <li>Complete your profile verification</li>
                <li>Make your first deposit</li>
                <li>Choose an investment plan</li>
                <li>Start earning returns</li>
            </ol>
        </div>
        
        <p>Here are some resources to help you get started:</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${config.USER_URL}/dashboard" class="button button-success">Go to Dashboard</a>
        </div>
        
        <p>If you have any questions, our support team is here to help.</p>
        
        <p>Best regards,<br>The Water Grove Investment Team</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Water Grove Investment Platform. All rights reserved.</p>
    </div>
  `;

    return baseTemplate(content);
};

export const passwordResetTemplate = (user: EmailUser, data: {
    resetLink: string;
    expiryHours: number;
}): string => {
    const content = `
    <div class="header" style="background-color: #ed8936;">
        <h1>Password Reset Request</h1>
        <p>Water Grove Investment Platform</p>
    </div>
    <div class="content">
        <h2>Hello ${user.fullName},</h2>
        <p>We received a request to reset your password. Click the button below to create a new password:</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${data.resetLink}" class="button button-warning">Reset Password</a>
        </div>
        
        <div class="alert alert-danger">
            <strong>Security Note:</strong>
            <ul style="margin: 10px 0; padding-left: 20px;">
                <li>This link will expire in ${data.expiryHours} hours</li>
                <li>If you didn't request this, please ignore this email</li>
                <li>Never share your password with anyone</li>
            </ul>
        </div>
        
        <p>For security reasons, this link can only be used once.</p>
        
        <p>Best regards,<br>Water Grove Security Team</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Water Grove Investment Platform. All rights reserved.</p>
        <p style="font-size: 12px; color: #666;">If the button doesn't work, copy and paste this link: ${data.resetLink}</p>
    </div>
  `;

    return baseTemplate(content);
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

    const content = `
    <div class="header" style="background-color: #e53e3e;">
        <h1>Security Alert</h1>
        <p>Water Grove Investment Platform</p>
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
        
        <div class="alert alert-danger">
            <strong>If you recognize this activity:</strong> No action is needed.
            <br><br>
            <strong>If you don't recognize this activity:</strong>
            <ol style="margin: 10px 0; padding-left: 20px;">
                <li>Change your password immediately</li>
                <li>Enable two-factor authentication</li>
                <li>Contact our support team</li>
            </ol>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${config.USER_URL}/settings" class="button button-danger">Review Account Security</a>
        </div>
        
        <p>Best regards,<br>Water Grove Security Team</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Water Grove Investment Platform. All rights reserved.</p>
    </div>
  `;

    return baseTemplate(content);
};

export const rejectInvestmentDepositTemplate = (
    user: EmailUser,
    data: EmailTransactionDetail
): string => {
    const content = `
    <div class="header" style="background-color: #e53e3e;">
        <h1>Deposit Rejected</h1>
        <p>Water Grove Investment Platform</p>
    </div>
    <div class="content">
        <h2>Dear ${user.fullName},</h2>
        
        <p>We regret to inform you that your investment deposit request <strong>(Transaction ID: ${data.investmentId})</strong> has been reviewed and rejected.</p>
        
        <div class="transaction-details">
            <h3>Transaction Details:</h3>
            <div class="amount-display" style="color: #e53e3e;">₦${formatCurrency(data.amount)}</div>
            
            <div class="detail-row">
                <span class="detail-label">Transaction ID:</span>
                <span class="detail-value">${data.investmentId}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-value">
                    <span class="status-badge status-rejected">${data.status}</span>
                </span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Submitted On:</span>
                <span class="detail-value">${formatDate(data.createdAt)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Processed By:</span>
                <span class="detail-value">${data.processedByAdminId || 'System'}</span>
            </div>
        </div>
        
        ${data.description ? `
            <div class="alert alert-danger">
                <strong>Reason:</strong> ${data.description}
            </div>
        ` : ''}
        
        <p>If you believe this was a mistake or need further clarification, please contact our support team.</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${config.USER_URL}/support" class="button button-danger">Contact Support</a>
        </div>
        
        <p>Best regards,<br>Water Grove Support Team</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Water Grove Investment Platform. All rights reserved.</p>
    </div>
  `;

    return baseTemplate(content);
};

export const rejectWithdrawalTemplate = (
    user: EmailUser,
    data: EmailTransactionDetail
): string => {
    const content = `
    <div class="header" style="background-color: #e53e3e;">
        <h1>Withdrawal Request Rejected</h1>
        <p>Water Grove Investment Platform</p>
    </div>
    <div class="content">
        <h2>Dear ${user.fullName},</h2>
        
        <p>Your withdrawal request has been reviewed and unfortunately could not be approved at this time.</p>
        
        <div class="transaction-details">
            <h3>Withdrawal Details:</h3>
            <div class="amount-display" style="color: #e53e3e;">-₦${formatCurrency(data.amount)}</div>
            
            <div class="detail-row">
                <span class="detail-label">Transaction ID:</span>
                <span class="detail-value">${data.investmentId}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-value">
                    <span class="status-badge status-rejected">${data.status}</span>
                </span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Requested On:</span>
                <span class="detail-value">${formatDate(data.createdAt)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Processed By:</span>
                <span class="detail-value">${data.processedByAdminId || 'System'}</span>
            </div>
        </div>
        
        ${data.description ? `
            <div class="alert alert-danger">
                <strong>Reason:</strong> ${data.description}
            </div>
        ` : ''}
        
        <p>Please review your account details or reach out to support if you require further assistance.</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${config.USER_URL}/support" class="button button-danger">Contact Support</a>
        </div>
        
        <p>Best regards,<br>Water Grove Support Team</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Water Grove Investment Platform. All rights reserved.</p>
    </div>
  `;

    return baseTemplate(content);
};

export const paidWithdrawalTemplate = (
    user: EmailUser,
    data: EmailTransactionDetail
): string => {
    const content = `
    <div class="header" style="background-color: #38a169;">
        <h1>Withdrawal Successfully Processed</h1>
        <p>Water Grove Investment Platform</p>
    </div>
    <div class="content">
        <h2>Dear ${user.fullName},</h2>
        
        <p>Good news! Your withdrawal request has been successfully processed and the funds have been sent to your registered payment method.</p>
        
        <div class="transaction-details">
            <h3>Transaction Details:</h3>
            <div class="amount-display" style="color: #38a169;">-₦${formatCurrency(data.amount)}</div>
            
            <div class="detail-row">
                <span class="detail-label">Transaction ID:</span>
                <span class="detail-value">${data.investmentId}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-value">
                    <span class="status-badge status-completed">${data.status}</span>
                </span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Processed On:</span>
                <span class="detail-value">${formatDate(data.processedAt || new Date())}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Processed By:</span>
                <span class="detail-value">${data.processedByAdminId || 'Finance Team'}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Reference:</span>
                <span class="detail-value">${data.reference || 'N/A'}</span>
            </div>
        </div>
        
        <div class="alert alert-success">
            <strong>Important:</strong> If you do not receive the funds within the expected timeframe, please contact our support team immediately.
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${config.USER_URL}/transactions" class="button button-success">View Transactions</a>
        </div>
        
        <p>Thank you for investing with us.</p>
        <p>Best regards,<br>Water Grove Finance Team</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Water Grove Investment Platform. All rights reserved.</p>
    </div>
  `;

    return baseTemplate(content);
};

// Additional template that might be used in the NotificationService
export const accountVerifiedTemplate = (user: EmailUser): string => {
    const content = `
    <div class="header" style="background-color: #38a169;">
        <h1>Account Verified Successfully!</h1>
        <p>Water Grove Investment Platform</p>
    </div>
    <div class="content">
        <h2>Congratulations ${user.fullName}!</h2>
        <p>Your account has been successfully verified. You now have full access to all platform features.</p>
        
        <div class="alert alert-success">
            <strong>Unlocked Features:</strong>
            <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Unlimited deposits and withdrawals</li>
                <li>Access to all investment plans</li>
                <li>Priority customer support</li>
                <li>Advanced investment features</li>
            </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${config.USER_URL} class="button button-success">Start Investing Now</a>
        </div>
        
        <p>Thank you for completing the verification process.</p>
        <p>Best regards,<br>Water Grove Verification Team</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Water Grove Investment Platform. All rights reserved.</p>
    </div>
  `;

    return baseTemplate(content);
};