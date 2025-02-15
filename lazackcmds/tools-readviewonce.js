import { downloadContentFromMessage } from '@whiskeysockets/baileys';

var handler = async (m, { conn }) => {
  try {
    if (!m.quoted || !/viewOnce/.test(m.quoted.mtype)) {
      throw `✳️❇️ It's not a ViewOnce message.`;
    }
    
    let mtype = Object.keys(m.quoted.message)[0];
    let stream = await downloadContentFromMessage(m.quoted.message[mtype], mtype.replace('Message', ''));
    
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    
    let caption = m.quoted.message[mtype]?.caption || '';
    
    await conn.sendMessage(m.chat, { [mtype.replace(/Message/, '')]: buffer, caption }, { quoted: m });
  } catch (error) {
    console.error(error);
    throw '❌ An error occurred while processing the ViewOnce message.';
  }
};

handler.help = ['readvo'];
handler.tags = ['tools'];
handler.command = ['readviewonce', 'read', 'vv', 'readvo'];

export default handler;
