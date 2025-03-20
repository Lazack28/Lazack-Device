import { cpus as _cpus, totalmem, freemem } from 'os';
import util from 'util';
import { performance } from 'perf_hooks';
import { sizeFormatter } from 'human-readable';

let format = sizeFormatter({
  std: 'JEDEC',
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
});

let handler = async (m, { conn }) => {
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats);
  const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'));

  const used = process.memoryUsage();
  const cpus = _cpus().map(cpu => ({
    ...cpu,
    total: Object.values(cpu.times).reduce((sum, time) => sum + time, 0),
  }));

  const cpu = cpus.reduce(
    (acc, cpu, _, { length }) => ({
      total: acc.total + cpu.total,
      speed: acc.speed + cpu.speed / length,
      times: {
        user: acc.times.user + cpu.times.user,
        nice: acc.times.nice + cpu.times.nice,
        sys: acc.times.sys + cpu.times.sys,
        idle: acc.times.idle + cpu.times.idle,
        irq: acc.times.irq + cpu.times.irq,
      },
    }),
    { speed: 0, total: 0, times: { user: 0, nice: 0, sys: 0, idle: 0, irq: 0 } }
  );

  let old = performance.now();
  let neww = performance.now();
  let speed = neww - old;

  let who = m.quoted
    ? m.quoted.sender
    : m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.fromMe
    ? conn.user.jid
    : m.sender;

  if (!(who in global.db.data.users)) throw `⚠️ The user is not found in my database`;

  let pp = await conn.profilePictureUrl(who, 'image').catch(() => './media/shizo.jpg');
  let user = global.db.data.users[who];

  let infobt = `
≡ *🤖 BOT INFORMATION*

📌 *STATE*
- ${groupsIn.length} Group Chats
- ${groupsIn.length} Active Groups
- ${groupsIn.length - groupsIn.length} Abandoned Groups
- ${chats.length - groupsIn.length} Private Chats
- ${chats.length} Total Chats

📌 *OWNER*
- Instagram: [Lazack_28](https://instagram.com/Lazack_28)
- GitHub: [Lazack28](https://github.com/Lazack28)
- YouTube: [Lazack28](https://youtube.com/@Lazack28)
- Credits: *Mr. Oreo*

📌 *SERVER STATUS*
- 🛑 RAM Usage: ${format(totalmem() - freemem())} / ${format(totalmem())}
- 🔵 Free RAM: ${format(freemem())}

📌 *Node.js Memory Usage*
\`\`\`
${Object.keys(used)
  .map(key => `${key.padEnd(12, ' ')}: ${format(used[key])}`)
  .join('\n')}
\`\`\`
  `;

  conn.sendFile(m.chat, pp, 'profile.jpg', infobt, m, false, { mentions: [who] });
  m.react('✅');
};

handler.help = ['info'];
handler.tags = ['main'];
handler.command = ['info', 'infobot', 'botinfo'];

export default handler;
