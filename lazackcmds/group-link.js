var handler = async (m, { conn }) => {
  let group = m.chat;
  let code = await conn.groupInviteCode(group);
  let link = 'https://chat.whatsapp.com/' + code;

  let text = `╭─❍ *Group Invite Link*\n│\n│ ${link}\n╰───────────────✦`;

  const buttons = [
    { buttonId: `.link`, buttonText: { displayText: '🔗 Copy Link' }, type: 1 },
    { buttonId: link, buttonText: { displayText: '📤 Share Group' }, type: 1 }
  ];

  const buttonMessage = {
    text,
    footer: 'Lazack Organisation | WhatsApp Group',
    buttons,
    headerType: 1
  };

  await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
};

handler.help = ['link'];
handler.tags = ['group'];
handler.command = ['link'];
handler.group = true;
handler.botAdmin = true;

export default handler;
