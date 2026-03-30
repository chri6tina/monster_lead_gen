import OpenAI from 'openai';
import { sendBotMessage } from '../core/telegramService';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const aiKey = process.env.OPENAI_API_KEY;
if (!aiKey) {
  console.error("🔴 Missing OPENAI_API_KEY inside .env.local");
  process.exit(1);
}

const openai = new OpenAI({ apiKey: aiKey });

/**
 * Tier 3: The A/B Testing Bot (The Optimizer) 📊
 * Its sole purpose is to "read, understand, and test" which types of blogs and content 
 * are actually converting best based on database metrics or analytics.
 */
export class ABTestingBot {
  industryName: string;
  botName: string;
  systemPrompt: string;

  constructor(industryName: string) {
    this.industryName = industryName;
    this.botName = `${this.industryName} Optimizer Bot`;
    
    this.systemPrompt = `
      You are the LeadMonster Tier 3 A/B Testing & Optimization Bot for the ${this.industryName} sector.
      Your responsibility is to constantly analyze raw traffic and conversion data to determine **what content works best**.
      
      CRITICAL DIRECTIVES:
      1. Analyze the performance logs (Traffic, Bounce Rate, Checkout Conversions) of our live ${this.industryName} pages.
      2. Identify the "Winning Variant" (e.g., Which blog style or City Page hero section gets the most leads?).
      3. Dictate a strict, data-driven "Optimization Rule" that the SEO Bot and Blog Bot must follow going forward to replicate the success.
      4. Format your report for the Tier 2 Industry Manager using aggressive B2B language.
    `;
  }

  /**
   * Evaluates dummy/live traffic metrics to determine what content works best.
   */
  async evaluateContentPerformance(analyticsData: string) {
    const userPrompt = `
      Here is the raw performance data for the past 7 days:
      ${analyticsData}

      Analyze this data. What type of content is working the absolute best? 
      Create a strict "Optimization Command" detailing what the SEO and Blog Bots must write differently going forward.
    `;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: this.systemPrompt },
          { role: "user", content: userPrompt }
        ]
      });

      const analysisReport = response.choices[0].message.content || "Analysis failed.";

      await sendBotMessage(
        this.botName, 
        this.industryName, 
        'REPORT', 
        `✅ Metric analysis complete. Forwarded optimization rules to the Manager Bot silently.`
      );

      return analysisReport;

    } catch (err: any) {
      // Alerts are "extremely important" so they still bypass the filter
      await sendBotMessage(this.botName, this.industryName, 'ALERT', `Failed to analyze performance: ${err.message}`);
    }
  }
}

// Quick Demonstration Script
if (require.main === module) {
  const cleaningOptimizer = new ABTestingBot("Commercial Cleaning");
  
  // Simulated analytics data that this bot would pull from Supabase or Google Analytics in the final version
  const recentTrafficData = `
    - Blog Post A (1,000 words, generic tone): 250 visits, 8% bounce rate, 1 custom data request.
    - Blog Post B (1,500 words, aggressive B2B tone, deep local references to Miami): 420 visits, 2% bounce rate, 6 custom data requests.
    - City Page A (Headline: "Get Cleanings in Jax"): 1.2% Conversion to Stripe Checkout.
    - City Page B (Headline: "Stop Waiting. Unlock Verified Contractor Contacts."): 4.8% Conversion to Stripe Checkout.
  `;

  cleaningOptimizer.evaluateContentPerformance(recentTrafficData).then(() => {
    console.log(`🟢 ${cleaningOptimizer.botName} run complete. Check Telegram.`);
  });
}
