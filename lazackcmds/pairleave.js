let handler = async (m, { conn, args }) => {
  const isSocketOwner = [
    conn.user.jid,
    ...(global.owner || []).map(n => n + '@s.whatsapp.net'),
  ].includes(m.sender);

  if (!isSocketOwner) {
    return m.reply('🕸 Only the socket owner can use this command.');
  }

  const groupId = args[0] || m.chat;

  try {
    // await conn.sendMessage(m.chat, { text: `🐼 The bot says goodbye.` }, { quoted: m });
    await conn.groupLeave(groupId);
  } catch (error) {
    console.error(error);
    m.reply('🕸 Could not leave the group. Please try again.');
  }
};

handler.help = ['leave'];
handler.tags = ['pairbot'];
handler.command = ['leave'];

export default handler;
