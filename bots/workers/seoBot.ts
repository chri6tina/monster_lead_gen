import OpenAI from 'openai';
import { sendBotMessage } from '../core/telegramService';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const aiKey = process.env.OPENAI_API_KEY;
if (!aiKey) {
  console.warn("🔴 Missing OPENAI_API_KEY inside .env.local");
}

const openai = new OpenAI({ apiKey: aiKey || "MISSING" });

/**
 * Tier 3: The SEO Bot (Researcher) 🔍
 * Analyzes market gaps, local volumes, and builds content briefs.
 * Reports to the Industry Manager and hands off directly to the Blog Bot.
 */
export class SEOBot {
  industryName: string;
  botName: string;
  systemPrompt: string;

  constructor(industryName: string) {
    this.industryName = industryName;
    this.botName = `${this.industryName} SEO Bot`;
    
    this.systemPrompt = `
      You are the LeadMonster Tier 3 SEO Research Bot for the ${this.industryName} sector.
      Your job is to identify hyper-profitable, low-difficulty B2B keywords that corporate clients and small businesses 
      are searching for when they need ${this.industryName} contracts or lead lists.
      
      CRITICAL DIRECTIVES:
      1. Analyze the given seed topic and generate exactly 3 High-Intent Long-Tail Keywords.
      2. For each keyword, dictate the exact H2 tags the Blog Bot must use.
      3. Your outputs must be heavily formatted for Telegram consumption. Use bolding, lists, and strict instructions.
      4. Remember: You are building SEO that captures long-term commercial contracts for our buyers.
    `;
  }

  /**
   * Researches a niche topic and pushes the strategy directly to Telegram for Blog Bot consumption.
   */
  async buildContentBrief(seedTopic: string, targetCity: string) {
    const userPrompt = `
      Focus Area: ${seedTopic}
      Target Location: ${targetCity}
      
      Extract 3 high-intent, low-difficulty B2B keywords. Draft a strict content brief that the Blog Bot can immediately use to write a 1,000+ character post. 
      Format this as a direct command from you (The SEO Researcher) to the Blog Writer.
    `;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: this.systemPrompt },
          { role: "user", content: userPrompt }
        ]
      });

      const brief = response.choices[0].message.content || "Brief generation failed.";

      await sendBotMessage(
        this.botName, 
        this.industryName, 
        'REPORT', 
        `✅ SEO Brief Generated for **${seedTopic}** in ${targetCity}.\n_Passed to Blog Bot silently._`
      );

      return brief;

    } catch (err: any) {
      await sendBotMessage(this.botName, this.industryName, 'ALERT', `Failed to generate SEO Brief: ${err.message}`);
    }
  }
}

// Quick Demonstration Script
if (require.main === module) {
  const cleaningSeo = new SEOBot("Commercial Cleaning");
  
  cleaningSeo.buildContentBrief("Post-Construction Cleanup", "Jacksonville, FL").then(() => {
    console.log(`🟢 ${cleaningSeo.botName} run complete. Check Telegram.`);
  });
}
