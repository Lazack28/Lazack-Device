let handler = async (m, { conn, args, usedPrefix, command, isBotAdmin }) => {
  // Check if bot is an admin before proceeding
  if (!isBotAdmin) {
      return m.reply(`❌ *I need to be an admin to change group settings!*`);
  }

  // Determine action (open or close)
  let isClose = {
      open: 'not_announcement',
      close: 'announcement',
  }[args[0]?.toLowerCase()];

  // If the argument is invalid, show usage guide
  if (!isClose) {
      return m.reply(`
*⚠️ Choose an option:*
 📌 *${usedPrefix + command} open*  _(Allow everyone to send messages)_
 📌 *${usedPrefix + command} close*  _(Only admins can send messages)_
      `.trim());
  }

  // Execute the group setting update
  await conn.groupSettingUpdate(m.chat, isClose);

  // Send confirmation message
  let status = isClose === 'announcement' ? '🔒 *Group Closed!* Only admins can send messages now.' 
                                          : '🔓 *Group Opened!* Everyone can send messages now.';
  m.reply(status);
};

handler.help = ['group *open/close*'];
handler.tags = ['group'];
handler.command = ['group', 'grupo'];
handler.admin = true;
handler.botAdmin = true;

export default handler;
