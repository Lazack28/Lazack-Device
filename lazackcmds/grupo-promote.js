const handler = async (m, { conn, usedPrefix, command, text, isAdmin, isBotAdmin }) => {
  // Validate permissions
  if (!isAdmin) {
    return conn.reply(m.chat, '🔒 *Only admins can promote users*', m);
  }
  if (!isBotAdmin) {
    return conn.reply(m.chat, '🤖 *I need admin rights to promote users*', m);
  }

  // Get target user
  let number;
  if (!text && !m.quoted) {
    return conn.reply(
      m.chat,
      `📌 *Usage:*\n` +
      `• Tag user: *${usedPrefix}promote @user*\n` +
      `• Reply to user: *${usedPrefix}promote* (in reply)\n` +
      `• Use number: *${usedPrefix}promote 123456789*`,
      m
    );
  }

  // Extract number from different input methods
  if (text.includes('@')) {
    number = text.split('@')[1];
  } else if (!isNaN(text)) {
    number = text;
  } else if (m.quoted) {
    number = m.quoted.sender.split('@')[0];
  }

  // Validate number
  if (!number || number.length > 15 || number.length < 10) {
    return conn.reply(m.chat, '⚠️ *Invalid phone number format*', m);
  }

  const user = `${number}@s.whatsapp.net`;

  try {
    // Check if user is already admin
    const groupData = await conn.groupMetadata(m.chat);
    const isAlreadyAdmin = groupData.participants.find(p => 
      p.id === user && (p.admin === 'admin' || p.admin === 'superadmin')
    );

    if (isAlreadyAdmin) {
      return conn.reply(
        m.chat,
        `ℹ️ @${number} is already an admin`,
        m,
        { mentions: [user] }
      );
    }

    // Promote user
    await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
    
    // Success message with different responses
    const successMessages = [
      `🎉 Congratulations @${number}! You've been promoted to admin!`,
      `👑 @${number} has joined the admin team!`,
      `⚡ @${number} is now an admin! Use your powers wisely~`
    ];
    const randomResponse = successMessages[Math.floor(Math.random() * successMessages.length)];
    
    await conn.reply(
      m.chat,
      randomResponse,
      m,
      { mentions: [user] }
    );
    
  } catch (error) {
    console.error('Promote error:', error);
    
    const errorMessages = {
      '403': `❌ I don't have admin permissions to promote!`,
      '404': `🔍 User not found in this group!`,
      'default': `⚠️ Failed to promote user. Error: ${error.message}`
    };
    
    await conn.reply(
      m.chat,
      errorMessages[error.statusCode] || errorMessages.default,
      m
    );
  }
};

// Command configuration
handler.help = ['promote @user'];
handler.tags = ['group'];
handler.command = ['promote', 'makeadmin'];
handler.group = true;
handler.admin = true;      // Requires user admin
handler.botAdmin = true;   // Requires bot admin

export default handler;