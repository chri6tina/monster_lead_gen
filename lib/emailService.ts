import { Resend } from 'resend';

const resendKey = process.env.RESEND_API_KEY;
// Note: You must verify this domain in Resend before pushing to production!
const resendFrom = process.env.RESEND_FROM || 'support@monsterleadgen.com';
const resendObject = resendKey ? new Resend(resendKey) : null;

// Premium Dark-Mode HTML styling matching Lead Monster's frontend
const BASE_STYLES = `
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.6;
  color: #f4f4f5;
  background-color: #09090b;
  padding: 32px;
`.trim();

const CARD_STYLES = `
  max-width: 600px;
  margin: 0 auto;
  background-color: #18181b;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #27272a;
`.trim();

const BUTTON_STYLES = `
  display: inline-block;
  margin-top: 16px;
  background: linear-gradient(to right, #10b981, #14b8a6);
  color: #09090b;
  text-decoration: none;
  padding: 14px 24px;
  border-radius: 8px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 14px;
`.trim();

export interface PurchaseEmailParams {
  to: string;
  planName: string;
  nicheName: string;
  cityName: string;
  leadCount: number;
  pricePaid: number;
  zipCode: string;
}

export async function sendLeadPurchaseConfirmation({
  to, planName, nicheName, cityName, leadCount, pricePaid, zipCode
}: PurchaseEmailParams) {
  if (!resendObject) {
    console.warn("RESEND_API_KEY is not defined. Skipping confirmation email.");
    return false;
  }

  const subject = `Order Confirmed: ${leadCount} ${nicheName} Leads - Lead Monster`;

  const html = `
    <div style="${BASE_STYLES}">
      <div style="${CARD_STYLES}">
        <h2 style="margin: 0 0 16px; color: #10b981; font-weight: 900; letter-spacing: -0.02em; font-size: 24px;">Lead Monster Order Confirmed 🔥</h2>
        <p style="margin: 0 0 16px; font-size: 16px;">Thank you for your purchase! Your payment of <strong>$${pricePaid}</strong> has cleared successfully.</p>
        
        <div style="margin: 24px 0; padding: 20px; background-color: #09090b; border-radius: 12px; border-left: 4px solid #14b8a6;">
          <h3 style="margin: 0 0 12px; color: #f4f4f5; font-size: 16px; text-transform: uppercase; letter-spacing: 0.05em;">Your Lead Arsenal Details</h3>
          <ul style="margin: 0; padding-left: 20px; color: #a1a1aa; font-size: 14px; line-height: 1.8;">
            <li><strong>Industry:</strong> ${nicheName !== 'N/A' ? nicheName : 'General B2B Leads'}</li>
            <li><strong>Territory Target:</strong> ${cityName !== 'N/A' ? cityName : 'National Scope'}</li>
            <li><strong>Database Target:</strong> ${zipCode}</li>
            <li><strong>Volume:</strong> ${leadCount} Verified Actionable Leads</li>
            <li><strong>Plan:</strong> ${planName} Package</li>
          </ul>
        </div>

        <p style="margin: 0 0 16px; font-size: 15px; color: #d4d4d8;">
          Our system is currently compiling your exact order. Because all leads are manually verified for freshness, your targeted CRM-ready CSV database will be delivered directly to this email shortly.
        </p>

        <a href="https://monsterleadgen.com/" style="${BUTTON_STYLES}">Browse The Marketplace</a>
        
        <p style="margin: 32px 0 0; font-size: 12px; color: #52525b; border-top: 1px solid #27272a; padding-top: 16px;">
          Questions about your delivery timeframe? Reply directly to this email and our support desk will grab it immediately. Stay aggressive.<br/><br/>
          — The Lead Monster Team
        </p>
      </div>
    </div>
  `;

  try {
    const result = await resendObject.emails.send({
      from: `Lead Monster <${resendFrom}>`,
      to,
      subject,
      html
    });
    
    if (result.error) {
      console.error("[Email Error] Failed to send receipt:", result.error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[Email Exception] Resend crashed:", err);
    return false;
  }
}
