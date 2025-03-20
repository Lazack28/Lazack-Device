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

    let commandGroups = {};
    
    try {
      const commandFiles = await readdir(lazackpath);
      
      for (const file of commandFiles) {
        const cmdPath = path.join(lazackpath, file);
        const cmdModule = await import(`file://${cmdPath}`).catch(() => null);
        
        if (cmdModule && cmdModule.default && cmdModule.default.command) {
          const cmd = cmdModule.default;
          const tags = cmd.tags || ['other'];
          
          for (const tag of tags) {
            if (!commandGroups[tag]) commandGroups[tag] = [];
            commandGroups[tag].push(`• *${cmd.command.join(', ')}*`);
          }
        }
      }
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

    let formattedMenu = `
╔════════════════════╗
║  *LAZACK-DEVICE*   
╠════════════════════╣
║ 👤 User: ${m.pushName || 'User'}
║ ⏳ Time: ${sysInfo.timestamp}
╠════════════════════╣
║ 📊 System Info:
║ ⏱ Uptime: ${sysInfo.uptime}
╠════════════════════╣
    `.trim();

    for (const [tag, commands] of Object.entries(commandGroups)) {
      formattedMenu += `\n╠══ ✨ *${tag.toUpperCase()}* ✨ ══\n║ ${commands.join('\n║ ')}`;
    }

    formattedMenu += `\n╠════════════════════╣\n║ 🔗 github.com/Lazack28\n╚════════════════════╝`;

    await conn.sendMessage(m.chat, {
      image: { url: menuThumbnail },
      caption: formattedMenu,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
      }
    }, { quoted: m });

  } catch (error) {
    console.error("Error in allmenu handler:", error);
  }
};

handler.help = ['allmenu'];
handler.tags = ['main'];
handler.command = ['allmenu', 'menu2'];

export default handler;
