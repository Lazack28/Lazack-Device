const fetch = require("node-fetch");

async function handler(m, {
text,
usedPrefix,
command
}) {
 const ress = await fetch(`https://peristiwa.vercel.app/`);
 const res = await ress.json();
 let cap = ` ${sa}${kki} *PERISTIWA* ${kka}
 ${gz} *Peringatan*: ${res.event.Peringatan}, ${res.event.Tersisa}
 ${gz} *Tanggal*: ${res.event.tanggal}
 ${gz}
 ${gz} ${res.date}
 ${sb}`
m.reply(cap)
}

handler.command = handler.help = ['pristiwa']
handler.tags = ['internet']

module.exports = handler