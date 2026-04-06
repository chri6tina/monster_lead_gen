import OpenAI from 'openai';
import { pushCityPageToProduction } from '../core/databaseService';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const aiKey = process.env.OPENAI_API_KEY;
if (!aiKey) {
  console.warn("🔴 Missing OPENAI_API_KEY inside .env.local");
}

const openai = new OpenAI({ apiKey: aiKey || "MISSING" });

/**
 * Tier 3: The City Pages Bot (The Localizer) 🏙️
 * Generates massive, hyper-localized databases of information for specific niches.
 * Designed to write heavy content and build 10+ deeply formatted FAQs to dominate Local SEO.
 */
export class CityPagesBot {
  industryName: string;
  nicheSlug: string;
  botName: string;
  systemPrompt: string;

  constructor(industryName: string, nicheSlug: string) {
    this.industryName = industryName;
    this.nicheSlug = nicheSlug;
    this.botName = `${this.industryName} City Bot`;
    
    this.systemPrompt = `
      You are the LeadMonster Tier 3 City Page Generator for the ${this.industryName} sector.
      Your job is to generate massive, exhaustive, hyper-local SEO data for the given city.
      
      CRITICAL SEO DIRECTIVES:
      1. DEPTH: Do NOT write short content. You must provide massive arrays of information, dense paragraphs, and incredibly rich local relevance.
      2. UNIQUENESS: No boilerplate. If the target is Miami, you MUST talk about Florida's climate, local commercial zoning, and actual geographic relevance to the ${this.industryName} industry.
      3. FAQS: You MUST provide EXACTLY 10 rich, fully-fleshed out FAQs about ${this.industryName} in this specific city to snatch Google's "People Also Ask" snippets.
      4. VOICE: Aggressive B2B lead generation. We want the user to buy our data sets.
      5. NEGATIVE CONSTRAINTS: DO NOT use generic, cliché AI city-filler words. ABSOLUTELY BANNED WORDS: "bustling", "lush greenery", "In today's fast-paced world", "delve", "moreover", "testament", "vibrant", "look no further", "tapestry", "hidden gem", "nestled". Be ruthless, direct, and sound like a highly-paid B2B data broker, not a cheap travel blogger.

      You must return your response STRICTLY as a JSON object matching this structure:
      {
        "heroHeadline": "Hyper-local headline driving conversions",
        "heroSub": "Heavy local description",
        "infoHeading": "What you need to know about ${this.industryName} in [City]",
        "infoParagraph": "A massive, dense HTML string (use <p>, <strong>) deep-diving into the local market.",
        "feat1Title": "First Feature",
        "feat1Desc": "Deep description",
        "feat2Title": "Second Feature",
        "feat2Desc": "Deep description",
        "targetAudienceHeading": "Who Needs These Leads in [City]?",
        "targetAudience": [
           { "title": "...", "desc": "..." },
           { "title": "...", "desc": "..." },
           { "title": "...", "desc": "..." }
        ],
        "landscapeHeading": "The Commercial Landscape of [City]",
        "landscapeParagraph1": "Massive localized HTML string...",
        "landscapeParagraph2": "Massive localized HTML string...",
        "faqs": [
           { "question": "...", "answer": "..." } // Must be exactly 10 FAQs
        ]
      }
    `;
  }

  /**
   * Generates deep city page data and upserts it to Supabase.
   */
  async generateAndPublishCity(targetCityName: string, targetCitySlug: string, currentDailyCount: number, dailyLimit: number) {
    // 🛑 Throttling Check
    if (currentDailyCount >= dailyLimit) {
      return null;
    }

    const userPrompt = `Target City: ${targetCityName}\n\nBuild the absolute best, most dense City Page on the internet for this location. Remember: 10 FAQs minimum. Heavy local context.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: this.systemPrompt },
          { role: "user", content: userPrompt }
        ]
      });

      const rawJson = response.choices[0].message.content || "{}";
      const cityData = JSON.parse(rawJson);

      // Validate Content Heaviness
      if (!cityData.faqs || cityData.faqs.length < 5) {
        throw new Error(`AI generated a thin page (${cityData.faqs?.length || 0} FAQs). Aborted insertion.`);
      }

      // Upsert to Live Database
      await pushCityPageToProduction({
        niche_slug: this.nicheSlug,
        city_slug: targetCitySlug,
        ...cityData
      });

      return true;

    } catch (err: any) {
      throw new Error(`City page publish failed (${targetCityName}): ${err.message}`);
    }
  }
}

// Quick Demonstration Script
if (require.main === module) {
  const cityBot = new CityPagesBot("Commercial Cleaning", "commercial-cleaning-leads");
  
  const DAILY_PUBLISH_LIMIT = 2; // Strict scale algorithm
  const pagesPublishedToday = 0; 

  cityBot.generateAndPublishCity("Miami, Florida", "miami-fl", pagesPublishedToday, DAILY_PUBLISH_LIMIT).then(() => {
    console.log(`🟢 ${cityBot.botName} run complete. Check Telegram to confirm Live Push.`);
  });
}
