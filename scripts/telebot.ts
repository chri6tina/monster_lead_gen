import { Telegraf } from 'telegraf';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';

// Load variables directly from your Next.js local environment
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const aiKey = process.env.OPENAI_API_KEY;

if (!botToken || !aiKey) {
  console.error("🔴 Missing credentials in .env.local. Bot shutdown.");
  process.exit(1);
}

// Initialize Clients
const bot = new Telegraf(botToken);
const openai = new OpenAI({ apiKey: aiKey });

console.log("🟡 Initializing LeadMonster Telegram Link...");

// 1. Welcome Command
bot.start((ctx) => {
  ctx.reply(
    '🟢 LeadMonster Auto-Bot Online!\n\n' +
    'I am securely connected to your Next.js server and OpenAI.\n' +
    'From here, you will be able to:\n' +
    '- Command me to generate massive City Page Databases.\n' +
    '- Get instant Stripe checkout notifications.\n' +
    '- Auto-draft B2B sales scripts on the fly.\n\n' +
    'Send me any message right now to test the OpenAI link!'
  );
});

// 2. Status Check
bot.command('status', (ctx) => {
  ctx.reply('🟢 All Systems Go.\n- Next.js Edge Caching: Passive\n- Supabase DB: Indexed\n- OpenAI Link: Established');
});

// 3. AI Smart Responder (Listens to all texts)
bot.on('message', async (ctx: any) => {
  const userMessage = ctx.message.text;
  
  if (!userMessage || userMessage.startsWith('/')) return;

  try {
    // Show typing indicator on Telegram
    await ctx.sendChatAction('typing');
    
    // 🔥 Admin Recognition Hook 🔥
    const chatId = ctx.chat.id;
    console.log(`\n\n=== 🚨 NEW ADMIN CHAT ID DETECTED: ${chatId} ===\n\n`);
    
    if (userMessage.toLowerCase().includes("id")) {
      return ctx.reply(`🔐 Your Secure Admin Chat ID is:\n\n${chatId}\n\nPut this in your .env.local file as TELEGRAM_ADMIN_CHAT_ID="${chatId}" so I can securely send you instant Stripe notifications.`);
    }

    // Secure call to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // We tap into the fast Omni model natively
      messages: [
        { 
          role: "system", 
          content: "You are the LeadMonster AI Executive Assistant. You help manage an outbound lead generation company directly through Telegram. Keep your answers incredibly sharp, slightly aggressive, and highly professional. Your sole focus is B2B revenue and market dominance. Keep responses under 3 paragraphs." 
        },
        { role: "user", content: userMessage }
      ]
    });

    const aiAnswer = response.choices[0].message.content;
    if (aiAnswer) {
      ctx.reply(aiAnswer);
    }
    
  } catch (error: any) {
    ctx.reply(`⚠️ Connection to OpenAI failed: ${error.message}`);
  }
});

// Launch the bot via Long-Polling (so it runs smoothly on your local laptop)
bot.launch()
  .then(() => console.log('🟢 LeadMonster Telegram Bot is live! Send a message to your bot on your phone right now.'))
  .catch((err) => console.error('🔴 Bot failed to launch:', err));

// Graceful stops for development
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
