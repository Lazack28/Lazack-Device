var handler = async (m, { conn, command, text }) => {
  if (!text) return conn.reply(m.chat, `${emoji} Please enter someone's name.`, m);

  let personality = `\`Name\` : ${text}
\`Good Morals\` : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}
\`Bad Morals\` : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}
\`Personality Type\` : ${pickRandom(['Kind-hearted','Arrogant','Stingy','Generous','Humble','Shy','Cowardly','Nosy','Sensitive','Non-binary lol', 'Dumbass'])}
\`Always\` : ${pickRandom(['Annoying','In a bad mood','Distracted','Bothersome','Gossipy','Jerking off','Shopping','Watching anime','Chatting on WhatsApp because they’re single','Lazy good-for-nothing','Womanizer','On their phone'])}
\`Intelligence\` : ${pickRandom(['9%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}
\`Stupidity\` : ${pickRandom(['9%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}
\`Laziness\` : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}
\`Anger\` : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}
\`Fear\` : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}
\`Fame\` : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}
\`Gender\` : ${pickRandom(['Male', 'Female', 'Gay', 'Bisexual', 'Pansexual', 'Feminist', 'Straight', 'Alpha Male', 'Player (Female)', 'Tomboy', 'Pansexual', 'PlayStationSexual', 'Mr. Handy', 'Dicksexual'])}`;

  conn.reply(m.chat, personality, m);
}

handler.help = ['personality'];
handler.tags = ['fun'];
handler.command = ['personality'];
handler.group = true;
handler.register = true;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}