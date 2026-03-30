import { sendBotMessage } from './core/telegramService';
import { IndustryManagerBot } from './industryManagerBot';
import { SEOBot } from './workers/seoBot';
import { BlogBot } from './workers/blogBot';
import { CityPagesBot } from './workers/cityPagesBot';
import { SitemapIndexerBot } from './workers/sitemapIndexerBot';
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
 * It manages the entire Bot Army from research to final publication.
 */
export async function runDailyContentFactory(industry: string, nicheSlug: string, targetCities: string[]) {
  // Step 1: Boot Up the Bots
  const manager = new IndustryManagerBot(industry);
  const seo = new SEOBot(industry);
  const blogger = new BlogBot(industry);
  const localizer = new CityPagesBot(industry, nicheSlug);
  const indexer = new SitemapIndexerBot(industry);

  // Example: Assume the system has been running for 10 days
  // In a real database, you query "SELECT COUNT(*) FROM bot_runs"
  const systemDaysActive = 10; 
  const SAFE_DAILY_LIMIT = getDailySafeLimit(systemDaysActive);
  
  await sendBotMessage(
    "Orchestrator Node",
    "Global Architecture",
    "ACTION",
    `🟢 Waking Bot Army for ${industry}. Anti-Spam Throttle set to ${SAFE_DAILY_LIMIT} pages maximum today.`
  );

  let pagesGeneratedToday = 0; // Imagine evaluating the DB to see how many we published today
  const newlyPublishedUrls: string[] = []; // Collect URLs to ping Google with

  // Step 2: The Action Loop (Stop gracefully when we hit the limit)
  for (const city of targetCities) {
    if (pagesGeneratedToday >= SAFE_DAILY_LIMIT) {
      await sendBotMessage("Orchestrator Node", industry, "ALERT", `⚠️ Daily Output Cap Reached (${SAFE_DAILY_LIMIT}/${SAFE_DAILY_LIMIT}). Halting all worker bots immediately to protect Google domain authority.`);
      break;
    }

    // 1. Task: SEO Research for this City
    const brief = await seo.buildContentBrief(`${industry} Lead Generation`, city);
    
    // 2. Task: City Page Generation (The 10+ FAQ Data Blob)
    if (brief) {
      const citySlug = city.toLowerCase().replace(/, /g, '-').replace(/ /g, '-');
      await localizer.generateAndPublishCity(city, citySlug, pagesGeneratedToday, SAFE_DAILY_LIMIT);
      
      // Calculate the fully qualified City Page URL to tell Google about
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.monsterleadgen.com';
      const cityUrl = `${baseUrl}/${nicheSlug}/${citySlug}`;
      newlyPublishedUrls.push(cityUrl);

      // 3. Task: Blog Generation (Piggyback off the same SEO brief!)
      const generatedBlogSlug = await blogger.generateAndPublishPost(brief, city, pagesGeneratedToday, SAFE_DAILY_LIMIT);
      if (generatedBlogSlug) {
        newlyPublishedUrls.push(`${baseUrl}/blog/${generatedBlogSlug}`);
      }

      pagesGeneratedToday++;
    }

    // 3. Task: Inform Manager Bot
    await manager.synthesizeWorkerData({
      'City Pages Bot': `Successfully deployed ${city} targeting local search traffic.`
    });
  }

  // 4. Task: Push everything immediately to the Google Search Console Indexer
  if (newlyPublishedUrls.length > 0) {
    await indexer.indexUrls(newlyPublishedUrls);
  }

  // Final Shutdown Report
  await sendBotMessage(
    "Orchestrator Node",
    "Global Architecture",
    "REPORT",
    `🔴 Daily Sequence Complete. Bot Army is powering down until tomorrow.\n\nPages Published Today: ${pagesGeneratedToday}`,
    { "Throttle Capacity Used": `${pagesGeneratedToday}/${SAFE_DAILY_LIMIT}` }
  );
}

export const allUsCities = [
  "Atlanta, GA", "Dallas, TX", "Austin, TX", "Denver, CO", "Phoenix, AZ", 
  "Charlotte, NC", "Miami, FL", "Seattle, WA", "Houston, TX", "Orlando, FL",
  "Nashville, TN", "Tampa, FL", "Raleigh, NC", "San Antonio, TX", "Las Vegas, NV"
];

export const activeIndustries = [
  { name: "Commercial Cleaning", slug: "commercial-cleaning-leads" },
  { name: "HVAC Services", slug: "hvac-leads" },
  { name: "Commercial Plumbing", slug: "plumbing-leads" },
  { name: "Landscaping", slug: "landscaping-leads" },
  { name: "Vending Machines", slug: "vending-machine-leads" }
];

// Fallback logic for manual testing from command line / GitHub Actions
if (require.main === module) {
  async function deployGlobalFactory() {
    for (const industry of activeIndustries) {
      console.log(`\n🚀 Waking up ${industry.name} Bots...`);
      await runDailyContentFactory(industry.name, industry.slug, allUsCities);
    }
    console.log("\n🟢 Global Orchestrator Loop Finished for ALL industries.");
  }

  deployGlobalFactory();
}
