import nodemailer from 'nodemailer';

export interface MessageData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  date: string;
  location?: any;
  deviceInfo?: any;
  securityInfo?: any;
}

export function createTransporter() {
  const host = process.env.SMTP_HOST || 'mail.privateemail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secureEnv = process.env.SMTP_SECURE;
  const secure = secureEnv !== undefined ? (secureEnv === 'true' || secureEnv === 'SSL' || secureEnv === 'ssl') : (port === 465);
  const user = process.env.SMTP_USER || 'help@doctorbabamukisa.com';
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.MAIL_PASS || process.env.PRIVATEEMAIL_PASS;

  if (!pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure, // true for 465 SSL, false for 587 STARTTLS
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
}

export async function checkEmailConfiguration() {
  const host = process.env.SMTP_HOST || 'mail.privateemail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER || 'help@doctorbabamukisa.com';
  const notificationEmail = process.env.NOTIFICATION_EMAIL || user;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.MAIL_PASS || process.env.PRIVATEEMAIL_PASS;

  const transporter = createTransporter();

  if (!transporter) {
    return {
      configured: false,
      host,
      port,
      user,
      notificationEmail,
      status: 'Pending Password (Add SMTP_PASS secret variable in App Settings)'
    };
  }

  try {
    await transporter.verify();
    return {
      configured: true,
      host,
      port,
      user,
      notificationEmail,
      status: 'Connected & Verified (mail.privateemail.com Ready)'
    };
  } catch (err) {
    return {
      configured: false,
      host,
      port,
      user,
      notificationEmail,
      status: `SMTP Connection error: ${(err as Error).message}`
    };
  }
}

export async function sendInquiryEmail(msgData: MessageData) {
  const transporter = createTransporter();
  const recipient = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER || 'help@doctorbabamukisa.com';
  const sender = process.env.SMTP_USER || 'help@doctorbabamukisa.com';

  const cleanPhone = (msgData.phone || '').replace(/[^0-9]/g, '');
  const whatsappUrl = cleanPhone ? `https://wa.me/${cleanPhone}` : 'https://wa.me/256767062834';

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #0b132b; color: #f8fafc; border: 1px solid #78350f; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #1e1b4b 0%, #451a03 100%); padding: 28px 24px; text-align: center; border-bottom: 2px solid #b45309;">
        <h1 style="color: #fef3c7; margin: 0; font-family: Georgia, serif; font-size: 22px; font-weight: bold; letter-spacing: 0.5px;">
          Doctor Baba Mukisa Traditional Temple
        </h1>
        <p style="color: #fbbf24; font-size: 13px; margin: 6px 0 0 0; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
          🔮 New Website Consultation Request
        </p>
      </div>

      <!-- Main Body -->
      <div style="padding: 24px;">
        
        <!-- Summary Box -->
        <div style="background-color: #1e293b; padding: 18px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #e2e8f0;">
            <tr>
              <td style="padding: 6px 0; color: #94a3b8; width: 140px;">Client Name:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #fef08a;">${msgData.name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #94a3b8;">Client Email:</td>
              <td style="padding: 6px 0;"><a href="mailto:${msgData.email}" style="color: #38bdf8; text-decoration: underline; font-weight: bold;">${msgData.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #94a3b8;">Phone / WhatsApp:</td>
              <td style="padding: 6px 0;"><a href="${whatsappUrl}" style="color: #4ade80; text-decoration: none; font-weight: bold;">${msgData.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #94a3b8;">Service Requested:</td>
              <td style="padding: 6px 0; color: #fbbf24; font-weight: bold;">${msgData.service}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #94a3b8;">Submission Date:</td>
              <td style="padding: 6px 0; color: #cbd5e1;">${msgData.date}</td>
            </tr>
          </table>
        </div>

        <!-- Message Details -->
        <div style="background-color: #020617; padding: 20px; border-radius: 12px; border: 1px solid #334155; margin-bottom: 20px;">
          <h3 style="color: #fcd34d; margin-top: 0; margin-bottom: 12px; font-size: 15px; font-family: Georgia, serif; border-bottom: 1px solid #1e293b; padding-bottom: 8px;">
            Spiritual Request & Inquiry Details:
          </h3>
          <p style="color: #f1f5f9; white-space: pre-line; line-height: 1.7; font-size: 14px; margin: 0;">
            ${msgData.message}
          </p>
        </div>

        ${msgData.location ? `
        <!-- Technical / Location Audit -->
        <div style="background-color: #0f172a; padding: 14px 18px; border-radius: 10px; border: 1px solid #1e293b; font-size: 12px; color: #94a3b8; margin-bottom: 20px;">
          <p style="margin: 3px 0;"><strong>Location:</strong> ${msgData.location.city || ''}, ${msgData.location.region || ''}, ${msgData.location.country || ''} (IP: ${msgData.location.ip || 'Unknown'})</p>
          <p style="margin: 3px 0;"><strong>ISP / Security:</strong> ${msgData.location.isp || 'Cellular/Residential'} | ${msgData.securityInfo?.isVpnOrProxy ? '⚠️ VPN/Proxy Detected' : '✅ Direct Residential ISP'}</p>
        </div>
        ` : ''}

        <!-- Quick Action Prompt -->
        <div style="text-align: center; background-color: #1e1b4b; padding: 16px; border-radius: 12px; border: 1px dashed #6366f1;">
          <p style="color: #e0e7ff; margin: 0 0 8px 0; font-size: 13px; font-weight: 500;">
            💡 <strong>Direct Reply Enabled:</strong> Simply hit <strong>"Reply"</strong> in your email inbox to send an immediate response directly to <strong>${msgData.email}</strong>.
          </p>
        </div>

      </div>

      <!-- Footer -->
      <div style="background-color: #020617; padding: 16px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #1e293b;">
        <p style="margin: 0;">Doctor Baba Mukisa Mail Server • Powered by mail.privateemail.com</p>
        <p style="margin: 4px 0 0 0;">IMAP: <code>mail.privateemail.com:993</code> (SSL) • SMTP: <code>mail.privateemail.com:465</code> (SSL)</p>
      </div>

    </div>
  `;

  if (!transporter) {
    console.log(`[Mailer] SMTP credentials not set. Message saved in Admin panel & simulated email dispatch for ${msgData.email}.`);
    return { success: true, delivered: false, note: 'Saved in system; configure SMTP_USER & SMTP_PASS in secrets for external email routing.' };
  }

  try {
    const info = await transporter.sendMail({
      from: `"Doctor Baba Mukisa Temple" <${sender}>`,
      to: recipient,
      replyTo: `"${msgData.name}" <${msgData.email}>`,
      subject: `New Inquiry (${msgData.service}) - ${msgData.name}`,
      text: `New Website Inquiry from ${msgData.name} (${msgData.email}, ${msgData.phone})\nService: ${msgData.service}\n\nMessage:\n${msgData.message}`,
      html: htmlContent,
    });
    console.log(`[Mailer] Inquiry email dispatched via PrivateEmail SMTP to ${recipient}:`, info.messageId);
    return { success: true, delivered: true, messageId: info.messageId };
  } catch (error) {
    console.error('[Mailer] Failed to send email via SMTP:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function sendReplyEmail(toEmail: string, clientName: string, subject: string, replyMessage: string) {
  const transporter = createTransporter();
  const sender = process.env.SMTP_USER || 'help@doctorbabamukisa.com';

  const htmlContent = `
    <div style="font-family: Georgia, serif; max-width: 650px; margin: 0 auto; background-color: #020617; color: #f8fafc; border: 1px solid #78350f; border-radius: 16px; overflow: hidden; padding: 28px;">
      
      <div style="border-bottom: 2px solid #b45309; padding-bottom: 16px; margin-bottom: 24px; text-align: center;">
        <h2 style="color: #fef3c7; margin: 0; font-size: 22px;">Doctor Baba Mukisa</h2>
        <p style="color: #d97706; font-size: 13px; margin-top: 4px; font-family: sans-serif; text-transform: uppercase; letter-spacing: 1px;">
          Spiritual Healer, Spell Caster & Traditional Astrologer
        </p>
      </div>

      <p style="color: #fef08a; font-size: 16px; margin-bottom: 16px;">Greetings ${clientName},</p>

      <div style="background-color: #0f172a; padding: 22px; border-radius: 12px; margin: 18px 0; border-left: 4px solid #10b981; font-family: sans-serif; border-right: 1px solid #1e293b; border-top: 1px solid #1e293b; border-bottom: 1px solid #1e293b;">
        <p style="color: #f1f5f9; white-space: pre-line; line-height: 1.7; font-size: 15px; margin: 0;">${replyMessage}</p>
      </div>

      <p style="font-family: sans-serif; color: #cbd5e1; font-size: 13px; line-height: 1.6; margin-top: 24px;">
        May peace, clarity, and spiritual breakthrough accompany your path. Should you require immediate voice consultation, you may also reach out via WhatsApp.
      </p>

      <div style="margin-top: 28px; padding-top: 18px; border-top: 1px solid #1e293b; font-family: sans-serif; font-size: 12px; color: #94a3b8; display: flex; justify-content: space-between;">
        <div>
          <p style="margin: 2px 0; font-weight: bold; color: #fbbf24;">Doctor Baba Mukisa Temple</p>
          <p style="margin: 2px 0;">Official Website & Consultation Center</p>
        </div>
        <div style="text-align: right;">
          <p style="margin: 2px 0;">WhatsApp: <strong>+256 767 062834</strong></p>
          <p style="margin: 2px 0;">Email: <strong>${sender}</strong></p>
        </div>
      </div>

    </div>
  `;

  if (!transporter) {
    console.log(`[Mailer Mock Reply] Simulated direct reply to ${toEmail}.`);
    return { success: true, delivered: false, note: 'Reply saved in Admin system. Configure SMTP credentials to deliver outbound email.' };
  }

  try {
    const info = await transporter.sendMail({
      from: `"Doctor Baba Mukisa" <${sender}>`,
      to: toEmail,
      subject: subject || 'Response to your spiritual inquiry - Doctor Baba Mukisa',
      text: replyMessage,
      html: htmlContent,
    });
    console.log(`[Mailer] Direct reply email delivered to ${toEmail}:`, info.messageId);
    return { success: true, delivered: true, messageId: info.messageId };
  } catch (error) {
    console.error('[Mailer] Failed to send reply email:', error);
    return { success: false, error: (error as Error).message };
  }
}
