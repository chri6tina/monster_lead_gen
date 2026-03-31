import { SniperBot } from '../bots/workers/sniperBot';

async function testSniper() {
  console.log("\n🚀 Initializing Sniper Bot Manual Override...");
  const sniper = new SniperBot("Commercial Cleaning");
  
  const keyword = "Buy commercial cleaning leads Miami";
  console.log(`🎯 Target Locked: "${keyword}"\n`);
  console.log(`📡 Hitting Serper.dev Google API and breaching competitor domains... Please wait roughly 5-10 seconds.\n`);
  
  const intel = await sniper.acquireCompetitorIntel(keyword);
  
  if (intel) {
    console.log("\n✅ SNIPER INTEL ACQUIRED SUCCESSFULLY:");
    console.log("-------------------------------------------------");
    console.log(intel.substring(0, 1500) + "\n\n...[MASSIVE TEXT DATA TRUNCATED FOR TERMINAL VIEWING]...");
    console.log("-------------------------------------------------");
    console.log("Total Structural Data Ripped from Google:", intel.length, "characters");
    console.log("Status: READY TO FEED TO GPT-4o");
  } else {
    console.log("❌ Sniper Intel Failed. Check API keys and logs.");
  }
}

testSniper();
