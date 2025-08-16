const handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, `❀ Please mention a user to check their test.`, m);
  const percentages = (500).getRandom();
  let emoji = '';
  let description = '';
  switch (command) {
    case 'gay':
      emoji = '🏳️‍🌈';
      if (percentages < 50) {
        description = `💙 The calculations show that ${text.toUpperCase()} is *${percentages}%* Gay ${emoji}\n> ✰ That's low, you're Joto, not Gay!`;
      } else if (percentages > 100) {
        description = `💜 The calculations show that ${text.toUpperCase()} is *${percentages}%* Gay ${emoji}\n> ✰ Even gayer than we thought!`;
      } else {
        description = `🖤 The calculations show that ${text.toUpperCase()} is *${percentages}%* Gay ${emoji}\n> ✰ You really are Gay.`;
      }
      break;
    case 'lesbiana':
      emoji = '🏳️‍🌈';
      if (percentages < 50) {
        description = `👻 The calculations show that ${text.toUpperCase()} is *${percentages}%* ${command} ${emoji}\n✰ Maybe you need more romantic movies in your life.`;
      } else if (percentages > 100) {
        description = `❣️ The calculations show that ${text.toUpperCase()} is *${percentages}%* ${command} ${emoji}\n> ✰ That's an extreme love for girls!`;
      } else {
        description = `💗 The calculations show that ${text.toUpperCase()} is *${percentages}%* ${command} ${emoji}\n> ✰ Keep the love blooming!`;
      }
      break;
    case 'pajero':
    case 'pajera':
      emoji = '😏💦';
      if (percentages < 50) {
        description = `🧡 The calculations show that ${text.toUpperCase()} is *${percentages}%* ${command} ${emoji}\n> ✰ Maybe you need more hobbies!`;
      } else if (percentages > 100) {
        description = `💕 The calculations show that ${text.toUpperCase()} is *${percentages}%* ${command} ${emoji}\n> ✰ That's admirable stamina!`;
      } else {
        description = `💞 The calculations show that ${text.toUpperCase()} is *${percentages}%* ${command} ${emoji}\n> ✰ Keep up the good (solo) work.`;
      }
      break;
    case 'puto':
    case 'puta':
      emoji = '🔥🥵';
      if (percentages < 50) {
        description = `😼 The calculations show that ${text.toUpperCase()} is *${percentages}%* ${command} ${emoji}\n> ✧ Better luck on your next conquest!`;
      } else if (percentages > 100) {
        description = `😻 The calculations show that ${text.toUpperCase()} is *${percentages}%* ${command}. ${emoji}\n> ✰ You're on fire!`;
      } else {
        description = `😺 The calculations show that ${text.toUpperCase()} is *${percentages}%* ${command} ${emoji}\n> ✰ Keep that fiery charm!`;
      }
      break;
    case 'manco':
    case 'manca':
      emoji = '💩';
      if (percentages < 50) {
        description = `🌟 The calculations show that ${text.toUpperCase()} is *${percentages}%* ${command} ${emoji}\n> ✰ You're not the only one in that club!`;
      } else if (percentages > 100) {
        description = `💌 The calculations show that ${text.toUpperCase()} is *${percentages}%* ${command} ${emoji}\n> ✰ You have a very special talent!`;
      } else {
        description = `🥷 The calculations show that ${text.toUpperCase()} is *${percentages}%* ${command} ${emoji}\n> ✰ Keep that brave attitude!`;
      }
      break;
    case 'rata':
      emoji = '🐁';
      if (percentages < 50) {
        description = `💥 The calculations show that ${text.toUpperCase()} is *${percentages}%* ${command} ${emoji}\n> ✰ Nothing wrong with enjoying cheese!`;
      } else if (percentages > 100) {
        description = `💖 The calculations show that ${text.toUpperCase()} is *${percentages}%* ${command} ${emoji}\n> ✰ A true luxury rat!`;
      } else {
        description = `👑 The calculations show that ${text.toUpperCase()} is *${percentages}%* ${command} ${emoji}\n> ✰ Eat cheese responsibly!`;
      }
      break;
    case 'prostituto':
    case 'prostituta':
      emoji = '🫦👅';
      if (percentages < 50) {
        description = `❀ The calculations show that ${text.toUpperCase()} is *${percentages}%* ${command} ${emoji}\n> ✰ The market is booming!`;
      } else if (percentages > 100) {
        description = `💖 The calculations show that ${text.toUpperCase()} is *${percentages}%* ${command} ${emoji}\n> ✰ A true professional!`;
      } else {
        description = `✨️ The calculations show that ${text.toUpperCase()} is *${percentages}%* ${command} ${emoji}\n> ✰ It's always business time!`;
      }
      break;
      default:
      m.reply(`🍭 Invalid command.`);
  }
  const responses = [
    "The universe has spoken.",
    "Scientists confirm it.",
    "Surprise!"
  ];
  const response = responses[Math.floor(Math.random() * responses.length)];
  const cal = `💫 *CALCULATOR*

${description}

➤ ${response}`.trim()  
  async function loading() {
var hawemod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%"
]
   let { key } = await conn.sendMessage(m.chat, {text: `🤍 Calculating Percentage!`, mentions: conn.parseMention(cal)}, {quoted: fkontak})
 for (let i = 0; i < hawemod.length; i++) {
   await new Promise(resolve => setTimeout(resolve, 1000)); 
   await conn.sendMessage(m.chat, {text: hawemod[i], edit: key, mentions: conn.parseMention(cal)}, {quoted: fkontak}); 
  }
  await conn.sendMessage(m.chat, {text: cal, edit: key, mentions: conn.parseMention(cal)}, {quoted: fkontak});         
 }
loading()    
};
handler.help = ['gay <@tag> | <name>', 'lesbiana <@tag> | <name>', 'pajero <@tag> | <name>', 'pajera <@tag> | <name>', 'puto <@tag> | <name>', 'puta <@tag> | <name>', 'manco <@tag> | <name>', 'manca <@tag> | <name>', 'rata <@tag> | <name>', 'prostituta <@tag> | <name>', 'prostituto <@tag> | <name>'];
handler.tags = ['fun'];
handler.register = true;
handler.group = true;
handler.command = ['gay', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 'manco', 'manca', 'rata', 'prostituta', 'prostituto'];

export default handler;
