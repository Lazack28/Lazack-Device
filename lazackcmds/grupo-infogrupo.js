const handler = async (m, { conn, participants, groupMetadata }) => {
  // Get group profile picture or default icon
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(() => global.icono);
  
  // Get group settings from database
  const {
    antiLink, detect, welcome, modoadmin,
    autoRechazar, nsfw, autoAceptar, 
    reaction, isBanned, antifake
  } = global.db.data.chats[m.chat] || {};

  // Prepare admin list
  const groupAdmins = participants.filter(p => p.admin);
  const listAdmin = groupAdmins
    .map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`)
    .join('\n');

  // Identify group owner
  const owner = groupMetadata.owner || 
    groupAdmins.find(p => p.admin === 'superadmin')?.id || 
    `${m.chat.split('-')[0]}@s.whatsapp.net`;

  // Format group information
  const text = `*✦ GROUP INFORMATION ✦*

❀ *ID:* ${groupMetadata.id}
⚘ *Name:* ${groupMetadata.subject}
❖ *Members:* ${participants.length} participants
✰ *Creator:* @${owner.split('@')[0]}
✥ *Admins (${groupAdmins.length}):*
${listAdmin}

*⚙️ GROUP SETTINGS*

◈ *Bot Status:* ${isBanned ? '❌ Disabled' : '✅ Enabled'} 
◈ *Welcome:* ${welcome ? '✅ On' : '❌ Off'}
◈ *Detect:* ${detect ? '✅ On' : '❌ Off'}  
◈ *Anti-Link:* ${antiLink ? '✅ On' : '❌ Off'} 
◈ *Auto-Accept:* ${autoAceptar ? '✅ On' : '❌ Off'}
◈ *Auto-Reject:* ${autoRechazar ? '✅ On' : '❌ Off'}
◈ *NSFW:* ${nsfw ? '✅ On' : '❌ Off'}
◈ *Admin Mode:* ${modoadmin ? '✅ On' : '❌ Off'}
◈ *Reactions:* ${reaction ? '✅ On' : '❌ Off'}
◈ *Anti-Fake:* ${antifake ? '✅ On' : '❌ Off'}

*📝 Description:*
${groupMetadata.desc?.toString() || 'No description'}`.trim();

  // Send message with group info
  await conn.sendFile(
    m.chat,
    pp,
    'group.jpg',
    text,
    m,
    false,
    { mentions: [...groupAdmins.map(v => v.id), owner] }
  );
};

// Command configuration
handler.help = ['groupinfo'];
handler.tags = ['group'];
handler.command = ['groupinfo', 'ginfo', 'infogroup', 'gpinfo'];
handler.group = true;
handler.register = true;

export default handler;