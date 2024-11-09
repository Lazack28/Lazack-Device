const userLastMessageMap = new Map();

export async function all(m) {
  const ONE_DAY = 24 * 60 * 60 * 1000; 

  const currentTime = Date.now();
  const userId = m.sender;

  if (userLastMessageMap.has(userId)) {
    const lastMessageTime = userLastMessageMap.get(userId);
    if (currentTime - lastMessageTime < ONE_DAY) {
      return;
    }
  }

  const greetings = [
    'Hello',
    'Hi',
    'Mambo',
    'bro',
    'hello',
    'Hie',
    'hi',
    'Heey',
    'lazack'
  ];

  if (
    greetings.includes(m.text) &&
    !m.isBaileys &&
    !m.isGroup
  ) {
    this.sendButton(
      m.chat,
      `*WELCOME LAZACK ORGANISATION*      
    Hello 💕🥰 @${m.sender.split('@')[0]} 
    I may be offline or I may be slow to respond, but wait I will be back soon 😇\n\n\n *what we offer*\n\n1. Heroku credit cards\n2. Bot deployment works 24/7\n3. social media followers\n4. Web coding and bug fixing\n\n\n\n> use the buttons bellow to see me`.trim(),
      igfg,
      null,
      [['OWNER HELP', '.mrcs'], ['SCRIPT', '.repo']],
      m,
      { mentions: [m.sender] }
    );
    m.react('💕');

    userLastMessageMap.set(userId, currentTime);
  }

  return !0;
}
