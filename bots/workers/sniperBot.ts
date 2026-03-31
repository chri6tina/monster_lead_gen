import { sendBotMessage } from '../core/telegramService';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

/**
 * Tier 3: The Sniper Bot (Competitor Gap Analysis) 🎯
 * Hits Google, finds the 3 companies ranking #1, rips out their entire HTML structure,
 * and passes the synthesized data downstream to outrank them completely.
 */
export class SniperBot {
  industryName: string;
  botName: string;

  constructor(industryName: string) {
    this.industryName = industryName;
    this.botName = `${this.industryName} Sniper Bot`;
  }

  /**
   * Aggressively cleans raw HTML into readable text, stripping styling and JavaScript
   * so the AI downstream can process pure semantics without wasting reasoning tokens.
   */
  private cleanHtml(html: string): string {
    // 1. Strip junk blocks entirely
    let cleaned = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ');
    cleaned = cleaned.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ');
    cleaned = cleaned.replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, ' ');
    cleaned = cleaned.replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, ' ');
    
    // 2. Ensure block-level elements create newlines for readable paragraph scanning
    cleaned = cleaned.replace(/<\/(p|div|h1|h2|h3|h4|h5|h6|li)>/gi, '\n');
    
    // 3. Nuke remaining HTML syntax
    cleaned = cleaned.replace(/<[^>]+>/g, ' ');
    
    // 4. Collapse extreme whitespace
    cleaned = cleaned.replace(/\s{2,}/g, ' ');
    
    // Cap at 15,000 chars per competitor to prevent GPT context-window explosion
    return cleaned.trim().substring(0, 15000);
  }

  /**
   * Executes the full recon loop: Searches Google -> Scrapes Sites -> Returns Intelligence
   */
  async acquireCompetitorIntel(keyword: string): Promise<string | null> {
    const serperKey = process.env.SERPER_API_KEY;
    if (!serperKey) {
       console.log(`[${this.botName}] 🔴 Missing SERPER_API_KEY. Bypassing TF-IDF generation.`);
       return null;
    }

    try {
      // Step 1: Query Google via Serper.dev API
      const searchRes = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: {
          'X-API-KEY': serperKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ q: keyword, num: 3, gl: 'us' })
      });

      const searchJson = await searchRes.json();
      if (!searchJson.organic || searchJson.organic.length === 0) {
        return "No organic competitor data found for this keyword.";
      }

      // Step 2: Identify Targets
      const topCompetitors = searchJson.organic.slice(0, 3);
      let combinedIntel = "=== TOP COMPETITOR ANALYSIS ===\n";

      // Step 3: Extract & Strip Payload
      for (let i = 0; i < topCompetitors.length; i++) {
        const comp = topCompetitors[i];
        try {
          // Setting a firm 8-second timeout so the bot doesn't hang forever on slow competitor servers
          const pageRes = await fetch(comp.link, { 
            headers: { 
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' 
            },
            signal: AbortSignal.timeout(8000) 
          });
          
          if (!pageRes.ok) continue;

          const html = await pageRes.text();
          const cleanText = this.cleanHtml(html);
          
          combinedIntel += `\n[RANK ${i+1}] TITLE: ${comp.title}\n`;
          combinedIntel += `URL: ${comp.link}\n`;
          combinedIntel += `CONTENT TRACE: ...${cleanText}...\n`;
          
        } catch (pageErr) {
          console.warn(`[${this.botName}] Failed to breach target URL: ${comp.link}`);
        }
      }

      // Step 4: Report Recon Completion
      await sendBotMessage(
        this.botName, 
        this.industryName, 
        'ACTION', 
        `🎯 Recon Complete. Ripped HTML structure from ${topCompetitors.length} top Google competitors for "${keyword}". Passing intelligence payload to Blog Bot.`
      );

      return combinedIntel;

    } catch (err: any) {
      console.error(`[${this.botName}] Fatal Recon Error:`, err);
      return null;
    }
  }
}
