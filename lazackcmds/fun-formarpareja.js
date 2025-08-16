const toM = (a) => '@' + a.split('@')[0];
function handler(m, {groupMetadata}) {
  const ps = groupMetadata.participants.map((v) => v.id);
  const a = ps.getRandom();
  let b;
  do b = ps.getRandom();
  while (b === a);
  m.reply(`*${toM(a)}, you should marry 💍 ${toM(b)}, you make a beautiful couple 💓*`, null, {
    mentions: [a, b],
  });
}
handler.help = ['makecouple'];
handler.tags = ['fun'];
handler.command = ['makecouple', 'makecouples'];
handler.group = true;
handler.register = true;

export default handler;