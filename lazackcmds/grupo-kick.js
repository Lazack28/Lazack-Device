const handler = async (m, { conn, participants, usedPrefix, command }) => {
  // Check if user is mentioned or message is quoted
  if (!m.mentionedJid[0] && !m.quoted) {
    return conn.reply(
      m.chat,
      `✨ *Usage:*\n` +
      `• Tag someone: *${usedPrefix}kick @user*\n` +
      `• Reply to message: *${usedPrefix}kick* (in reply)\n\n` +
      `I need to know who to kick!`,
      m,
      { mentions: [] }
    );
  }

  // Get target user
  const user = m.mentionedJid[0] || m.quoted.sender;
  const groupInfo = await conn.groupMetadata(m.chat);
  const ownerGroup = groupInfo.owner || m.chat.split('-')[0] + '@s.whatsapp.net';
  const botOwner = global.owner[0][0] + '@s.whatsapp.net';

  // Protection checks
  if (user === conn.user.jid) {
    return conn.reply(
      m.chat,
      `😂 Nice try! I can't kick myself~`,
      m,
      { mentions: [user] }
    );
  }

  if (user === ownerGroup) {
    return conn.reply(
      m.chat,
      `🚫 *Error:* Can't kick the group owner!`,
      m,
      { mentions: [user] }
    );
  }

  if (user === botOwner) {
    return conn.reply(
      m.chat,
      `⛔ *Error:* I would never kick my creator!`,
      m,
      { mentions: [user] }
    );
  }

  // Execute kick
  try {
    await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
    
    // Success message with different random responses
    const successMessages = [
      `🚀 User kicked successfully!`,
      `💥 Sayonara! User removed~`,
      `👋 User has been shown the door!`,
      `✅ Successfully removed from group!`
    ];
    const randomResponse = successMessages[Math.floor(Math.random() * successMessages.length)];
    
    await conn.reply(
      m.chat,
      randomResponse,
      m,
      { mentions: [user] }
    );
    
  } catch (error) {
    console.error('Kick error:', error);
    
    const errorMessages = {
      '403': `❌ I don't have admin permissions to kick!`,
      '404': `🔍 User not found in this group!`,
      'default': `⚠️ Failed to kick user. Error: ${error.message}`
    };
    
    await conn.reply(
      m.chat,
      errorMessages[error.statusCode] || errorMessages.default,
      m
    );
  }
};

// Command configuration
handler.help = ['kick @user'];
handler.tags = ['group'];
handler.command = ['kick', 'ban', 'remove', 'echar', 'expulsar'];
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;