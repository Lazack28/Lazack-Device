import fs from 'fs';
import path from 'path';
import os from 'os';
import moment from 'moment-timezone';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);

let handler = async (m, { conn }) => {
  try {
    const menuThumbnail = 'https://i.imgur.com/r4TueFV.jpeg';

    const lazackpath = './lazackcmds';
    let commandList = 'No commands found';
    
    try {
      const commands = await readdir(lazackpath);
      commandList = commands
        .map((cmd, idx) => `${idx + 1}. ${path.parse(cmd).name}`)
        .join('\n');
    } catch (err) {
      console.error("Error reading commands:", err);
    }

    const sysInfo = {
      totalRAM: `${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB`,
      usedRAM: `${((os.totalmem() - os.freemem()) / (1024 ** 3)).toFixed(2)} GB`,
      uptime: moment.duration(os.uptime(), 'seconds').humanize(),
      timestamp: moment.tz('Africa/Nairobi').format('ddd DD/MM/YY HH:mm:ss'),
      platform: `${os.platform()} ${os.arch()}`,
      version: '2.1.0',
      developer: '@lazack',
    };

    const menu = `
╔════════════════════╗
║  *LAZACK-DEVICE*   ║
╠════════════════════╣
║ 👤 User: ${m.pushName || 'User'}
║ ⏳ Time: ${sysInfo.timestamp}
╠════════════════════╣
║ 📊 System Info:
║ ⏱ Uptime: ${sysInfo.uptime}
╠════════════════════╣
║ 📜 Available Commands:
║ ${commandList}
╠════════════════════╣
║ 🔗 github.com/Lazack28
╚════════════════════╝
    `.trim();

    await conn.sendMessage(m.chat, {
      image: { url: menuThumbnail },
      caption: menu,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
      }
    }, { quoted: m });

  } catch (error) {
    console.error("Error in menu handler:", error);
  }
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu'];

export default handler;
