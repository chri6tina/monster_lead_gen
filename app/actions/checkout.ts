"use server";

import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import { sendBotMessage } from '@/bots/core/telegramService';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function createCheckoutSession(formData: FormData) {
  // 1. Initialize Stripe Native Service
  const stripeSecret = process.env.STRIPE_SECRET_KEY as string;
  if (!stripeSecret) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }

  // We enforce the TS type to any here or specify a supported version for safety
  const stripe = new Stripe(stripeSecret, {
    apiVersion: "2024-04-10" as any, 
  });

  // 2. Snag all the dynamic variables attached to the exact button clicked
  const planName = formData.get('planName') as string;
  const priceAmountStr = formData.get('priceAmount') as string;
  const leadCount = formData.get('leadCount') as string;
  const cityName = formData.get('cityName') as string;
  const nicheName = formData.get('nicheName') as string;
  const clientEmail = formData.get('clientEmail') as string | null;
  const zipCode = formData.get('zipCode') as string | null;
  const sourceUrl = formData.get('sourceUrl') as string | null;

  // Convert string dollar amount (e.g. "49") to integer pennies (4900)
  const unitAmount = parseInt(priceAmountStr) * 100;

  // 3. Assemble Custom "One-Off" Product Identity intelligently based on City SEO
  let productName = `${leadCount} Verified Leads`;
  if (cityName && nicheName) {
    productName = `${leadCount} ${cityName} ${nicheName} Leads - ${planName}`;
  } else if (cityName) {
    productName = `${leadCount} ${cityName} Leads - ${planName}`;
  } else if (nicheName) {
    productName = `${leadCount} ${nicheName} Leads - ${planName}`;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  // 4. Send Live Lead Capture Notification to Telegram!
  try {
    await sendBotMessage(
      "Checkout Node",
      nicheName || "Global",
      "ACTION",
      `🤑 *NEW CHECKOUT INITIATED*\nA prospect just filled out the modal and is being sent to Stripe!`,
      {
        "Email": clientEmail || "N/A",
        "Zip Code": zipCode || "N/A",
        "Plan Selected": `${planName} (${leadCount} Leads)`,
        "Target Territory": cityName || "N/A",
        "Source URL": sourceUrl || "Direct"
      }
    );
  } catch (e) {
    console.error("Failed to send telegram checkout alert", e);
  }

  // 5. Generate the Stripe Checkout Session on the fly!
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    ...(clientEmail ? { customer_email: clientEmail } : {}),
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: productName,
            description: "Direct delivery of phone numbers, verified emails, and B2B contact data. 100% Downloadable CSV.",
          },
          unit_amount: unitAmount,
        },
        quantity: 1,
      },
    ],
    metadata: {
      planName,
      leadCount,
      cityName: cityName || 'N/A',
      nicheName: nicheName || 'N/A',
      zipCode: zipCode || 'N/A',
      sourceUrl: sourceUrl || 'N/A'
    },
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/businesses`,
  });

  // 6. Log the 'pending' Intent into Supabase BEFORE redirecting (Abandoned Cart Tracking)
  if (session.id && supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin.from('purchases').insert([{
        stripe_session_id: session.id,
        client_email: clientEmail ? clientEmail.trim().toLowerCase() : null,
        zip_code: zipCode || 'N/A',
        plan_name: planName || 'Unknown Plan',
        lead_count: parseInt(leadCount, 10) || 0,
        niche_name: nicheName || 'N/A',
        city_name: cityName || 'N/A',
        price_paid: unitAmount / 100,
        source_url: sourceUrl || 'Direct',
        status: 'pending'
      }]);
      
      if (error) {
        console.error("Failed to insert pending intent into Supabase:", error);
      }
    } catch (dbErr) {
      console.error("Database intent tracking safely ignored on crash:", dbErr);
    }
  }

  // 7. Instantly bounce the user's browser to the new generated Stripe URL
  if (session.url) {
    redirect(session.url);
  } else {
    throw new Error("Stripe did not return a session URL.");
  }
}
