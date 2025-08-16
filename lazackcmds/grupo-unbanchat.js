const handler = async (m, { conn, usedPrefix, command, args, isAdmin }) => {
  // Initialize chat data if not exists
  if (!(m.chat in global.db.data.chats)) {
    global.db.data.chats[m.chat] = {};
  }
  const chat = global.db.data.chats[m.chat];

  // Validate admin permissions
  if (!isAdmin) {
    return conn.reply(
      m.chat,
      `🔒 Only admins can control ${botname} in this group`,
      m
    );
  }

  // Show status if no arguments
  if (args.length === 0) {
    const status = chat.isBanned ? '❌ Disabled' : '✅ Enabled';
    const helpMsg = `⚙️ *${botname} Control Panel*\n\n` +
      `Current Status: *${status}*\n\n` +
      `Usage:\n` +
      `• *${usedPrefix}bot on* - Enable bot\n` +
      `• *${usedPrefix}bot off* - Disable bot\n\n` +
      `Note: Only admins can use this command`;
    return conn.reply(m.chat, helpMsg, m);
  }

  // Process commands
  const action = args[0].toLowerCase();
  switch (action) {
    case 'off':
      if (chat.isBanned) {
        return conn.reply(
          m.chat,
          `ℹ️ ${botname} is already disabled in this group`,
          m
        );
      }
      chat.isBanned = true;
      await conn.reply(
        m.chat,
        `🔇 ${botname} has been *disabled* in this group\n` +
        `Admins can enable me anytime with *${usedPrefix}bot on*`,
        m
      );
      break;

    case 'on':
      if (!chat.isBanned) {
        return conn.reply(
          m.chat,
          `ℹ️ ${botname} is already enabled in this group`,
          m
        );
      }
      chat.isBanned = false;
      await conn.reply(
        m.chat,
        `🔊 ${botname} has been *enabled* in this group!\n` +
        `Ready to serve! ${emoji}`,
        m
      );
      break;

    default:
      return conn.reply(
        m.chat,
        `⚠️ Invalid option. Use *${usedPrefix}bot on* or *${usedPrefix}bot off*`,
        m
      );
  }
};

// Command configuration
handler.help = ['bot [on/off]'];
handler.tags = ['group', 'admin'];
handler.command = ['bot', 'botcontrol'];
handler.group = true;
handler.admin = true;      // Requires admin privileges
handler.botAdmin = false;  // Doesn't require bot to be admin

export default handler;