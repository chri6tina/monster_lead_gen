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
 * Tier 0: The Growth Hacker Bot (The Expansionist) 📈
 * Its sole purpose is to act as the Corporate Futurist and SEO Analyst.
 * It does not write local pages. It analyzes Google algorithm shifts, B2B market gaps,
 * and outputs exact "Niche Slugs" the CEO should deploy the factory on next.
 */
export class ExpansionistBot {
  botName: string;
  systemPrompt: string;

  constructor() {
    this.botName = 'The Expansionist Bot';
    
    this.systemPrompt = `
      You are the Tier 0 Growth Hacker (The Expansionist) for LeadMonster, a massive B2B lead generation enterprise.
      Your responsibility is to analyze macro-economic B2B trends, predict Google SEO algorithm shifts, and find new industries.
      
      CRITICAL DIRECTIVES:
      1. Discover massive new B2B industries with low SEO competition that LeadMonster can dominate using AI generated local city pages.
      2. TARGET AUDIENCE RESTRICTION: You MUST ONLY suggest "Low-Cost Startup Hustles" and blue-collar businesses with a low barrier to entry (e.g., Pressure Washing, Junk Removal, Window Cleaning, Mobile Detailing, Vending Machines). Our customers are everyday people starting local service hustles who aren't technical, but desperately need to buy cold B2B lead lists to get their first contracts. DO NOT suggest highly technical or expensive industries.
      3. HIGH BAR FOR ENTRY: We do NOT have to expand. If an idea is not extremely profitable and low barrier, reject the expansion. We only want ideas that make absolute sense and are "really good".
      4. MONTHLY COMPARISON: Look at previous weeks' ideas. Compare relevancy. If an idea survives 4 consecutive weeks of scrutiny, officially recommend we implement it.
      5. Analyze recent Google SEO guidelines (e.g., E-E-A-T, Helpful Content updates) and dictate new rules the lower bots must adopt.
      6. Format your report natively for a Telegram message to the CEO. Use aggressive, strategic B2B language.
    `;
  }

  /**
   * Generates a macro-intelligence report for the CEO, comparing memory from previous weeks.
   */
  async generateGrowthReport(historicalIdeasMemory: string = "None logged yet.") {
    await sendBotMessage(
      this.botName,
      'Macro Strategy',
      'ACTION',
      "Scanning global B2B service trends, comparing previous week's ideas, and evaluating expansion worthiness."
    );

    const userPrompt = `
      Historical Expansion Ideas from past weeks:
      ${historicalIdeasMemory}

      Task for this month: Evaluate the historical ideas. Do they still hold up? Are they truly good? 
      If not, suggest up to 3 new "Niche Slugs" (e.g., "pressure-washing-leads"). 
      Remember: Do NOT expand if it doesn't make perfect sense. It must be highly lucrative for low-level hustlers.
    `;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: this.systemPrompt },
          { role: "user", content: userPrompt }
        ]
      });

      const report = response.choices[0].message.content || "Strategy generation failed.";

      await sendBotMessage(
        this.botName, 
        'Macro Strategy', 
        'REPORT', 
        report, 
        { "Objective": "Expansion", "Report Value": "High Priority" }
      );

      return report;

    } catch (err: any) {
      await sendBotMessage(this.botName, 'Macro Strategy', 'ALERT', `Failed to generate Expansion Report: ${err.message}`);
    }
  }
}

// Quick Demonstration Script
if (require.main === module) {
  const expansionist = new ExpansionistBot();
  
  const mockMemory = `
    Week 1: Suggested Pressure Washing Leads. (Seemed good).
    Week 2: Suggested Vending Machine Leads. (User already has this).
    Week 3: Suggested Mobile Pet Grooming. (Low ROI per lead).
  `;

  expansionist.generateGrowthReport(mockMemory).then(() => {
    console.log(`🟢 ${expansionist.botName} run complete. Check Telegram.`);
  });
}
