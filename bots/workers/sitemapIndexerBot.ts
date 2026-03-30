import { google } from 'googleapis';
import { sendBotMessage } from '../core/telegramService';

/**
 * Sitemap Indexer Bot (The Publisher)
 * Forces Google Search Console to index newly published AI pages immediately.
 */
export class SitemapIndexerBot {
  private jwtClient: any;
  private isConfigured: boolean = false;

  constructor(private industry: string) {
    // Initialize Google API Authentication
    if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
      // Need to replace escaped newlines inside the private key so the crypto module can read it
      const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
      
      this.jwtClient = new google.auth.JWT(
        process.env.GOOGLE_CLIENT_EMAIL,
        undefined,
        privateKey,
        ['https://www.googleapis.com/auth/indexing'],
        undefined
      );
      this.isConfigured = true;
    }
  }

  /**
   * Send an array of full absolute URLs to Google Indexing API
   * Type must be 'URL_UPDATED' or 'URL_DELETED'
   */
  async indexUrls(urls: string[]) {
    if (urls.length === 0) return;

    if (!this.isConfigured) {
      await sendBotMessage("Indexer Bot", this.industry, "WARNING", `Failed to index ${urls.length} pages. Google Search Console API keys are missing in .env.local!`);
      return;
    }

    try {
      // Authenticate with Google First
      await this.jwtClient.authorize();
      const indexing = google.indexing({ version: 'v3', auth: this.jwtClient });

      let successCount = 0;

      // Loop through and ping Google for every single new page
      for (const url of urls) {
        console.log(`[Google Indexer] Pinging Google for: ${url}`);
        
        await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED' // Tells Google 'We just built this, index it now!'
          }
        });
        
        successCount++;
      }

      await sendBotMessage(
        "Indexer Bot",
        this.industry,
        "REPORT",
        `✅ Successfully pushed ${successCount} new pages directly to Google Search Console Indexing API.`
      );

    } catch (error: any) {
      console.error('[Indexer Bot Error]', error);
      await sendBotMessage(
        "Indexer Bot",
        this.industry,
        "ALERT",
        `🛑 Google Indexing API Failed: ${error.message || 'Unknown Error'}`
      );
    }
  }
}
