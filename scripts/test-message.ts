import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import path from 'path';

// Load variables directly from your Next.js local environment
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

if (!botToken || !adminChatId) {
  console.error("🔴 Missing credentials in .env.local. Could not send test message.");
  process.exit(1);
}

const bot = new Telegraf(botToken);

async function sendTest() {
  try {
    const msg = `🚨 *SYSTEM LINK ESTABLISHED* 🚨\n\nExecutive Admin Chat ID universally recognized.\n\nStripe Checkout triggers and Next.js Database alerts can now route explicitly to your device.\n\n_LeadMonster Command Control is online._`;
    await bot.telegram.sendMessage(adminChatId as string, msg, { parse_mode: 'Markdown' });
    console.log("🟢 Test push notification fired successfully!");
    process.exit(0);
  } catch (err: any) {
    console.error("🔴 Failed to send push message:", err.message);
    process.exit(1);
  }
}

sendTest();
