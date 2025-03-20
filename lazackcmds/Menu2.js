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
        if (!file.endsWith('.js')) continue; // Ensure only JavaScript files are processed
        const cmdPath = path.join(lazackpath, file);
        let cmdModule;

        try {
          cmdModule = await import(`file://${cmdPath}`);
        } catch (err) {
          console.error(`❌ Error loading command: ${file}`, err);
          continue;
        }

        if (cmdModule?.default?.command) {
          const cmd = cmdModule.default;
          const cmdNames = Array.isArray(cmd.command) ? cmd.command : [cmd.command];
          const tags = Array.isArray(cmd.tags) ? cmd.tags : ['Other'];

          for (const tag of tags) {
            if (!commandGroups[tag]) commandGroups[tag] = [];
            cmdNames.forEach(name => commandGroups[tag].push(`➤ *${name}*`)); // One command per line
          }
        }
      }
    } catch (err) {
      console.error("❌ Error reading commands:", err);
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

    let menuHeader = `
📌 *LAZACK-DEVICE*
👤 *User:* ${m.pushName || 'User'}
🕒 *Time:* ${sysInfo.timestamp}

📊 *System Info:*
⏱ *Uptime:* ${sysInfo.uptime}

🔍 *Available Commands:*`.trim();

    let sections = [];
    for (const [tag, commands] of Object.entries(commandGroups)) {
      sections.push(`\n✨ *${tag.toUpperCase()}* ✨\n${commands.join('\n')}`); // One by one under the tag
    }

    let fullMenu = menuHeader + (sections.length ? sections.join('\n') : "\n❌ No commands found!");

    if (fullMenu.length > 4096) {
      let parts = fullMenu.match(/.{1,4000}/gs); // Split long messages
      for (const part of parts) {
        await conn.sendMessage(m.chat, { text: part }, { quoted: m });
      }
    } else {
      await conn.sendMessage(m.chat, {
        image: { url: menuThumbnail },
        caption: fullMenu,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
        }
      }, { quoted: m });
    }

  } catch (error) {
    console.error("❌ Error in allmenu handler:", error);
  }
};

handler.help = ['allmenu'];
handler.tags = ['main'];
handler.command = ['allmenu'];

export default handler;
