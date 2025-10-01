// respond.js
// DM-only greetings responder (10s delay, reply once, ignores owner)

const repliedUsers = new Set(); // track users already replied

export async function before(m, { conn }) {
  if (!m.text) return; // Ignore if no text
  if (m.isGroup) return; // Only DM

  let text = m.text.toLowerCase().trim();

  // Greetings list
  let greetings = [
    "hi", "hello", "hey", "good morning", "good afternoon", "good evening",
    "mambo", "vipi", "shikamoo", "salama", "poa", "habari", "niaje", "sasa"
  ];

  // Safely normalize owner numbers
  let ownerNumbers = (global.owner || []).map(v => {
    if (typeof v === "string") return v.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    if (Array.isArray(v)) return String(v[0]).replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    if (typeof v === "number") return String(v).replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    return null;
  }).filter(v => v);

  // Ignore if sender is owner
  if (ownerNumbers.includes(m.sender)) return;

  // Ignore if already replied once
  if (repliedUsers.has(m.sender)) return;

  // Check for greetings
  if (greetings.some(greet => text.includes(greet))) {
    repliedUsers.add(m.sender); // Mark as replied

    await conn.sendPresenceUpdate("composing", m.chat); // Show typing

    await new Promise(resolve => setTimeout(resolve, 10000)); // 10s delay

    await m.reply(`
👋 *Hello!*  
💬 Please type your query.  
🕒 The boss is currently *offline*.
    `.trim());
  }
}
