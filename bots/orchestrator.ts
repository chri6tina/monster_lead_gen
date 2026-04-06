import { sendBotMessage } from './core/telegramService';
import { IndustryManagerBot } from './industryManagerBot';
import { SEOBot } from './workers/seoBot';
import { BlogBot } from './workers/blogBot';
import { CityPagesBot } from './workers/cityPagesBot';
import { SitemapIndexerBot } from './workers/sitemapIndexerBot';
import { SniperBot } from './workers/sniperBot';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

/**
 * -------------------------------------------------------------
 * 🛡️ ANTI-SPAM SCALING ALGORITHM (THE SAFE ZONE)
 * -------------------------------------------------------------
 * Google penalizes new domains that vomit 5,000 pages on day one.
 * This function artificially chokes the bot speed. It calculates
 * your exact 'Daily Publishing Limit' based on how old the domain is.
 *
 * Week 1: 2 Pages/Day
 * Week 2: 4 Pages/Day
 * Week 4: 10 Pages/Day
 * Week 8+: Capped safely at 20 Pages/Day (Approx 600 pages a month)
 */
function getDailySafeLimit(daysActive: number): number {
  if (daysActive <= 7) return 2;
  if (daysActive <= 14) return 4;
  if (daysActive <= 21) return 6;
  if (daysActive <= 28) return 10;
  if (daysActive <= 60) return 15;

  // Safe Maximum Speed for infinite auto-pilot
  return 20;
}

/**
 * Tier 1 Operations: The Master Run Loop
 * This Orchestrator script is designed to be triggered daily by a Cron job.
 * Telegram: one summary per run from the Industry Manager (success REPORT, or ALERT if anything failed).
 */
export async function runDailyContentFactory(industry: string, nicheSlug: string, targetCities: string[]) {
  const manager = new IndustryManagerBot(industry);
  const seo = new SEOBot(industry);
  const blogger = new BlogBot(industry);
  const localizer = new CityPagesBot(industry, nicheSlug);
  const indexer = new SitemapIndexerBot(industry);
  const sniper = new SniperBot(industry);

  // Example: Assume the system has been running for 10 days
  // In a real database, you query "SELECT COUNT(*) FROM bot_runs"
  const systemDaysActive = 10;
  const SAFE_DAILY_LIMIT = getDailySafeLimit(systemDaysActive);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.monsterleadgen.com';
  const published: { city: string; cityUrl: string; blogUrl?: string }[] = [];
  const errors: { where: string; detail: string }[] = [];
  const newlyPublishedUrls: string[] = [];
  let pagesGeneratedToday = 0;
  let stoppedForCap = false;

  try {
    for (const city of targetCities) {
      if (pagesGeneratedToday >= SAFE_DAILY_LIMIT) {
        stoppedForCap = true;
        break;
      }

      let brief: string;
      try {
        brief = await seo.buildContentBrief(`${industry} Lead Generation`, city);
      } catch (e: any) {
        errors.push({ where: `SEO (${city})`, detail: e?.message || String(e) });
        continue;
      }

      let enhancedBrief: string = brief;
      try {
        const sniperIntel = await sniper.acquireCompetitorIntel(`${industry} in ${city}`);
        if (sniperIntel) {
          enhancedBrief = `${brief}\n\n${sniperIntel}`;
        }
      } catch (e: any) {
        errors.push({ where: `Sniper (${city})`, detail: e?.message || String(e) });
      }

      const citySlug = city.toLowerCase().replace(/, /g, '-').replace(/ /g, '-');
      const cityUrl = `${baseUrl}/${nicheSlug}/${citySlug}`;

      let cityOk: boolean | null;
      try {
        cityOk = await localizer.generateAndPublishCity(city, citySlug, pagesGeneratedToday, SAFE_DAILY_LIMIT);
      } catch (e: any) {
        errors.push({ where: `City page (${city})`, detail: e?.message || String(e) });
        continue;
      }

      if (cityOk === null) {
        stoppedForCap = true;
        break;
      }

      newlyPublishedUrls.push(cityUrl);

      let blogSlug: string | null = null;
      try {
        blogSlug = await blogger.generateAndPublishPost(enhancedBrief, city, pagesGeneratedToday, SAFE_DAILY_LIMIT);
      } catch (e: any) {
        errors.push({ where: `Blog (${city})`, detail: e?.message || String(e) });
      }

      if (blogSlug) {
        newlyPublishedUrls.push(`${baseUrl}/blog/${blogSlug}`);
      }

      published.push({
        city,
        cityUrl,
        blogUrl: blogSlug ? `${baseUrl}/blog/${blogSlug}` : undefined,
      });

      pagesGeneratedToday++;
    }

    const indexerResult = await indexer.indexUrls(newlyPublishedUrls);

    await manager.sendDailyRunReport({
      nicheSlug,
      throttleUsed: pagesGeneratedToday,
      throttleLimit: SAFE_DAILY_LIMIT,
      stoppedForCap,
      published,
      errors,
      indexer: indexerResult,
    });
  } catch (fatal: any) {
    await sendBotMessage(
      manager.botName,
      industry,
      'ALERT',
      `🛑 *Fatal error in nightly factory run*\n\n${fatal?.message || String(fatal)}`
    );
    throw fatal;
  }
}

export const allUsCities = [
  'Atlanta, GA',
  'Dallas, TX',
  'Austin, TX',
  'Denver, CO',
  'Phoenix, AZ',
  'Charlotte, NC',
  'Miami, FL',
  'Seattle, WA',
  'Houston, TX',
  'Orlando, FL',
  'Nashville, TN',
  'Tampa, FL',
  'Raleigh, NC',
  'San Antonio, TX',
  'Las Vegas, NV',
];

export const activeIndustries = [
  { name: 'Commercial Cleaning', slug: 'commercial-cleaning-leads' },
  { name: 'HVAC Services', slug: 'hvac-leads' },
  { name: 'Commercial Plumbing', slug: 'plumbing-leads' },
  { name: 'Landscaping', slug: 'landscaping-leads' },
  { name: 'Vending Machines', slug: 'vending-machine-leads' },
];

// Fallback logic for manual testing from command line / GitHub Actions
if (require.main === module) {
  async function deployGlobalFactory() {
    for (const industry of activeIndustries) {
      console.log(`\n🚀 Waking up ${industry.name} Bots...`);
      await runDailyContentFactory(industry.name, industry.slug, allUsCities);
    }
    console.log('\n🟢 Global Orchestrator Loop Finished for ALL industries.');
  }

  deployGlobalFactory();
}
