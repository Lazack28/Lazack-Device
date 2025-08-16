const handler = async (m, { conn, participants, groupMetadata, args }) => {
  // Get group profile picture or use a default image
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(() => null) || './src/catalogo.jpg';
  
  // Get group admins and owner
  const groupAdmins = participants.filter(p => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
  const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || `${m.chat.split('-')[0]}@s.whatsapp.net`;
  
  // Prepare the message
  const message = args.join(' ');
  const formattedMessage = `» ${message}`;
  
  const text = `『✦』Group Admins:\n\n${listAdmin}\n\n${emoji} Message: ${formattedMessage}\n\n『✦』Avoid misusing this command, or you risk being *removed* or *banned* from the Bot.`.trim();
  
  // Send the message with group image and mentions
  await conn.sendFile(
    m.chat,
    pp,
    'error.jpg',
    text,
    m,
    false,
    { mentions: [...groupAdmins.map(v => v.id), owner] }
  );
};

// Command metadata
handler.help = ['admins <text>'];
handler.tags = ['group'];
handler.customPrefix = /a|@/i; // Case-insensitive trigger for "a" or "@"
handler.command = /^(admins|@admins|dmins)$/i; // Supports variations like "@admins" or "dmins"
handler.group = true; // Only works in groups

export default handler;