import { sendBotMessage } from '../core/telegramService';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

/**
 * Tier 3 Infrastructure: The Sitemap Indexer Bot 🌐
 * Triggered after a Blog or City Page is generated.
 * Automatically pings Google Search Console and Bing to crawl the newly updated server-side sitemap.
 */
export class IndexerBot {
  websiteDomain: string;
  botName: string;

  constructor() {
    this.websiteDomain = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.leadmonster.com';
    this.botName = 'Sitemap Indexer Bot';
  }

  /**
   * Pings major search engines to aggressively crawl the sitemap immediately 
   * after a new AI generation is inserted into the database.
   */
  async pingSearchEngines() {
    const sitemapUrl = `${this.websiteDomain}/sitemap.xml`;
    const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
    const bingPingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;

    try {
      // 1. Ping Google Search Console
      const googleRes = await fetch(googlePingUrl);
      const googleStatus = googleRes.ok ? "SUCCESS" : "FAILED";

      // 2. Ping Bing Webmaster Tools
      const bingRes = await fetch(bingPingUrl);
      const bingStatus = bingRes.ok ? "SUCCESS" : "FAILED";

      // Report silently to the Telegram Hub using our Silencer Protocol
      await sendBotMessage(
        this.botName, 
        'Global Infrastructure', 
        'REPORT', 
        `✅ New Pages Detected. Automatically pinged Search Engines to index the updated sitemap.\n\n🔗 *Sitemap:* [${sitemapUrl}](${sitemapUrl})`, 
        {
          "Google Crawler": googleStatus,
          "Bing Crawler": bingStatus
        }
      );

      return { google: googleStatus, bing: bingStatus };

    } catch (err: any) {
      await sendBotMessage(this.botName, 'Global Infrastructure', 'ALERT', `Indexer Bot failed to reach Search Engines: ${err.message}`);
      return null;
    }
  }
}

// Quick Demonstration Script
if (require.main === module) {
  const myIndexer = new IndexerBot();
  
  myIndexer.pingSearchEngines().then(() => {
    console.log(`🟢 ${myIndexer.botName} run complete. Check Telegram.`);
  });
}
