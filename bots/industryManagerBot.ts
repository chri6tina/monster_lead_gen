import OpenAI from 'openai';
import { sendBotMessage } from './core/telegramService';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const aiKey = process.env.OPENAI_API_KEY;
if (!aiKey) {
  console.warn("🔴 Missing OPENAI_API_KEY inside .env.local");
}

const openai = new OpenAI({ apiKey: aiKey || "MISSING" });

/**
 * Tier 2: The Industry Manager Bot 🏢
 * Directs the worker bots for a specific industry (e.g., Commercial Cleaning).
 * Synthesizes their work and reports up to the Overseer.
 */
export class IndustryManagerBot {
  industryName: string;
  botName: string;
  systemPrompt: string;

  constructor(industryName: string) {
    this.industryName = industryName;
    this.botName = `${industryName} Manager`;
    
    this.systemPrompt = `
      You are the LeadMonster Tier 2 Industry Manager for the ${this.industryName} sector.
      You command a squad of 4 specialized bots (SEO, Blog, City Pages, A/B Testing) that generate leads for ${this.industryName}.
      
      CRITICAL DIRECTIVES:
      1. When worker bots submit their data to you, you must evaluate its quality and summarize the most profitable insights.
      2. If you find a failing strategy, dictate immediate pivot instructions.
      3. Your outputs must be heavily formatted for Telegram consumption by the Executive Admin. 
         Use bullet points, emojis, and strict, aggressive professionalism focused purely on B2B revenue capture.
      4. Prepare a consolidated 'Sector Insight' report to be pushed up to the Tier 1 Overseer Bot.
    `;
  }

  /**
   * Offline synthesis for tooling / future Overseer sync — does not send Telegram.
   */
  async synthesizeWorkerData(workerData: Record<string, string>) {
    let summary = `Incoming Worker Data for ${this.industryName}:\n\n`;
    for (const [workerType, data] of Object.entries(workerData)) {
      summary += `[Bot: ${workerType} Bot]\nData: ${data}\n\n`;
    }

    summary +=
      "Evaluate these updates. Produce a heavily detailed Sector Summary report detailing our wins, our losses, and strict commands for what the worker bots must do next. It must be highly readable.";

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: this.systemPrompt },
        { role: "user", content: summary },
      ],
    });

    return response.choices[0].message.content || "Report generation failed.";
  }

  /**
   * Single Telegram update per cron run: REPORT when the run is clean, ALERT when anything failed.
   */
  async sendDailyRunReport(opts: {
    nicheSlug: string;
    throttleUsed: number;
    throttleLimit: number;
    stoppedForCap: boolean;
    published: { city: string; cityUrl: string; blogUrl?: string }[];
    errors: { where: string; detail: string }[];
    indexer: { ok: boolean; indexed?: number; error?: string };
  }) {
    const indexerFailed = !opts.indexer.ok;
    const hasProblems = opts.errors.length > 0 || indexerFailed;
    const status = hasProblems ? "ALERT" : "REPORT";

    let msg = "";
    if (!hasProblems) {
      msg = "✅ *Nightly content run completed successfully.*\n\n";
    } else if (opts.published.length === 0) {
      msg = "🛑 *Nightly content run failed or produced nothing.*\n\n";
    } else {
      msg = "⚠️ *Nightly content run finished with issues.*\n\n";
    }

    msg += `*Published (steps):* ${opts.throttleUsed}/${opts.throttleLimit}`;
    if (opts.stoppedForCap) msg += " _(stopped at daily cap)_";
    msg += "\n\n";

    if (opts.published.length > 0) {
      msg += "*URLs:*\n";
      for (const p of opts.published) {
        msg += `• *${p.city}*\n  ${p.cityUrl}\n`;
        if (p.blogUrl) msg += `  Blog: ${p.blogUrl}\n`;
      }
      msg += "\n";
    }

    if (opts.errors.length > 0) {
      msg += "*Problems:*\n";
      for (const e of opts.errors) {
        msg += `• *${e.where}:* ${e.detail}\n`;
      }
      msg += "\n";
    }

    if (indexerFailed) {
      msg += `*Indexer:* ❌ ${opts.indexer.error || "Failed"}\n`;
    } else {
      msg += `*Indexer:* ✅ ${opts.indexer.indexed ?? 0} URL(s) submitted to Google\n`;
    }

    await sendBotMessage(this.botName, this.industryName, status as "REPORT" | "ALERT", msg, {
      Niche: opts.nicheSlug,
    });
  }
}

// Quick Demonstration Script
if (require.main === module) {
  const cleaningManager = new IndustryManagerBot("Commercial Cleaning");
  
  // Simulated data coming UP from the Tier 3 Worker Bots
  const workerData = {
    'SEO Bot': 'Found a massive keyword gap for "post-construction office scrubbing [city]". Low difficulty, high volume.',
    'Blog Bot': 'Drafted 3 posts based on SEO data. Averaged 1,250 characters. Included "Request Custom Data" CTAs internally.',
    'City Pages Bot': 'Generated 50 new localized pages for Florida. 2 encountered Google indexation delays due to thin content.',
    'A/B Testing Bot': 'The Hero section variant "Stop Waiting For Contracts" is performing 18% better than "Verified Contact Info".'
  };

  cleaningManager.synthesizeWorkerData(workerData).then(() => {
    console.log(`🟢 ${cleaningManager.botName} run complete. Check Telegram.`);
  });
}
