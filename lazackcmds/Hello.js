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
    await this.sendMessage(
      m.chat,
      {
        text: `*Hi*`.trim(),
      },
      { quoted: m }
    );

    // Update the last message time for the user
    userLastMessageMap.set(userId, currentTime);

    return true;
  }

  // Update the last message time for the user if the message is not a greeting
  userLastMessageMap.set(userId, currentTime);
}