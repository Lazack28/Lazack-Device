
const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  const customEmoji = global.db.data.chats[m.chat]?.customEmoji || '🍫';
  m.react(customEmoji);

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  const message = args.join` `;
  const info = `*» MESSAGE :* ${message || 'No message provided.'}`;
  let caption = `*!  GENERAL MENTION  !*\n  *TO ${participants.length} MEMBERS* 🗣️\n\n ${info}\n\n╭  ┄ 𝅄 ۪꒰ \`⡞᪲=͟͟͞${botname} ≼᳞ׄ\` ꒱ ۟ 𝅄 ┄\n`;
  for (const member of participants) {
    caption += `┊${customEmoji} @${member.id.split('@')[0]}\n`;
  }
  caption += `╰⸼ ┄ ┄ ┄ ─  ꒰  ׅ୭ *${vs}* ୧ ׅ ꒱  ┄  ─ ┄ ⸼`;

  conn.sendMessage(m.chat, { text: caption, mentions: participants.map((a) => a.id) });
};

handler.help = ['tagall *<optional message>*'];
handler.tags = ['group'];
handler.command = ['tagall'];
handler.admin = true;
handler.group = true;

export default handler;
