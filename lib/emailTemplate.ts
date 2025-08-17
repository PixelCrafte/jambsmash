interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
  urgent: boolean;
}

export function generateEmailTemplate(data: ContactFormData): string {
  const urgentBadge = data.urgent 
    ? `<div style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 20px;">🚨 URGENT REQUEST</div>` 
    : '';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission - Jambstronics Technologies</title>
      <style>
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #F3F4F6;
          background-color: #1A3B44;
          margin: 0;
          padding: 20px;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background: linear-gradient(135deg, #1A3B44 0%, #2A4B54 100%);
          border-radius: 16px;
          border: 2px solid #DC713E;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(220, 113, 62, 0.25);
        }
        .header {
          background: linear-gradient(135deg, #DC713E 0%, #FFA726 100%);
          padding: 30px 40px;
          text-align: center;
          position: relative;
        }
        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>') repeat;
          opacity: 0.3;
        }
        .logo {
          font-size: 28px;
          font-weight: 900;
          color: white;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          position: relative;
          z-index: 1;
        }
        .subtitle {
          color: rgba(255,255,255,0.9);
          margin: 8px 0 0 0;
          font-size: 14px;
          font-weight: 500;
          position: relative;
          z-index: 1;
        }
        .content {
          padding: 40px;
        }
        .section-title {
          color: #DC713E;
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 20px 0;
          padding-bottom: 10px;
          border-bottom: 2px solid #DC713E;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .info-card {
          background: rgba(220, 113, 62, 0.1);
          border: 1px solid rgba(220, 113, 62, 0.3);
          border-radius: 12px;
          padding: 20px;
          transition: all 0.3s ease;
        }
        .info-label {
          color: #FFA726;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .info-value {
          color: #F3F4F6;
          font-size: 16px;
          font-weight: 500;
          word-break: break-word;
        }
        .message-section {
          background: rgba(26, 59, 68, 0.5);
          border: 1px solid rgba(220, 113, 62, 0.2);
          border-radius: 12px;
          padding: 25px;
          margin: 25px 0;
        }
        .message-content {
          color: #F3F4F6;
          font-size: 15px;
          line-height: 1.7;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .footer {
          background: #0F2027;
          padding: 30px 40px;
          text-align: center;
          border-top: 1px solid rgba(220, 113, 62, 0.2);
        }
        .action-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .btn {
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          display: inline-block;
        }
        .btn-primary {
          background: linear-gradient(135deg, #DC713E, #FFA726);
          color: white;
        }
        .btn-secondary {
          background: rgba(220, 113, 62, 0.1);
          color: #DC713E;
          border: 1px solid #DC713E;
        }
        .timestamp {
          color: #6B7280;
          font-size: 12px;
          margin-top: 15px;
        }
        .icon {
          width: 20px;
          height: 20px;
          display: inline-block;
        }
        @media (max-width: 600px) {
          .email-container {
            margin: 10px;
            border-radius: 12px;
          }
          .header, .content, .footer {
            padding: 20px;
          }
          .info-grid {
            grid-template-columns: 1fr;
          }
          .action-buttons {
            flex-direction: column;
            align-items: center;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1 class="logo">⚡ JAMBSTRONICS</h1>
          <p class="subtitle">Engineering Excellence • Technical Innovation</p>
        </div>
        
        <div class="content">
          ${urgentBadge}
          
          <h2 class="section-title">
            <span class="icon">📧</span>
            New Contact Form Submission
          </h2>
          
          <div class="info-grid">
            <div class="info-card">
              <div class="info-label">👤 Full Name</div>
              <div class="info-value">${data.name}</div>
            </div>
            
            <div class="info-card">
              <div class="info-label">📧 Email Address</div>
              <div class="info-value">${data.email}</div>
            </div>
            
            <div class="info-card">
              <div class="info-label">📞 Phone Number</div>
              <div class="info-value">${data.phone}</div>
            </div>
            
            <div class="info-card">
              <div class="info-label">🏢 Company/Organization</div>
              <div class="info-value">${data.company || 'Not provided'}</div>
            </div>
            
            <div class="info-card">
              <div class="info-label">🔧 Service Interest</div>
              <div class="info-value">${data.service}</div>
            </div>
            
            <div class="info-card">
              <div class="info-label">⚡ Priority Level</div>
              <div class="info-value">${data.urgent ? '🚨 URGENT' : '📋 Standard'}</div>
            </div>
          </div>
          
          <h3 class="section-title">
            <span class="icon">💬</span>
            Project Details & Message
          </h3>
          
          <div class="message-section">
            <div class="message-content">${data.message}</div>
          </div>
        </div>
        
        <div class="footer">
          <div class="action-buttons">
            <a href="mailto:${data.email}" class="btn btn-primary">Reply to Client</a>
            <a href="tel:${data.phone.replace(/\s/g, '')}" class="btn btn-secondary">Call Client</a>
          </div>
          
          <div class="timestamp">
            📅 Received: ${new Date().toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZoneName: 'short'
            })}
          </div>
          
          <p style="color: #6B7280; font-size: 12px; margin-top: 20px; line-height: 1.5;">
            This email was automatically generated from the Jambstronics Technologies contact form.<br>
            Please respond to the client within 24 hours for optimal customer service.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateAutoReplyTemplate(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You - Jambstronics Technologies</title>
      <style>
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #F3F4F6;
          background-color: #1A3B44;
          margin: 0;
          padding: 20px;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background: linear-gradient(135deg, #1A3B44 0%, #2A4B54 100%);
          border-radius: 16px;
          border: 2px solid #DC713E;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(220, 113, 62, 0.25);
        }
        .header {
          background: linear-gradient(135deg, #DC713E 0%, #FFA726 100%);
          padding: 40px;
          text-align: center;
        }
        .logo {
          font-size: 32px;
          font-weight: 900;
          color: white;
          margin: 0 0 10px 0;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .content {
          padding: 40px;
          text-align: center;
        }
        .thank-you {
          font-size: 28px;
          font-weight: 700;
          color: #DC713E;
          margin-bottom: 20px;
        }
        .message {
          font-size: 16px;
          color: #F3F4F6;
          margin-bottom: 30px;
          line-height: 1.7;
        }
        .info-box {
          background: rgba(220, 113, 62, 0.1);
          border: 1px solid rgba(220, 113, 62, 0.3);
          border-radius: 12px;
          padding: 25px;
          margin: 25px 0;
          text-align: left;
        }
        .info-title {
          color: #FFA726;
          font-weight: 600;
          margin-bottom: 15px;
        }
        .next-steps {
          color: #F3F4F6;
          font-size: 15px;
        }
        .contact-info {
          background: #0F2027;
          padding: 30px;
          border-top: 1px solid rgba(220, 113, 62, 0.2);
        }
        .contact-title {
          color: #DC713E;
          font-weight: 600;
          margin-bottom: 15px;
        }
        .contact-item {
          margin: 10px 0;
          color: #F3F4F6;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1 class="logo">⚡ JAMBSTRONICS</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 16px;">Engineering Excellence • Technical Innovation</p>
        </div>
        
        <div class="content">
          <h2 class="thank-you">🎉 Thank You, ${data.name}!</h2>
          
          <p class="message">
            We've successfully received your inquiry about <strong>${data.service}</strong> and our expert team is already reviewing your project details.
          </p>
          
          <div class="info-box">
            <h3 class="info-title">📋 What Happens Next?</h3>
            <div class="next-steps">
              ${data.urgent ? 
                `<p><strong>🚨 URGENT REQUEST NOTED:</strong> Our priority response team has been notified and will contact you within 2-4 hours.</p>` : 
                `<p><strong>⏰ Response Time:</strong> We'll get back to you within 24 hours with a detailed consultation.</p>`
              }
              <p><strong>📞 Initial Contact:</strong> Our engineering team will call you at ${data.phone} to discuss your requirements.</p>
              <p><strong>📧 Follow-up:</strong> You'll receive a detailed proposal and timeline via email.</p>
              <p><strong>🤝 Consultation:</strong> We'll schedule an in-depth technical consultation at your convenience.</p>
            </div>
          </div>
          
          <p class="message">
            In the meantime, feel free to browse our services or contact us directly if you have any urgent questions.
          </p>
        </div>
        
        <div class="contact-info">
          <h3 class="contact-title">📞 Need Immediate Assistance?</h3>
          <div class="contact-item"><strong>Emergency Hotline:</strong> +263 773 755 716</div>
          <div class="contact-item"><strong>Email:</strong> jambsmash20@gmail.com</div>
          <div class="contact-item"><strong>Address:</strong> 7 Tilbury Road, Willowvale, Harare</div>
          <div class="contact-item"><strong>Business Hours:</strong> Mon-Fri 8AM-5PM, Sat 8AM-1PM</div>
          
          <p style="color: #6B7280; font-size: 12px; margin-top: 20px; text-align: center;">
            Reference ID: JAMB-${Date.now()}<br>
            This confirmation was sent on ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}
