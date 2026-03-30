import OpenAI from 'openai';
import { sendBotMessage } from './core/telegramService';
import dotenv from 'dotenv';
import path from 'path';

// Load Local envs
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const aiKey = process.env.OPENAI_API_KEY;

if (!aiKey) {
  console.error("🔴 Missing OPENAI_API_KEY inside .env.local");
  process.exit(1);
}

const openai = new OpenAI({ apiKey: aiKey });

/**
 * Tier 1: The Overseer Bot 🧠
 * The Central Intelligence Hub that watches over all LeadMonster industries.
 */
export class OverseerBot {
  name: string = "Global Node Overseer";
  systemPrompt: string;
  
  constructor() {
    this.systemPrompt = `
      You are the LeadMonster Tier 1 Overseer Bot. 
      Your purpose is to read data, learnings, and performance logs from all Tier 2 Industry Manager Bots 
      (Commercial Cleaning, Landscaping, HVAC, Plumbing, Logistics).

      CRITICAL DIRECTIVES:
      1. Cross-Industry Pollination: If the 'Commercial Cleaning' bot finds a high-converting keyword pattern, you must 
         synthesize that pattern and instruct 'Landscaping' to adopt it.
      2. High-Density Telegram Reporting: When you output information, it must be aggressively formatted, deeply detailed, 
         and entirely focused on B2B revenue and market dominance. 
      3. Use clear bullet points, emojis, and exact data references.
      
      You are speaking to your human Executive Admin directly. Never give vague advice. Only give actionable, 
      data-driven, cross-industry strategies.
    `;
  }

  /**
   * Evaluates learnings imported from Industry Managers and synthesizes new global strategies.
   */
  async processSectorLearnings(industryReports: Record<string, string>) {
    await sendBotMessage(
      this.name,
      'Global Network',
      'LEARNING',
      "Connecting to the Global Vector log... I am analyzing recent reports from all Tier 2 Industry Managers. Please stand by."
    );

    // Build the user prompt telling the Overseer what just happened in the network
    let logSummary = "Here is the most recent data submitted by the Tier 2 Industry Manager Bots:\n\n";
    for (const [industry, report] of Object.entries(industryReports)) {
      logSummary += `[Sector: ${industry}]\nData: ${report}\n\n`;
    }

    logSummary += "Analyze this. Identify the most successful strategy and dictate exactly how ALL other industries must implement it immediately. Provide a highly detailed, deeply readable blueprint.";

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: this.systemPrompt },
          { role: "user", content: logSummary }
        ]
      });

      const globalStrategy = response.choices[0].message.content || "Strategy evaluation failed.";

      // Push the heavy analysis back to Telegram Admin
      await sendBotMessage(
        this.name, 
        'Global Network', 
        'REPORT', 
        globalStrategy, 
        {
          "Industries Scanned": Object.keys(industryReports).length,
          "Model": "gpt-4o",
          "Cross-Pollination Sync": "Successful"
        }
      );

    } catch (err: any) {
      await sendBotMessage(this.name, 'Global Network', 'ALERT', `Failed to generate global strategy: ${err.message}`);
    }
  }
}

// ==========================================
// Quick Demo Script / Test Runner
// Execute via: npx tsx bots/overseerBot.ts
// ==========================================
if (require.main === module) {
  // Let's simulate a situation where our Tier 2 managers report their findings down to the Overseer.
  const myOverseer = new OverseerBot();
  const simulatedIndustryLogs = {
    'Commercial Cleaning': 'A/B Test Bot reported a 45% increase in conversions when replacing the word "Quote" with "Instant Commercial Pricing" on City Pages. The SEO Bot found that long-tail keywords containing "Office building" outrank generic cleaning terms.',
    'HVAC': 'We are currently suffering a 12% drop in City Page views. The Blog Bot states we are not publishing content longer than 600 words.'
  };

  myOverseer.processSectorLearnings(simulatedIndustryLogs).then(() => {
    console.log("🟢 Overseer run complete. Check your Telegram.");
  });
}
