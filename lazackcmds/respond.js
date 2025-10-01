// greetings.js
// DM-only greetings responder (with 10s delay, one-time reply, ignores owner)

const repliedUsers = new Set(); // track users already replied

export async function before(m, { conn }) {
  // Ignore if no text
  if (!m.text) return;

  // Only work in DM (not groups)
  if (m.isGroup) return;

  // Ignore if message is from owner number
  const ownerNumber = global.owner ? global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net') : [];
  if (ownerNumber.includes(m.sender)) return;

  // Normalize incoming message
  let text = m.text.toLowerCase().trim();

  // Greetings list (English + Swahili)
  let greetings = [
    "hi", "hello", "kaka", "boss", "hey", "good morning", "good afternoon", "good evening",
    "mambo", "vipi", "shikamoo", "salama", "poa", "habari", "niaje", "sasa"
  ];

  // If already replied to this user, ignore
  if (repliedUsers.has(m.sender)) return;

  // Check if incoming message contains a greeting
  if (greetings.some(greet => text.includes(greet))) {
    let response = `
👋 *Hello!*  
💬 Please type your query (Tafadhali andika tatizo).  
🕒 The boss is currently *offline*.
    `.trim();

    // Simulate typing
    await conn.sendPresenceUpdate("composing", m.chat);

    // Wait 10 seconds before replying
    await new Promise(resolve => setTimeout(resolve, 10000));

    await m.reply(response);

    // Mark this user as replied
    repliedUsers.add(m.sender);
    return true;
  }
}
