let fs = require('fs');

let handler = async (m, { text, usedPrefix, command }) => {

  if (!text) throw `uhm.. teksnya mana?\n\npenggunaan:\n${usedPrefix + command} <teks>\n\ncontoh:\n${usedPrefix + command} menu`;

  if (command === 'sfy') {

    if (!m.quoted.text) throw `balas pesan nya!`;

    let path = `yuhao/${text}.js`;

    await fs.writeFileSync(path, m.quoted.text);

    m.reply(`tersimpan di ${path}`);

  } else if (command === 'dfy') {

    let path = `yuhao/${text}.js`;

    if (!fs.existsSync(path)) throw `file plugin ${text}.js tidak ditemukan`;

    fs.unlinkSync(path);

    m.reply(`file plugin ${text}.js berhasil dihapus`);

  }

};

handler.help = ['sfy', 'dfy'].map(v => v + ' <teks>');

handler.tags = ['owner'];

handler.command = /^(sfy|dfy)$/i;

handler.rowner = true;

module.exports = handler;
