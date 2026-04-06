import { google } from 'googleapis';

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
      
      this.jwtClient = new google.auth.JWT({
        email: process.env.GOOGLE_CLIENT_EMAIL,
        key: privateKey,
        scopes: ['https://www.googleapis.com/auth/indexing']
      });
      this.isConfigured = true;
    }
  }

  /**
   * Send an array of full absolute URLs to Google Indexing API
   * Type must be 'URL_UPDATED' or 'URL_DELETED'
   */
  /**
   * Pings Google Indexing API for each URL. Does not send Telegram — caller aggregates into the daily digest.
   */
  async indexUrls(urls: string[]): Promise<{ ok: boolean; indexed: number; error?: string }> {
    if (urls.length === 0) {
      return { ok: true, indexed: 0 };
    }

    if (!this.isConfigured) {
      return {
        ok: false,
        indexed: 0,
        error: `Google Indexing API not configured (${urls.length} URL(s) not submitted). Add GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY to .env.local.`,
      };
    }

    try {
      await this.jwtClient.authorize();
      const indexing = google.indexing({ version: 'v3', auth: this.jwtClient });

      let successCount = 0;

      for (const url of urls) {
        console.log(`[Google Indexer] Pinging Google for: ${url}`);

        await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED',
          },
        });

        successCount++;
      }

      return { ok: true, indexed: successCount };
    } catch (error: any) {
      console.error('[Indexer Bot Error]', error);
      return {
        ok: false,
        indexed: 0,
        error: error?.message || 'Unknown Google Indexing API error',
      };
    }
  }
}
