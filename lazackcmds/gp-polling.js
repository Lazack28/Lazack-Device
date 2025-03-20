let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  // Check if text exists
  if (!text) {
      return m.reply(`❌ *Incorrect format!*\n\n📌 Use: ${usedPrefix + command} question | option1 | option2`);
  }

  // Split the message text using '|' and get options
  let parts = text.split('|').map(v => v.trim());
  let question = parts[0];
  let options = parts.slice(1);

  // Validate input
  if (options.length < 2) {
      return m.reply(`❌ *Please provide at least two options!*\n\n📌 Example: ${usedPrefix + command} Do you like coding? | Yes | No`);
  }
  if (options.length > 10) {
      return m.reply(`❌ *Too many options!* Maximum: 10\n\n📌 Example: ${usedPrefix + command} Favorite Language? | JavaScript | Python | C++`);
  }
  if (hasDuplicate(options)) {
      return m.reply(`❌ *Duplicate options detected!* Please use unique choices.`);
  }

  // Create poll message
  let cap = `📊 *Poll by:* ${m.pushName}\n📝 *Question:* ${question}`;
  const pollMessage = {
      name: cap,
      values: options,
      multiselect: false,
      selectableCount: 1,
  };

  // Send poll
  await conn.sendMessage(m.chat, { poll: pollMessage });
};

handler.help = ['poll question | option1 | option2'];
handler.tags = ['group'];
handler.command = /^po(l((l?ing|ls)|l)|ols?)$/i;
handler.group = true;

export default handler;

// Function to check for duplicate options
function hasDuplicate(arr) {
  return new Set(arr).size !== arr.length;
}
