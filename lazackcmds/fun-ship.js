var handler = async (m, { conn, command, text }) => {
  if (!text) return conn.reply(m.chat, 
    `${emoji} Please write your name and another person's name to calculate your love compatibility.`, 
    m
  );

  let [name1, ...name2] = text.split(' ');
  name2 = (name2 || []).join(' ');
  
  if (!name2) return conn.reply(m.chat, 
    `${emoji2} Please enter the second person's name.`, 
    m
  );

  const lovePercentage = Math.floor(Math.random() * 100);
  let loveMessage = `❤️ *${name1}* your chance of falling in love with *${name2}* is ${lovePercentage}% `;
  
  // Add fun emoji based on percentage
  if (lovePercentage < 30) {
    loveMessage += '💔 (Not meant to be)';
  } else if (lovePercentage < 70) {
    loveMessage += '💖 (There might be something!)';
  } else {
    loveMessage += '💘 (True love!)';
  }

  conn.reply(m.chat, loveMessage, m, { 
    mentions: conn.parseMention(loveMessage) 
  });
}

handler.help = ['ship <name1> <name2>', 'love <name1> <name2>'];
handler.tags = ['fun'];
handler.command = ['ship', 'love', 'pareja', 'lovematch'];
handler.group = true;
handler.register = true;

export default handler;