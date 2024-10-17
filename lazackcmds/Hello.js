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
    'Niaje',
    'Oy'
  ];

  if (
    greetings.includes(m.text) &&
    !m.isBaileys &&
    !m.isGroup
  ) {
    this.sendButton(
      m.chat,
      `*WELCOME ITS LAZACK ASSISTANT BOT REPLYING HERE*\n\n      
    Hello 💕🥰 @${m.sender.split('@')[0]}\n\n 
    Lazack organisation offers different things and you are kindly welcome.. the following are what we offer:-\n\n1. Heroku card price 3000/ shillings\n2. Bot deployment price 2500/- shillings\n3. Halotel bundles, weekly and monthly bundles start price is 3000/- shillings\n4. Social media boosting\n5. Bot coding and editing price dm\n\n> offer only in Tanzania\n\nUSE BUTTON TO FIND OWNER`.trim(),
      igfg,
      null,
      [['GET OFFER', '.owner'], ['GROUPS', '.grp']],
      m,
      { mentions: [m.sender] }
    );
    m.react('💕');

    userLastMessageMap.set(userId, currentTime);
  }

  return !0;
}