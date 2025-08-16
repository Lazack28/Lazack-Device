const handler = async (m, { conn, text, isAdmin }) => {
  // Validate input
  if (!text) {
    const example = `Example: *${usedPrefix}setbye Goodbye @user!*`;
    return conn.reply(
      m.chat,
      `${emoji} Please provide a goodbye message.\n\n${example}\n\n` +
      `Available variables:\n` +
      `• @user - Mentions the leaving user\n` +
      `• @group - Group name\n` +
      `• @desc - Group description`,
      m
    );
  }

  // Validate admin permissions (if in group)
  if (m.isGroup && !isAdmin) {
    return conn.reply(
      m.chat,
      `${emoji2} Only admins can set goodbye messages!`,
      m
    );
  }

  try {
    // Store the goodbye message
    if (!global.db.data.settings) global.db.data.settings = {};
    global.db.data.settings.goodbyeMessage = text.trim();

    // Confirmation message
    const successMessage = `${emoji} Goodbye message set to:\n\n` +
      `"${text.trim()}"\n\n` +
      `Preview:\n` +
      text.trim()
        .replace(/@user/g, '@1234567890')
        .replace(/@group/g, 'Test Group')
        .replace(/@desc/g, 'Test Description');

    await conn.reply(m.chat, successMessage, m);
    await m.react('✅');

  } catch (error) {
    console.error('Setbye error:', error);
    await conn.reply(
      m.chat,
      `${emoji2} Failed to set goodbye message: ${error.message}`,
      m
    );
    await m.react('❌');
  }
};

// Command configuration
handler.help = ['setbye <text>'];
handler.tags = ['group', 'tools'];
handler.command = ['setbye', 'setdespedida', 'goodbyeset'];
handler.group = true;
handler.admin = true;  // Requires admin in groups
handler.owner = false; // Not restricted to owner

export default handler;