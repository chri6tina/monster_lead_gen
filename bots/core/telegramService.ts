import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import path from 'path';

// Local environments map
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

if (!botToken || !adminChatId) {
  console.error("🔴 Missing TELEGRAM credentials in .env.local.");
}

const bot = new Telegraf(botToken || "");

/**
 * The standard protocol for all bots to communicate via Telegram.
 * Enforces high readability and deep information depth.
 */
export async function sendBotMessage(
  botName: string, 
  industry: string, 
  status: 'LEARNING' | 'ACTION' | 'ALERT' | 'REPORT',
  detailedMessage: string,
  metrics?: Record<string, string | number>
) {
  if (!adminChatId) return;

  // Formatting emojis based on status
  const statusEmoji = {
    'LEARNING': '🧠',
    'ACTION': '⚡',
    'ALERT': '🚨',
    'REPORT': '📊'
  }[status];

  // Build the Header
  let msg = `${statusEmoji} *[${botName.toUpperCase()}]*\n`;
  msg += `🏢 *Sector:* ${industry}\n`;
  msg += `⚙️ *Status:* ${status}\n`;
  msg += `━━━━━━━━━━━━━━━━━━\n\n`;

  // Build the Core Message
  // We ensure the detailed message is passed through clearly
  msg += `${detailedMessage}\n\n`;

  // Build the Metrics/Data section if it exists
  if (metrics && Object.keys(metrics).length > 0) {
    msg += `📈 *Live Data & Metrics:*\n`;
    for (const [key, value] of Object.entries(metrics)) {
      msg += `• *${key}:* ${value}\n`;
    }
    msg += `━━━━━━━━━━━━━━━━━━\n`;
  }

  try {
    await bot.telegram.sendMessage(adminChatId, msg, { parse_mode: 'Markdown' });
  } catch (error: any) {
    console.error(`Failed to push message from ${botName} with Markdown:`, error.message);
    try {
      // Auto-fallback: If the LLM generates broken markdown formatting, send as plain text 
      // rather than failing completely so the business owner still gets the alert.
      await bot.telegram.sendMessage(adminChatId, msg);
    } catch (fallbackError: any) {
      console.error(`Fallback push also failed for ${botName}:`, fallbackError.message);
    }
  }
}
