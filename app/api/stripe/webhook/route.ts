import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { sendBotMessage } from '@/bots/core/telegramService';
import { sendLeadPurchaseConfirmation } from '@/lib/emailService';

// Tell Next.js this is a pure dynamic endpoint for Stripe (No Caching)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: '2024-04-10' as any })
  : null;

export async function POST(request: Request) {
  if (!stripe || !stripeWebhookSecret) {
    return NextResponse.json({ error: 'Stripe keys are missing from .env.local' }, { status: 500 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase Admin Role Key missing from .env.local' }, { status: 500 });
  }

  const rawBody = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing Stripe signature in headers' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, stripeWebhookSecret);
  } catch (error) {
    console.error('⚠️ Webhook signature verification failed:', error);
    return NextResponse.json({ error: 'Invalid Stripe signature' }, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const metadata = session.metadata || {};
      const planName = metadata.planName || 'Lead Package';
      const leadCountStr = metadata.leadCount || '0';
      const leadCount = parseInt(leadCountStr, 10);
      const cityName = metadata.cityName || 'N/A';
      const nicheName = metadata.nicheName || 'N/A';
      const zipCode = metadata.zipCode || 'N/A';
      const sourceUrl = metadata.sourceUrl || 'Direct';
      
      const clientEmail = session.customer_details?.email || session.customer_email || metadata.clientEmail || null;
      const pricePaid = session.amount_total ? session.amount_total / 100 : 0;

      // 1. Upsert the financial purchase onto the Supabase 'purchases' database ledger
      // This will either update a 'pending' intent to 'paid', or insert a brand new row.
      const { error: dbError } = await supabaseAdmin
        .from('purchases')
        .upsert({
          stripe_session_id: session.id,
          client_email: clientEmail ? clientEmail.trim().toLowerCase() : null,
          zip_code: zipCode,
          plan_name: planName,
          lead_count: leadCount,
          niche_name: nicheName,
          city_name: cityName,
          price_paid: pricePaid,
          source_url: sourceUrl,
          status: 'paid'
        }, { onConflict: 'stripe_session_id' });

      if (dbError) {
        // Warning: Don't crash so the rest of the fulfillment pipeline works
        console.error('Supabase insert purchases error:', dbError);
      }

      // 2. Fire the onboarding confirmation email securely
      if (clientEmail) {
        await sendLeadPurchaseConfirmation({
          to: clientEmail,
          planName,
          nicheName,
          cityName,
          leadCount,
          pricePaid,
          zipCode
        });
      }

      // 3. Ping the CEO right to his phone securely!
      await sendBotMessage(
        "Financial Node",
        nicheName !== 'N/A' ? nicheName : 'Global Marketplace',
        "REPORT",
        `💰 *PAYMENT SECURED!* 💰\nA prospect just bought the ${planName} package! Time to fulfill.`,
        {
          "Buyer Email": clientEmail || "N/A",
          "Revenue": `$${pricePaid}`,
          "Target Area": cityName !== 'N/A' ? cityName : 'National',
          "Target Zip": zipCode,
          "Leads Volume": `${leadCount} Leads`,
          "Sales Source": sourceUrl
        }
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook payload processing crashed:', error);
    return NextResponse.json({ error: 'Internal server processing failed' }, { status: 500 });
  }
}
