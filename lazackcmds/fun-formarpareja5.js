let R = Math.random;
let Fl = Math.floor;
let toM = (a) => "@" + a.split("@")[0];
function handler(m, {groupMetadata}) {
  let ps = groupMetadata.participants.map((v) => v.id);
  let a = ps[Fl(R() * ps.length)];
  let b;
  do b = ps[Fl(R() * ps.length)];
  while (b === a);
  let c;
  do c = ps[Fl(R() * ps.length)];
  while (c === a || c === b);
  let d;
  do d = ps[Fl(R() * ps.length)];
  while (d === a || d === b || d === c);
  let e;
  do e = ps[Fl(R() * ps.length)];
  while (e === a || e === b || e === c || e === d);
  let f;
  do f = ps[Fl(R() * ps.length)];
  while (f === a || f === b || f === c || f === d || f === e);
  let g;
  do g = ps[Fl(R() * ps.length)];
  while (g === a || g === b || g === c || g === d || g === e || g === f);
  let h;
  do h = ps[Fl(R() * ps.length)];
  while (h === a || h === b || h === c || h === d || h === e || h === f || h === g);
  let i;
  do i = ps[Fl(R() * ps.length)];
  while (i === a || i === b || i === c || i === d || i === e || i === f || i === g || i === h);
  let j;
  do j = ps[Fl(R() * ps.length)];
  while (j === a || j === b || j === c || j === d || j === e || j === f || j === g || j === h || j === i);
  m.reply(
    `*😍_The 5 best couples in the group_😍*
    
*_1.- ${toM(a)} and ${toM(b)}_*
- This couple is destined to be together 💙

*_2.- ${toM(c)} and ${toM(d)}_*
- This couple are two little lovebirds in love ✨

*_3.- ${toM(e)} and ${toM(f)}_*
- Wow, what can I say about this couple, they should already have a family 🤱🧑‍🍼

*_4.- ${toM(g)} and ${toM(h)}_*
- These two already got married in secret 💍

*_5.- ${toM(i)} and ${toM(j)}_*
- This couple is on their honeymoon ✨🥵😍❤️*`,
    null,
    {
      mentions: [a, b, c, d, e, f, g, h, i, j],
    }
  );
}
handler.help = ["formcouple5"];
handler.tags = ["fun"];
handler.command = ["formcouple5"];
handler.register = true;
handler.group = true;

export default handler;