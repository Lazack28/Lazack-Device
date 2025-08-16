/**
 * Set Group Welcome Message Command
 * @description Configure custom welcome messages for new group members
 */
const handler = async (m, { conn, text, isAdmin }) => {
  // Validate input
  if (!text) {
    const example = `Example: *${usedPrefix}setwelcome Welcome @user to @group!*`;
    return conn.reply(
      m.chat,
      `${emoji} Please provide a welcome message.\n\n${example}\n\n` +
      `Available variables:\n` +
      `• @user - Mentions the new user\n` +
      `• @group - Group name\n` +
      `• @desc - Group description\n` +
      `• @membercount - Total group members`,
      m
    );
  }

  // Verify admin permissions in groups
  if (m.isGroup && !isAdmin) {
    return conn.reply(
      m.chat,
      `${emoji2} Only admins can set welcome messages!`,
      m
    );
  }

  try {
    // Initialize database structure if needed
    if (!global.db.data.settings) global.db.data.settings = {};
    if (!global.db.data.settings.welcomeMessages) {
      global.db.data.settings.welcomeMessages = {};
    }

    // Store welcome message
    global.db.data.settings.welcomeMessages[m.chat] = text.trim();

    // Send confirmation with preview
    const preview = text.trim()
      .replace(/@user/g, '@1234567890')
      .replace(/@group/g, conn.getName(m.chat))
      .replace(/@desc/g, (await conn.groupMetadata(m.chat)).desc || 'Group Description')
      .replace(/@membercount/g, (await conn.groupMetadata(m.chat)).participants.length);

    await conn.reply(
      m.chat,
      `${emoji} Welcome message set successfully!\n\n` +
      `Preview:\n${preview}`,
      m
    );
    await m.react('✅');

  } catch (error) {
    console.error('SetWelcome Error:', error);
    await conn.reply(
      m.chat,
      `${emoji2} Failed to set welcome message: ${error.message}`,
      m
    );
    await m.react('❌');
  }
};

// Command configuration
handler.help = ['setwelcome <text>'];
handler.tags = ['group', 'tools'];
handler.command = ['setwelcome', 'setbienvenida'];
handler.group = true;
handler.admin = true;  // Requires admin in groups
handler.botAdmin = true; // Recommended for proper functionality

export default handler;