var handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `${emoji} Please enter a question.`, m);

  // Fun question reaction sequence
  await m.react('❔');
  await delay(1000);
  await m.react('❓');
  await delay(1000);
  await m.react('❔');
  await delay(1000);

  const responses = [
    'Yes',
    'Maybe yes',
    'Possibly',
    'Probably not',
    'No',
    'Impossible',
    'Why are you asking these questions?',
    'That\'s why I\'m leaving you',
    'Why do you want to know?',
    'I won\'t tell you the answer',
    'Ask again later',
    'Signs point to yes',
    'Don\'t count on it',
    'Without a doubt',
    'My sources say no',
    'Most likely',
    'Cannot predict now'
  ];

  const response = responses[Math.floor(Math.random() * responses.length)];
  
  await conn.reply(m.chat, 
    `${dev}\n\n` +
    `• *Question:* ${text}\n` +
    `• *Answer:* ${response}`, 
    m
  );
}

handler.help = ['question <text>'];
handler.tags = ['fun'];
handler.command = ['question', 'ask', '8ball'];
handler.group = true;
handler.register = true;

export default handler;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));