// greetings.js
// DM-only greetings responder (10s delay, reply once, ignores owner)

const repliedUsers = new Set(); // keep track of users already replied

export async function before(m, { conn }) {
  // Ignore if no text
  if (!m.text) return;

  // Ignore if in a group
  if (m.isGroup) return;

  // Normalize incoming message
  let text = m.text.toLowerCase().trim();

  // Greetings keywords (English + Swahili)
  let greetings = [
    "hi", "hello", "hey", "good morning", "good afternoon", "good evening",
    "mambo", "vipi", "shikamoo", "salama", "poa", "habari", "niaje", "sasa"
  ];

  // Get owner numbers in proper format
  let ownerNumbers = global.owner
    ? global.owner.map(v => (v.replace(/[^0-9]/g, '') + "@s.whatsapp.net"))
    : [];

  // Ignore if sender is owner
  if (ownerNumbers.includes(m.sender)) return;

  // Ignore if already replied to this user
  if (repliedUsers.has(m.sender)) return;

  // Check if the message contains a greeting
  if (greetings.some(greet => text.includes(greet))) {
    // Mark user as replied (so bot won't spam)
    repliedUsers.add(m.sender);

    // Show typing
    await conn.sendPresenceUpdate("composing", m.chat);

    // Delay 10 seconds
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Reply
    await m.reply(`
👋 *Hello!*  
💬 Please type your query.  
🕒 The boss is currently *offline*.
    `.trim());
  }
}
