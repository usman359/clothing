import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, question, productName, productSlug } = body;

    // Validate required fields
    if (!name || !email || !question) {
      return NextResponse.json(
        { error: "Name, email, and question are required" },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const productUrl = `${
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    }/collections/products/${productSlug}`;

    // Email to store owner
    const storeEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Product Question</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Nunito', Arial, sans-serif; background-color: #f8f9fa;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); padding: 25px; border-radius: 12px 12px 0 0; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">⭐ New Product Question</h1>
    </div>
    
    <!-- Content -->
    <div style="background: white; padding: 25px; border-radius: 0 0 12px 12px;">
      <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <p style="margin: 0; color: #92400e; font-weight: 600;">📦 Product: ${productName}</p>
        <a href="${productUrl}" style="color: #ec4899; font-size: 14px;">View Product →</a>
      </div>
      
      <h3 style="color: #333; margin: 0 0 15px 0; border-bottom: 2px solid #ec4899; padding-bottom: 10px;">Customer Details</h3>
      <table style="width: 100%; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; color: #666;">Name:</td>
          <td style="padding: 8px 0; font-weight: 600;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">Email:</td>
          <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #ec4899;">${email}</a></td>
        </tr>
      </table>
      
      <h3 style="color: #333; margin: 0 0 15px 0; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">Question</h3>
      <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #ec4899;">
        <p style="margin: 0; color: #333; line-height: 1.6;">${question}</p>
      </div>
      
      <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
        <a href="mailto:${email}?subject=Re: Your question about ${productName}" 
           style="display: inline-block; background: #ec4899; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
          Reply to Customer
        </a>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
      <p>TinnyTrends - Customer Inquiry System</p>
    </div>
    
  </div>
</body>
</html>
    `;

    // Send email to store
    await transporter.sendMail({
      from: `"TinnyTrends" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Send to store email
      replyTo: email,
      subject: `New Question about ${productName}`,
      html: storeEmailHtml,
    });

    // Auto-reply to customer
    const customerEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>We Received Your Question</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Nunito', Arial, sans-serif; background-color: #f8f9fa;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 28px;">⭐ TinnyTrends</h1>
    </div>
    
    <!-- Content -->
    <div style="background: white; padding: 30px; border-radius: 0 0 16px 16px;">
      <h2 style="color: #333; margin: 0 0 15px 0;">Thank You for Your Question!</h2>
      <p style="color: #666; line-height: 1.6;">
        Hi ${name},<br><br>
        We've received your question about <strong>${productName}</strong> and our team will get back to you within 24 hours.
      </p>
      
      <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">Your question:</p>
        <p style="margin: 0; color: #333; font-style: italic;">"${question}"</p>
      </div>
      
      <p style="color: #666; line-height: 1.6;">
        In the meantime, feel free to reach us via WhatsApp for faster response:
        <br>📱 +92 300 1234567
      </p>
      
      <div style="text-align: center; margin-top: 25px;">
        <a href="${productUrl}" 
           style="display: inline-block; background: #ec4899; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
          View Product
        </a>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
      <p>© ${new Date().getFullYear()} TinnyTrends. Made with ❤️ for kids!</p>
    </div>
    
  </div>
</body>
</html>
    `;

    await transporter.sendMail({
      from: `"TinnyTrends" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `We Received Your Question - TinnyTrends`,
      html: customerEmailHtml,
    });

    return NextResponse.json(
      { message: "Question sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending question email:", error);
    return NextResponse.json(
      { error: "Failed to send question. Please try again." },
      { status: 500 }
    );
  }
}
