const Secktor = require('../lib');

Secktor.cmd({
    pattern: "ping",
    desc: "To check ping",
    category: "general",
    filename: __filename,
  },
  const startTime = new Date();
    const { key } = await void.sendMessage(m.from, { text: '*_Pinging..._*' }, { quoted: m });
    await m.React('🚀');

    const text = `*_🔥⃝вσт ѕρєє∂: ${new Date() - startTime} ms_*`;
    await typeWriterEffect(m, sock, key, text);

    await m.React('⚡');
  }
}

const typeWriterEffect = async (m, sock, key, message) => {
  const typingSpeed = 300;
  const words = message.split(' ');
  let i = 0;

  const typewriterInterval = setInterval(() => {
    if (i < words.length) {
      const typedText = words.slice(0, i + 1).join(' ');
      void.relayMessage(m.from, {
        protocolMessage: {
          key: key,
          type: 14,
          editedMessage: {
            conversation: typedText,
          },
        },
      }, {});
      i++;
    } else {
      clearInterval(typewriterInterval); 
    }
  }, typingSpeed);
}
