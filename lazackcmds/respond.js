// greetings.js
// This plugin replies to greetings (English + Swahili) in DM only with 10s delay.

export async function before(m, { conn }) {
  // Ignore if no text
  if (!m.text) return;

  // Only work in DM (not groups)
  if (m.isGroup) return;

  // Normalize incoming message
  let text = m.text.toLowerCase().trim();

  // Greetings list (English + Swahili)
  let greetings = [
    "hi", "hello", "hey", "good morning", "good afternoon", "good evening",
    "mambo", "vipi", "shikamoo", "salama", "poa", "habari", "niaje", "sasa"
  ];

  // Check if incoming message contains a greeting
  if (greetings.some(greet => text.includes(greet))) {
    let response = `
👋 *Hello!*  
💬 Please type your query.  
🕒 The boss is currently *offline*.
    `.trim();

    // Simulate typing
    await conn.sendPresenceUpdate("composing", m.chat);

    // Wait 10 seconds before replying
    await new Promise(resolve => setTimeout(resolve, 10000));

    await m.reply(response);
    return true; // prevent other handlers if needed
  }
}
