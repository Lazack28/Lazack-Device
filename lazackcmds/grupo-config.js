const handler = async (m, { conn, args, usedPrefix, command }) => {
  // Get group profile picture or use default icon
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(() => icono);

  // Group setting options mapping
  const groupSettings = {
    'open': 'not_announcement',
    'close': 'announcement',
    'abierto': 'not_announcement',
    'cerrado': 'announcement',
    'abrir': 'not_announcement',
    'cerrar': 'announcement'
  };

  // Validate input
  const setting = args[0]?.toLowerCase();
  const isClose = groupSettings[setting];
  
  if (!isClose) {
    const helpMessage = `${emoji} *Choose an option to configure the group*\n\n` +
                       `Examples:\n` +
                       `✰ *${usedPrefix}${command} abrir*\n` +
                       `✰ *${usedPrefix}${command} cerrar*\n` +
                       `✰ *${usedPrefix}${command} close*\n` +
                       `✰ *${usedPrefix}${command} open*`;
    return conn.reply(m.chat, helpMessage, m);
  }

  // Update group setting
  await conn.groupSettingUpdate(m.chat, isClose);

  // Send confirmation message
  const statusMessage = isClose === 'not_announcement' 
    ? `${emoji} *Everyone can now send messages in this group.*`
    : `${emoji2} *Only admins can send messages in this group.*`;
  
  m.reply(statusMessage);
};

// Command configuration
handler.help = ['group open/close', 'grupo abrir/cerrar'];
handler.tags = ['group'];
handler.command = ['group', 'grupo'];
handler.admin = true;       // Only admins can use
handler.botAdmin = true;   // Bot needs admin privileges

export default handler;