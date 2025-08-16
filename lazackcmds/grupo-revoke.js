const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    // Verify group and permissions
    if (!m.isGroup) {
      return conn.reply(m.chat, '⚠️ This command only works in groups', m);
    }

    // Reset group invite link
    await conn.groupRevokeInvite(m.chat);
    
    // Get new invite link
    const newInviteCode = await conn.groupInviteCode(m.chat);
    const newLink = `https://chat.whatsapp.com/${newInviteCode}`;

    // Send confirmation to requester
    await conn.reply(
      m.sender,
      `🔗 *New Group Invite Link:*\n${newLink}\n\n` +
      `✅ Previous link has been revoked`,
      m
    );

    // Notify group (optional)
    await conn.reply(
      m.chat,
      `📢 Group invite link has been reset by @${m.sender.split('@')[0]}`,
      m,
      { mentions: [m.sender] }
    );

  } catch (error) {
    console.error('Revoke error:', error);
    
    const errorMessages = {
      '401': '❌ I need admin rights to reset the invite link',
      '404': '❌ Group not found',
      'default': `⚠️ Failed to reset link: ${error.message}`
    };
    
    await conn.reply(
      m.chat,
      errorMessages[error.statusCode] || errorMessages.default,
      m
    );
  }
};

// Command configuration
handler.help = ['revoke'];
handler.tags = ['group'];
handler.command = ['revoke', 'resetlink', 'restablecer'];
handler.group = true;
handler.admin = true;      // Requires user admin
handler.botAdmin = true;   // Requires bot admin

export default handler;