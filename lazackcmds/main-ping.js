import { exec } from 'child_process';
import speed from 'performance-now';

let handler = async (m, { conn }) => {
  let thumbnail = 'https://home.lazackorganisation.my.id/img/img1.png';
  
  let fgg = {
    key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' },
    message: {
      contactMessage: {
        displayName: `Lazack MD`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;Lazack MD;;;\nFN:Lazack MD\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
  };

  let timestamp = speed();
  let pingMsg = await conn.sendMessage(m.chat, { text: '*🔄 Checking ping...*' }, { quoted: fgg });

  exec('uptime', async (error, stdout) => {
    let latency = (speed() - timestamp).toFixed(2);

    if (error) {
      return conn.sendMessage(m.chat, { text: `⚠️ *Error checking ping!*

${error.message}` }, { quoted: pingMsg });
    }

    let result = `🟢 *Lazack 28 Ping*

📡 *Speed:* ${latency} ms
🚀 *Server Uptime:* ${stdout.trim()}`;
    
    await conn.relayMessage(
      m.chat,
      {
        protocolMessage: {
          key: pingMsg.key,
          type: 14,
          editedMessage: { conversation: result },
        },
      },
      {}
    );
  });
};

handler.help = ['ping'];
handler.tags = ['main'];
handler.command = ['ping', 'speed'];

export default handler;
