import { NextResponse, NextRequest } from "next/server";
import nodemailer from 'nodemailer';
import { generateEmailTemplate, generateAutoReplyTemplate } from '@/lib/emailTemplate';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
  urgent: boolean;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body: ContactFormData = await request.json();
    
    // Validate required fields
    const { name, email, phone, service, message } = body;
    
    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields. Please fill in all required information.' 
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email address format.' 
        },
        { status: 400 }
      );
    }

    // Validate phone number (basic validation)
    if (phone.length < 10) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Phone number must be at least 10 digits.' 
        },
        { status: 400 }
      );
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
    } catch (error) {
      console.error('SMTP configuration error:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email service temporarily unavailable. Please try again later or contact us directly.' 
        },
        { status: 500 }
      );
    }

    // Generate email content
    const ownerEmailContent = generateEmailTemplate(body);
    const clientAutoReply = generateAutoReplyTemplate(body);

    // Send email to website owner
    const ownerMailOptions = {
      from: `"Jambstronics Contact Form" <${process.env.SMTP_FROM}>`,
      to: process.env.OWNER_EMAIL,
      subject: `${body.urgent ? '🚨 URGENT - ' : ''}New Contact Form Submission from ${name}`,
      html: ownerEmailContent,
      // Add text version for better deliverability
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Company: ${body.company || 'Not provided'}
        Service: ${service}
        Priority: ${body.urgent ? 'URGENT' : 'Standard'}
        
        Message:
        ${message}
        
        Received: ${new Date().toLocaleString()}
      `,
    };

    // Send auto-reply to client
    const clientMailOptions = {
      from: `"Jambstronics Technologies" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: `Thank you for contacting Jambstronics Technologies, ${name}`,
      html: clientAutoReply,
      text: `
        Thank you for your inquiry, ${name}!
        
        We've received your message about ${service} and our team will get back to you ${body.urgent ? 'within 2-4 hours' : 'within 24 hours'}.
        
        Your inquiry details:
        - Service: ${service}
        - Priority: ${body.urgent ? 'URGENT' : 'Standard'}
        
        Contact us directly:
        Phone: +263 773 755 716
        Email: jambsmash20@gmail.com
        Address: 7 Tilbury Road, Willowvale, Harare
        
        Best regards,
        Jambstronics Technologies Team
      `,
    };

    // Send both emails
    const [ownerEmailResult, clientEmailResult] = await Promise.allSettled([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(clientMailOptions)
    ]);

    // Check if owner email was sent successfully
    if (ownerEmailResult.status === 'rejected') {
      console.error('Failed to send email to owner:', ownerEmailResult.reason);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send your message. Please try again or contact us directly.' 
        },
        { status: 500 }
      );
    }

    // Log if client auto-reply failed (but don't fail the whole request)
    if (clientEmailResult.status === 'rejected') {
      console.error('Failed to send auto-reply to client:', clientEmailResult.reason);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Your message has been sent successfully! We\'ll get back to you soon.',
      autoReplyStatus: clientEmailResult.status === 'fulfilled' ? 'sent' : 'failed'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'An unexpected error occurred. Please try again or contact us directly at jambsmash20@gmail.com.' 
      },
      { status: 500 }
    );
  }
}