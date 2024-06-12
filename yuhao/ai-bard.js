const fetch = require("node-fetch");

async function handler(m, {
text,
usedPrefix,
command
}) {
 if (!text) {
 return m.reply(`Masukkan Pertanyaannya`);
 }
 const { key } = await conn.sendMessage(m.chat, { text: "```Mencari jawaban...```" }, { quoted: m})
 
 const ress = await fetch(`https://aemt.me/bard?text=${text}`);
 const res = await ress.json();
 const arr = [
  `${res.result}`
]
   
for (let i = 0; i < arr.length; i++) {
  await conn.sendMessage(m.chat, { text: arr[i], edit: key })
}
}

handler.command = handler.help = ['bard']
handler.tags = ['ai']
handler.limit = true

module.exports = handler