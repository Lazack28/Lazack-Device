const handler = async (m, { conn, text, command, usedPrefix }) => {
  const defaultPP = './src/catalogo.jpg';
  const defaultReason = 'No reason provided';
  
  // Determine who to warn (mentioned, quoted, or text input)
  let who;
  if (m.isGroup) {
    who = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : text);
  } else {
    who = m.chat; // In private chat, warn the chat itself
  }

  // Validate target
  const warnPrompt = `${emoji} Tag a user or reply to their message to warn them.`;
  if (!who) return m.reply(warnPrompt, m.chat, { mentions: conn.parseMention(warnPrompt) });

  // Skip if the target is the bot itself
  if (who === conn.user.jid) return;

  // Get user data and clean the reason text
  const user = global.db.data.users[who] || { warn: 0 };
  const cleanReason = (text || defaultReason).replace(/@\d+-?\d* /g, '').trim();

  // Check if the warner is a bot owner (skip warning)
  const botOwners = global.owner.map(([number]) => `${number}@s.whatsapp.net`);
  if (botOwners.includes(m.sender)) {
    await conn.reply(m.chat, "⚠️ Bot owners cannot be warned.", m);
    return;
  }

  // Increment warn count
  user.warn += 1;

  // Send warning message
  const warnMessage = `⚠️ *@${who.split('@')[0]}* has been warned!\n` +
                     `Reason: ${cleanReason}\n` +
                     `Warnings: ${user.warn}/3`;
  await m.reply(warnMessage, null, { mentions: [who] });

  // Auto-remove if warnings ≥ 3
  if (user.warn >= 3) {
    user.warn = 0; // Reset warnings
    await m.reply(
      `🚫 *@${who.split('@')[0]}* exceeded 3 warnings and has been removed!`,
      null,
      { mentions: [who] }
    );
    await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
  }
};

// Command setup
handler.command = ['warn', 'warning', 'advertir', 'advertencia'];
handler.group = true;
handler.admin = true;       // Only group admins can use
handler.botAdmin = true;    // Bot must be admin to remove members

export default handler;