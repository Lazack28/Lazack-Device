let handler = async (m, { conn, text, participants, groupMetadata }) => {
  let users = participants.map(u => u.id).filter(v => v !== conn.user.jid); // Exclude bot itself

  if (users.length === 0) return m.reply(`❌ *No members found to mention!*`);

  let message = `📢 *Group Broadcast* 📢\n\n`;
  message += `🏷 *Group:* ${groupMetadata.subject}\n👥 *Members:* ${participants.length}\n`;
  if (text) message += `📝 *Message:* ${text}\n`;
  message += `\n🔹 *MENTION LIST* 🔹\n${users.map(v => `▢ @${v.split('@')[0]}`).join('\n')}`;

  m.reply(message, null, { mentions: users });
};

handler.help = ['tagall'];
handler.tags = ['group'];
handler.command = ['tagall'];
handler.admin = true;
handler.group = true;

export default handler;
