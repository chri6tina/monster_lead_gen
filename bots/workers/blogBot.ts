import OpenAI from 'openai';
import { sendBotMessage } from '../core/telegramService';
import { pushBlogToProduction } from '../core/databaseService';
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
 * Tier 3: The Blog Bot (The Writer) ✍️
 * Consumes SEO Briefs and writes long-form, highly converting blog posts directly to the Supabase Database.
 * Includes built-in throttling to avoid spam indexation penalties.
 */
export class BlogBot {
  industryName: string;
  botName: string;
  systemPrompt: string;

  constructor(industryName: string) {
    this.industryName = industryName;
    this.botName = `${this.industryName} Blog Bot`;
    
    this.systemPrompt = `
      You are the LeadMonster Tier 3 Blog Writer for the ${this.industryName} sector.
      You receive strict SEO Content Briefs from the Tier 3 SEO Research Bot based on a target city.
      Your sole job is to turn those briefs into perfectly formatted, highly engaging, B2B lead-generation blog posts.
      
      CRITICAL SEO DIRECTIVES:
      1. LENGTH: The 'content' field MUST be over 1,500 characters. No exceptions. Deep, authoritative, long-form content ranks best.
      2. UNIQUENESS: Every paragraph must be highly distinct and completely tailored to the specific target city. Do not output generic boilerplate. Google will penalize us for duplicate content if this is not deeply unique.
      3. FORMATTING: Use deep, pure HTML formatting. DO NOT USE MARKDOWN. Use precise HTML tags (<p>, <h2>, <h3>, <ul>, <li>, <strong>) for readability. Do not wrap the HTML in markdown codeblocks.
      4. VOICE: Professional, authoritative, and aggressively focused on B2B revenue. 
      5. CTAS: Seamlessly integrate internal calls-to-action urging readers to "Shop Niche Marketplace" or "Request Custom Data".
      6. KEYWORDS: Naturally weave in the exact Long-Tail Keywords provided by the SEO Bot. Do not keyword stuff.

      You must return your response STRICTLY as a JSON object matching this structure:
      {
        "title": "A highly clickable, SEO optimized title under 60 characters",
        "slug": "url-friendly-slug-like-this",
        "excerpt": "A high-converting 1-2 sentence meta description summarizing the post.",
        "content": "The 1500+ character HTML body of the post. Use strict <p>, <h2>, <ul> tags. Absolutely NO markdown."
      }
    `;
  }

  /**
   * Generates a blog post based on an SEO brief and immediately publishes it to Supabase.
   */
  async generateAndPublishPost(seoBrief: string, targetCity: string, currentDailyCount: number, dailyLimit: number) {
    // 🛑 Throttling Check: Prevent spam indexation algorithms from catching us
    if (currentDailyCount >= dailyLimit) {
      await sendBotMessage(
        this.botName,
        this.industryName,
        'ALERT',
        `⚠️ Daily publishing limit reached (${currentDailyCount}/${dailyLimit}).`
      );
      return null;
    }

    const userPrompt = `
      Target City: ${targetCity}
      
      Execute this SEO Brief perfectly:
      ${seoBrief}

      Return standard JSON. Ensure 'content' is deeply formatted HTML over 1,500 characters. DO NOT use markdown.
    `;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: this.systemPrompt },
          { role: "user", content: userPrompt }
        ]
      });

      const rawJson = response.choices[0].message.content || "{}";
      const blogData = JSON.parse(rawJson);

      // Validate Character Count (Enforcing the 1,500 char rule rigorously)
      if (!blogData.content || blogData.content.length < 1500) {
        throw new Error(`AI generated a thin post (${blogData.content?.length || 0} chars). Aborted insertion.`);
      }

      // 💾 LIVE DATABASE INSERTION 💾
      await pushBlogToProduction({
        title: blogData.title,
        slug: blogData.slug,
        excerpt: blogData.excerpt,
        content: blogData.content,
        targetNiche: this.industryName,
        targetCity: targetCity
      });

      // User requested minimal, clean telegram alerts for worker bots. Just the link!
      await sendBotMessage(
        this.botName, 
        this.industryName, 
        'REPORT', 
        `✅ Blog Generated & Pushed to Live Database!\n\n🔗 *Review URL:* [monsterleadgen.com/blog/${blogData.slug}](https://www.monsterleadgen.com/blog/${blogData.slug})`, 
        { "Length": blogData.content.length }
      );

      return true;

    } catch (err: any) {
      // Alerts are "extremely important" so we still push them to Telegram
      await sendBotMessage(this.botName, this.industryName, 'ALERT', `Failed to generate or publish Blog Post: ${err.message}`);
    }
  }
}

// Quick Demonstration Script
if (require.main === module) {
  const cleaningBlog = new BlogBot("Commercial Cleaning");
  
  const fakeSeoBrief = `
    Focus: Post-Construction Cleanup in Miami, FL.
    H2: Why Miami Contractors Need Professional Cleanup
    H2: Secure Consistent Cleanup Bids for Office Buildings
    H2: Stop Missing Opportunities with our Targeted Leads 
  `;

  const targetCity = "Miami, FL";
  const DAILY_PUBLISH_LIMIT = 2;
  const currentBlogsPublishedToday = 0; 

  cleaningBlog.generateAndPublishPost(fakeSeoBrief, targetCity, currentBlogsPublishedToday, DAILY_PUBLISH_LIMIT).then(() => {
    console.log(`🟢 ${cleaningBlog.botName} run complete. Check Telegram to confirm Live Push.`);
  });
}
