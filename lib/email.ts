import nodemailer from "nodemailer";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image?: string;
}

interface OrderEmailData {
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  orderNotes?: string;
}

// Create a transporter using environment variables
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export async function sendOrderConfirmationEmail(orderData: OrderEmailData) {
  const transporter = createTransporter();

  // Generate items HTML
  const itemsHtml = orderData.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 15px; border-bottom: 1px solid #eee;">
          <div style="display: flex; align-items: center;">
            <div>
              <p style="margin: 0; font-weight: 600; color: #333;">${
                item.name
              }</p>
              <p style="margin: 4px 0 0 0; color: #666; font-size: 14px;">Size: ${
                item.size
              } | Qty: ${item.quantity}</p>
            </div>
          </div>
        </td>
        <td style="padding: 15px; border-bottom: 1px solid #eee; text-align: right; font-weight: 600;">
          Rs.${(item.price * item.quantity).toFixed(2)}
        </td>
      </tr>
    `
    )
    .join("");

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation - Little Stars Kids Store</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Nunito', 'Segoe UI', Arial, sans-serif; background-color: #f8f9fa;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 28px;">⭐ Little Stars Kids Store</h1>
      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Order Confirmation</p>
    </div>
    
    <!-- Success Message -->
    <div style="background: white; padding: 30px; text-align: center; border-bottom: 1px solid #eee;">
      <div style="width: 80px; height: 80px; background: #10b981; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
        <span style="color: white; font-size: 40px;">✓</span>
      </div>
      <h2 style="color: #333; margin: 0 0 10px 0;">Thank You for Your Order!</h2>
      <p style="color: #666; margin: 0;">Hi ${
        orderData.customerName
      }, your order has been received and is being processed.</p>
    </div>
    
    <!-- Order Details -->
    <div style="background: white; padding: 25px;">
      <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; margin-bottom: 25px;">
        <table style="width: 100%;">
          <tr>
            <td style="color: #666;">Order Number:</td>
            <td style="text-align: right; font-weight: 700; color: #ec4899;">${
              orderData.orderNumber
            }</td>
          </tr>
          <tr>
            <td style="color: #666; padding-top: 8px;">Date:</td>
            <td style="text-align: right; font-weight: 600;">${new Date().toLocaleDateString(
              "en-PK",
              { dateStyle: "long" }
            )}</td>
          </tr>
          <tr>
            <td style="color: #666; padding-top: 8px;">Payment Method:</td>
            <td style="text-align: right; font-weight: 600;">Cash on Delivery (COD)</td>
          </tr>
        </table>
      </div>
      
      <!-- Items -->
      <h3 style="color: #333; margin: 0 0 15px 0; border-bottom: 2px solid #ec4899; padding-bottom: 10px;">Order Items</h3>
      <table style="width: 100%; border-collapse: collapse;">
        ${itemsHtml}
      </table>
      
      <!-- Totals -->
      <div style="margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 12px;">
        <table style="width: 100%;">
          <tr>
            <td style="color: #666; padding: 5px 0;">Subtotal:</td>
            <td style="text-align: right; font-weight: 600;">Rs.${orderData.subtotal.toFixed(
              2
            )}</td>
          </tr>
          <tr>
            <td style="color: #666; padding: 5px 0;">Shipping:</td>
            <td style="text-align: right; font-weight: 600;">Rs.${orderData.shipping.toFixed(
              2
            )}</td>
          </tr>
          <tr>
            <td colspan="2" style="border-top: 1px solid #ddd; padding-top: 10px;"></td>
          </tr>
          <tr>
            <td style="color: #333; font-weight: 700; font-size: 18px;">Total:</td>
            <td style="text-align: right; font-weight: 700; font-size: 18px; color: #dc2626;">Rs.${orderData.total.toFixed(
              2
            )}</td>
          </tr>
        </table>
      </div>
    </div>
    
    <!-- Shipping Address -->
    <div style="background: white; padding: 25px; border-top: 1px solid #eee;">
      <h3 style="color: #333; margin: 0 0 15px 0; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">📍 Shipping Address</h3>
      <p style="color: #333; margin: 0; font-weight: 600;">${
        orderData.customerName
      }</p>
      <p style="color: #666; margin: 8px 0 0 0;">${orderData.address}</p>
      <p style="color: #666; margin: 4px 0 0 0;">${orderData.city}, ${
    orderData.state
  } ${orderData.zipCode}</p>
      <p style="color: #666; margin: 4px 0 0 0;">📱 ${orderData.phone}</p>
    </div>
    
    <!-- Delivery Info -->
    <div style="background: #fef3c7; padding: 20px; margin-top: 1px;">
      <h4 style="color: #92400e; margin: 0 0 10px 0;">🚚 Estimated Delivery</h4>
      <p style="color: #78350f; margin: 0;">Your order will be delivered within <strong>3-5 business days</strong>.</p>
      <p style="color: #78350f; margin: 10px 0 0 0; font-size: 14px;">You will receive an update once your order is dispatched.</p>
    </div>
    
    ${
      orderData.orderNotes
        ? `
    <div style="background: white; padding: 20px; border-top: 1px solid #eee;">
      <h4 style="color: #333; margin: 0 0 10px 0;">📝 Order Notes</h4>
      <p style="color: #666; margin: 0;">${orderData.orderNotes}</p>
    </div>
    `
        : ""
    }
    
    <!-- Footer -->
    <div style="background: #1f2937; padding: 25px; border-radius: 0 0 16px 16px; text-align: center;">
      <p style="color: #9ca3af; margin: 0 0 15px 0; font-size: 14px;">
        If you have any questions about your order, please contact us:
      </p>
      <p style="margin: 0 0 5px 0;">
        <a href="mailto:hello@littlestars.com" style="color: #ec4899; text-decoration: none;">📧 hello@littlestars.com</a>
      </p>
      <p style="margin: 0 0 15px 0;">
        <span style="color: #ec4899;">📞 +92 300 1234567</span>
      </p>
      <p style="color: #6b7280; margin: 15px 0 0 0; font-size: 12px;">
        © ${new Date().getFullYear()} Little Stars Kids Store. Made with ❤️ for kids!
      </p>
    </div>
    
  </div>
</body>
</html>
  `;

  try {
    await transporter.sendMail({
      from: `"Little Stars Kids Store" <${
        process.env.SMTP_USER || "noreply@littlestars.com"
      }>`,
      to: orderData.email,
      subject: `Order Confirmation - ${orderData.orderNumber} | Little Stars Kids Store`,
      html: emailHtml,
    });
    return { success: true };
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
    return { success: false, error };
  }
}
