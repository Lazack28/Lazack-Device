import qrcode from 'qrcode';
import fs from 'fs';
import path from 'path';

const toqr = async (m, gss) => {
  try {
    const botNumber = await gss.decodeJid(gss.user.id);
    const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();

    const validCommands = ['toqr'];

    if (!validCommands.includes(cmd)) return;

    if (!text) return m.reply('Please include link or text!');

    let qyuer = await qrcode.toDataURL(text, { scale: 35 });
    let data = Buffer.from(qyuer.replace('data:image/png;base64,', ''), 'base64');
    let buff = `${Date.now()}.jpg`;

    await fs.writeFileSync(path.join('./', buff), data);
    let medi = fs.readFileSync(path.join('./', buff));

    await gss.sendMessage(m.from, {
      image: medi,
      caption: 'QR code generated successfully!\n\n> ©ʀᴇᴅ-ꜰᴏx-ᴍᴅ'
    }, {
      quoted: m
    });

    setTimeout(() => {
      fs.unlinkSync(path.join('./', buff));
    }, 10000);
  } catch (error) {
    console.error('Error:', error);
    m.reply('An error occurred while generating the QR code.');
  }
};

export default toqr;
