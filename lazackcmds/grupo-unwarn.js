const handler = async (m, { conn, text, command, usedPrefix, isAdmin, isBotAdmin }) => {
  // Validate permissions
  if (!isAdmin) {
    return conn.reply(
      m.chat,
      `🔒 You need admin privileges to remove warnings`,
      m
    );
  }
  if (!isBotAdmin) {
    return conn.reply(
      m.chat,
      `🤖 I need admin rights to manage warnings`,
      m
    );
  }

  // Determine target user
  let who;
  if (m.isGroup) {
    who = m.mentionedJid[0] || 
         (m.quoted ? m.quoted.sender : text);
  } else {
    who = m.chat;
  }

  // Validate user input
  if (!who) {
    const example = `Example: *${usedPrefix}${command} @${global.suittag}*`;
    return conn.reply(
      m.chat,
      `${emoji} Please tag a user to remove their warning\n\n${example}`,
      m,
      { mentions: conn.parseMention(example) }
    );
  }

  // Check if trying to unwarn the bot
  if (who === conn.user.jid) {
    return conn.reply(
      m.chat,
      `${emoji2} I can't warn myself!`,
      m
    );
  }

  // Get user data
  const user = global.db.data.users[who] || { warn: 0 };

  // Check if user has warnings
  if (user.warn <= 0) {
    return conn.reply(
      m.chat,
      `${emoji2} @${who.split('@')[0]} has no warnings to remove`,
      m,
      { mentions: [who] }
    );
  }

  // Remove warning
  user.warn = Math.max(0, user.warn - 1); // Ensure doesn't go below 0

  // Send confirmation
  const status = user.warn === 1 
    ? `⚠️ @${who.split('@')[0]} has 1 warning left` 
    : `✅ Warning removed from @${who.split('@')[0]}`;

  await conn.reply(
    m.chat,
    `${status}\nCurrent warnings: *${user.warn}/3*`,
    m,
    { mentions: [who] }
  );
};

// Command configuration
handler.help = ['unwarn @user'];
handler.tags = ['group', 'moderation'];
handler.command = ['unwarn', 'delwarn', 'removewarn'];
handler.group = true;
handler.admin = true;      // Requires user admin
handler.botAdmin = true;   // Requires bot admin

export default handler;