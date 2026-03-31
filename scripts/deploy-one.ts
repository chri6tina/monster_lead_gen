import { SniperBot } from '../bots/workers/sniperBot';
import { BlogBot } from '../bots/workers/blogBot';

async function generateSingleSniperBlog() {
  const city = "Seattle, WA";
  const industry = "Commercial Cleaning";
  const targetKeyword = `${industry} in ${city}`;
  
  // A tiny dummy SEO brief
  const brief = `Focus: Commercial office space cleaning and janitorial contracts in ${city}. Add H2s explaining the ROI of daily sanitation.`;
  
  console.log("\n🚀 1. Waking Sniper Bot to rip top 3 Google Competitors...");
  const sniper = new SniperBot(industry);
  const sniperIntel = await sniper.acquireCompetitorIntel(targetKeyword);
  
  if (sniperIntel) {
    console.log(`✅ Sniper successfully ripped ${sniperIntel.length} characters of competitor HTML.`);
  } else {
    console.log(`❌ Sniper failed. Continuing with basic brief.`);
  }
  
  const enhancedBrief = sniperIntel ? `${brief}\n\n${sniperIntel}` : brief;
  
  console.log("\n🖋️ 2. Waking Blog AI to analyze Sniper Data and generate 2,000+ Word HTML Blog...");
  const blogger = new BlogBot(industry);
  
  // Safe limits disabled for manual test
  const slug = await blogger.generateAndPublishPost(enhancedBrief, city, 0, 999);
  
  if (slug) {
     console.log(`\n🎉 MASTERPIECE GENERATED AND PUSHED TO SUPABASE!`);
     console.log(`🌐 Click here to read it live: http://localhost:3000/blog/${slug}\n`);
  } else {
     console.log("\n❌ Failed to generate the blog.");
  }
}

generateSingleSniperBlog();
