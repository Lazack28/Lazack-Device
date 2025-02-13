
const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  const customEmoji = global.db.data.chats[m.chat]?.customEmoji || '🤍';
  m.react(customEmoji);

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  const message = args.join` `;
  const info = `*» INFO :* message`;
  let teks = `*!  GENERAL MENTION  !*  *FOR{participants.length} MEMBERS* 🗣️\n\n info╭  ┄ 𝅄  ۪꒰ LAZACK - TEAM ꒱  ۟  𝅄 ┄`;

  // Loop through participants to add mentions
  for (const member of participants) 
    teks += `┊{customEmoji} @member.id.split('@')[0]`;
  

  teks += `╰⸼ ┄ ┄ ┄ ─  ꒰  ׅ୭ *{vs}* ୧ ׅ ꒱  ┄  ─ ┄ ⸼`;

  // Send the message with all mentions
  conn.sendMessage(m.chat, { text: teks, mentions: participants.map((a) => a.id) });
};

handler.help = ['todos <message>'];
handler.tags = ['group'];
handler.command = /^(tagall|Z)$/i;
handler.admin = true;
handler.group = true;

export default handler;
