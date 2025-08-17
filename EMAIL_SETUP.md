# Contact Form Email Setup

This guide explains how to set up the email functionality for the contact form.

## Overview

The contact form uses **nodemailer** to send emails and includes:
- ✅ Email to website owner with form details
- ✅ Auto-reply confirmation to the client
- ✅ Beautiful HTML email templates with brand colors
- ✅ Error handling and validation
- ✅ Environment variable configuration

## Email Templates

Two custom email templates are included:

### 1. Owner Notification Email
- Professional design with company branding
- Complete form data in a structured layout
- Urgent request highlighting
- Quick action buttons (Reply/Call)
- Brand colors from globals.css

### 2. Client Auto-Reply Email
- Thank you message with next steps
- Contact information
- Professional appearance
- Reference ID for tracking

## Environment Setup

1. **Copy the template file:**
   ```bash
   cp .env.local.template .env.local
   ```

2. **Fill in your email provider details in `.env.local`:**

### For Custom Email Providers (Recommended)
```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contact@yourdomain.com
SMTP_PASS=your-email-password
SMTP_FROM=noreply@yourdomain.com
OWNER_EMAIL=jambsmash20@gmail.com
```

### For Gmail (if needed)
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-gmail@gmail.com
OWNER_EMAIL=jambsmash20@gmail.com
```

### For Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-outlook@outlook.com
SMTP_PASS=your-password
SMTP_FROM=your-outlook@outlook.com
OWNER_EMAIL=jambsmash20@gmail.com
```

## Configuration Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SMTP_HOST` | Your email provider's SMTP server | `mail.yourdomain.com` |
| `SMTP_PORT` | SMTP port (usually 587 or 465) | `587` |
| `SMTP_SECURE` | Use SSL/TLS (true for port 465) | `false` |
| `SMTP_USER` | Your email account username | `contact@yourdomain.com` |
| `SMTP_PASS` | Your email account password/app password | `your-password` |
| `SMTP_FROM` | Email address for outgoing emails | `noreply@yourdomain.com` |
| `OWNER_EMAIL` | Where contact forms are sent | `jambsmash20@gmail.com` |

## Security Notes

- **Never commit `.env.local` to version control**
- Use app passwords instead of regular passwords when possible
- For Gmail, enable 2FA and create an app password
- Test email functionality in development before deploying

## Features

### Form Validation
- Real-time field validation
- Required field checking
- Email format validation
- Phone number validation

### Email Features
- **Responsive HTML templates** - Works on all devices
- **Brand consistency** - Uses your exact color scheme
- **Error handling** - Graceful failure with user feedback
- **Auto-reply** - Professional confirmation emails
- **Priority flagging** - Urgent requests are highlighted

### API Response
```json
{
  "success": true,
  "message": "Your message has been sent successfully!",
  "autoReplyStatus": "sent"
}
```

## Testing

1. Fill out the contact form
2. Check that you receive the notification email
3. Verify the client receives the auto-reply
4. Test with urgent and normal priority requests

## Troubleshooting

### Common Issues

1. **"SMTP configuration error"**
   - Check your SMTP settings
   - Verify credentials are correct
   - Ensure your email provider allows SMTP

2. **"Authentication failed"**
   - Use app passwords for Gmail/Outlook
   - Check username/password combination
   - Verify 2FA settings

3. **"Email service temporarily unavailable"**
   - Check internet connection
   - Verify SMTP server is accessible
   - Check rate limits with your provider

### Testing SMTP Connection
The API automatically verifies the SMTP connection before sending emails.

## Support

If you need help with email setup:
- Check your email provider's SMTP documentation
- Verify firewall settings allow SMTP traffic
- Contact your hosting provider for SMTP details

## Next Steps

After setup:
1. Test the contact form thoroughly
2. Monitor email delivery rates
3. Set up email forwarding if needed
4. Consider setting up DKIM/SPF records for better deliverability
