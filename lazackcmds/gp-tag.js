
const handler = async (m, { isOwner, isAdmin, conn, participants, args, command, usedPrefix }) => {
  // Check if the used prefix is correct
  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  // Only allow admin or owner to use the command
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  // Initialize the message text to mention all participants
  let teks = `*List of All Participants* 🗣️\n\n`;

  // Loop through participants to add mentions
  for (const member of participants) {
    teks += `┊ @member.id.split('@')[0]`;
  

  // Send the message with all participant mentions
  conn.sendMessage(m.chat,  text: teks, mentions: participants.map((a) => a.id) );
;

handler.help = ['tagall'];
handler.tags = ['group'];
handler.command = /^(tagall)/i;
handler.admin = true;
handler.group = true;

export default handler;
