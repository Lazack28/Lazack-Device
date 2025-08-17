import moment from 'moment-timezone';

// Enhanced tags mapping with emojis and colors
const tagsMap = {
  main: '💗 Information',
  jadibot: '🌟 Sub Bot',
  downloader: '📥 Downloads',
  game: '🎮 Games',
  gacha: '🎲 Gacha RPG',
  rg: '🔰 Registration',
  group: '👥 Groups',
  nable: '🎛️ Features',
  nsfw: '🔞 NSFW +18',
  buscadores: '🔎 Search Tools',
  sticker: '🌈 Stickers',
  econ: '💰 Economy',
  convertidor: '🌀 Converters',
  logo: '🎀 Logo Generator',
  tools: '🧰 Tools',
  randow: '🎁 Random',
  efec: '🎶 Audio Effects',
  owner: '👑 Creator'
};

// Color palette for the menu
const colors = {
  header: '#FF6B9E',
  section: '#9D65FF',
  command: '#6BB9FF',
  footer: '#FFB56B'
};

let handler = async (m, { conn }) => {
  const userId = m.mentionedJid?.[0] || m.sender;
  const user = global.db.data.users[userId] || {};
  const name = await conn.getName(userId);
  const botname = conn.user?.name || 'LazackDevice 🌸';
  const fecha = moment.tz('Africa/Nairobi').format('DD/MM/YYYY');
  const hora = moment.tz('Africa/Nairobi').format('HH:mm:ss');
  const uptime = clockString(process.uptime() * 1000);
  const totalreg = Object.keys(global.db.data.users).length;
  const limit = user.limite || 0;

  const botTag = conn.user?.jid?.split('@')[0] || 'bot';
  const botOfc = conn.user?.id === global.conn?.user?.id
    ? `🌐 *Official Bot:* wa.me/${botTag}`
    : `🔗 *Sub Bot of:* wa.me/${global.conn?.user?.jid?.split('@')[0]}`;

  // Group commands by tags
  const grouped = {};
  const plugins = Object.values(global.plugins).filter(p => !p.disabled);

  for (const plugin of plugins) {
    const cmds = Array.isArray(plugin.command) ? plugin.command : [plugin.command];
    if (!cmds) continue;
    const tagList = Array.isArray(plugin.tags) ? plugin.tags : [];
    const tag = tagList[0] || '__others__';
    if (!grouped[tag]) grouped[tag] = [];
    for (const cmd of cmds) {
      if (typeof cmd !== 'string') continue;
      grouped[tag].push(cmd);
    }
  }

  // Generate the menu text with better formatting
  let text = `
╭─◇ *${botname.toUpperCase()}* ◇─╮ 
│ � *User:* ${name}
│ 🏷 *Limit:* ${limit}
│ 📅 *Date:* ${fecha}
│ ⏱ *Time:* ${hora}
│ ⏳ *Uptime:* ${uptime}
│ 👥 *Users:* ${totalreg} 
│ ${botOfc}
╰──────────────╯
`.trim();

  // Add commands sections with better organization
  for (const tag of Object.keys(grouped).sort()) {
    const section = tagsMap[tag] || '📚 Other Commands';
    text += `\n╭─── *${section}* ───╮\n`;
    
    // Organize commands in columns (2 columns)
    const commands = grouped[tag];
    const half = Math.ceil(commands.length / 2);
    const leftCol = commands.slice(0, half);
    const rightCol = commands.slice(half);
    
    const maxLength = Math.max(leftCol.length, rightCol.length);
    
    for (let i = 0; i < maxLength; i++) {
      const leftCmd = leftCol[i] ? `• ${leftCol[i].padEnd(15)}` : ''.padEnd(18);
      const rightCmd = rightCol[i] ? `• ${rightCol[i]}` : '';
      text += `│ ${leftCmd} ${rightCmd}\n`;
    }
    
    text += `╰─────────────────────╯`;
  }

  // Footer with additional information
  text += `\n\n✨ *Type .cmdname to use a command* ✨`;
  text += `\n🔍 *Example:* .sticker (to create stickers)`;
  text += `\n\n🌸 *Thank you for using ${botname}!*`;

  // Channel information
  let channelRD = {
    id: '120363321705798318@newsletter',
    name: 'LazackOrganisation',
  };

  // Media assets
  let banner = 'https://lazackorganisation.my.id/mtaju.jpg';
  let redes = 'https://lazackorganisation.my.id';
  let textbot = `🌸 Thank you for using *${botname}*, ${name}!\n🔔 Follow our official channel and support on GitHub.`;

  // Send the enhanced menu
  await conn.sendMessage(m.chat, {
    text: text.trim(),
    contextInfo: {
      mentionedJid: [m.sender, userId],
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        newsletterName: channelRD.name,
        serverMessageId: -1,
      },
      forwardingScore: 999,
      externalAdReply: {
        title: `${botname} Command Menu`,
        body: `Available commands for ${name}`,
        thumbnailUrl: banner,
        sourceUrl: redes,
        mediaType: 1,
        showAdAttribution: false,
        renderLargerThumbnail: true,
      },
    }
  }, { quoted: m });
};

handler.help = ['menu', 'help', 'commands'];
handler.tags = ['main'];
handler.command = ['menu', 'help', 'cmd', 'commands'];
export default handler;

// Helper function for uptime display
function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor((ms % 3600000) / 60000);
  let s = Math.floor((ms % 60000) / 1000);
  return [h > 0 ? `${h}h` : '', m > 0 ? `${m}m` : '', s > 0 ? `${s}s` : ''].filter(Boolean).join(' ') || '0s';
}