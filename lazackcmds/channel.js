

import axios from 'axios';

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) {
    return conn.reply(m.chat, '🚩 provide a channel link boss\n\n`Example:`\n' + `> *${usedPrefix + command}* https://whatsapp.com/channel/`, m, rcanal);
  }
  await m.react('🕓');

  try {
    const url = `https://itzpire.com/stalk/whatsapp-channel?url=${encodeURIComponent(text)}`;
    const response = await axios.get(url);

    if (response.data && response.data.status === 'success') {
      const channelData = response.data.data;
      let txt = '`🌹  W H A T S A P P  -  C H A N N E L  -  I N F O`\n\n';
      txt += `    ✩  *Image* : ${channelData.img}\n`;
      txt += `    ✩  *Title* : ${channelData.title}\n`;
      txt += `    ✩  *followers* : ${channelData.followers}\n`;
      txt += `    ✩  *Description* : ${channelData.description}\n\n`;

      let imge = channelData.img;
      let title = channelData.title;

      await conn.sendMessage(m.chat, { image: { url: imge }, caption: txt }, { quoted: m });
      await m.react('✅');
    } else {
      await m.react('✖️');
      await conn.reply(m.chat, 'No information on this WhatsApp Channel.', m);
    }
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, 'error occured during searching aboyt the channel', m);
  }
}

handler.tags = ['info'];
handler.help = ['whatsappchannelinfo *<link>*'];
handler.command = ['channelstalk', 'chinfo'];
handler.register = true;

export default handler;