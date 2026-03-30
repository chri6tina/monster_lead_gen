"use server";

import Stripe from 'stripe';
import { redirect } from 'next/navigation';

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

  // 4. Generate the Stripe Checkout Session on the fly!
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
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
      cityName,
      nicheName
    },
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/businesses`,
  });

  // 5. Instantly bounce the user's browser to the new generated Stripe URL
  if (session.url) {
    redirect(session.url);
  } else {
    throw new Error("Stripe did not return a session URL.");
  }
}
