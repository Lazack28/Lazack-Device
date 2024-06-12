const fetch = require('node-fetch');
const uploadImage = require('../lib/uploadImage.js');
const api = require('betabotz-tools');

async function handler(m, { conn, usedPrefix, command }) {
  try {
 await conn.sendMessage(m.chat, { react: { text: `🚀`, key: m.key, }})
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/^image/.test(mime) && !/webp/.test(mime)) {
      const img = await q.download();
      const out = await uploadImage(img);
       const image = await api.toanime(`${out}`);
       conn.sendFile(m.chat, image.image_data, null, '🖼️ Size: ' + image.image_size, m);
    } else {
      m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim.`);
    }
  } catch (e) {
    console.error(e);
    m.reply(`Identifikasi gagal. Silakan coba lagi.`);
  }
}

handler.help = ['toanime', 'jadianime'];
handler.tags = ['tools'];
handler.command = ['toanime', 'jadianime'];
handler.premium = false;
handler.limit = true;

module.exports = handler;