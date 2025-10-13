// greetings.js
// This plugin replies to greetings (English + Swahili) in DM only with 10s delay.
// Replies once every 12 hours per user.

const greetedRecently = {}; // Store timestamps per user

export async function before(m, { conn }) {
  if (!m.text) return;
  if (m.isGroup) return;

  let text = m.text.toLowerCase().trim();

  const greetings = [
    "hi", "hello", "hey", "good morning", "good afternoon", "good evening",
    "mambo", "vipi", "shikamoo", "salama", "poa", "habari", "niaje", "sasa"
  ];

  const user = m.sender;

  // Check if it's a greeting
  if (greetings.some(greet => text.includes(greet))) {
    const now = Date.now();
    const lastGreeted = greetedRecently[user] || 0;
    const twelveHours = 12 * 60 * 60 * 1000;

    // Check if 12 hours have passed
    if (now - lastGreeted < twelveHours) return; // skip reply

    // Update last greeted time
    greetedRecently[user] = now;

    const response = `
👋 *Hello!*  
💬 Please type your query.  
🕒 The boss is currently *offline*.
    `.trim();

    await conn.sendPresenceUpdate("composing", m.chat);
    await new Promise(resolve => setTimeout(resolve, 10000));
    await m.reply(response);

    return true;
  }
}
