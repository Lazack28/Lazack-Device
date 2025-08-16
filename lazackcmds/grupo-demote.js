const handler = async (m, { conn, usedPrefix, command, text }) => {
  // Validate input
  if (!text && !m.quoted) {
    return conn.reply(
      m.chat, 
      `${emoji} Please mention or reply to a user to demote them from admin.`,
      m
    );
  }

  // Extract user number
  let user;
  if (m.quoted) {
    user = m.quoted.sender;
  } else if (text.includes('@')) {
    user = `${text.split('@')[0]}@s.whatsapp.net`;
  } else if (!isNaN(text)) {
    user = `${text}@s.whatsapp.net`;
  } else if (m.mentionedJid && m.mentionedJid[0]) {
    user = m.mentionedJid[0];
  } else {
    return conn.reply(
      m.chat,
      `${emoji} Invalid format. Use:\n${usedPrefix}demote @user\nor reply to a message`,
      m
    );
  }

  // Validate number format
  const number = user.split('@')[0];
  if (number.length > 15 || number.length < 10) {
    return conn.reply(
      m.chat,
      `${emoji} Invalid phone number format.`,
      m
    );
  }

  try {
    // Demote user
    await conn.groupParticipantsUpdate(m.chat, [user], 'demote');
    await conn.reply(
      m.chat,
      `${emoji2} @${number} has been demoted from admin.`,
      m,
      { mentions: [user] }
    );
  } catch (error) {
    console.error('Demote error:', error);
    await conn.reply(
      m.chat,
      `${emoji2} Failed to demote user. I may need admin privileges.`,
      m
    );
  }
};

// Command configuration
handler.help = ['demote @user'];
handler.tags = ['group'];
handler.command = ['demote', 'degradar', 'quitaradmin'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;