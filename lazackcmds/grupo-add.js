const handler = async (m, { conn, args, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `${emoji} Please enter the number you want to send a group invite to.`, m);
  if (text.includes('+')) return conn.reply(m.chat, `${emoji2} Enter the number without the *+* prefix.`, m);
  if (isNaN(text)) return conn.reply(m.chat, `${emoji2} Only numbers are allowed (no country code or spaces).`, m);

  const group = m.chat;
  const link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group);

  await conn.reply(
    `${text}@s.whatsapp.net`, 
    `${emoji} *GROUP INVITATION*\n\nA user has invited you to join this group:\n\n${link}`, 
    m, 
    { mentions: [m.sender] }
  );
  
  m.reply(`${emoji} The invitation link has been sent to the user.`);
};

handler.help = ['invite *<number>*'];
handler.tags = ['group'];
handler.command = ['add', 'invite', 'invitar'];
handler.group = true;
handler.admin = false;
handler.botAdmin = true;

export default handler;