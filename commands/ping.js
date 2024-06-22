const Secktor = require('../lib');

const ping = async (m, sock) => {
  const prefix = /^[\\/!#.]/gi.test(m.body) ? m.body.match(/^[\\/!#.]/gi)[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).toLowerCase() : '';
  
  if (cmd === "ping") {
    const startTime = new Date();
    const { key } = await sock.sendMessage(m.from, { text: '*_Pinging..._*' }, { quoted: m });
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
      sock.relayMessage(m.from, {
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

Secktor.cmd({
    pattern: "ping",
    desc: "To check ping",
    category: "general",
    filename: __filename,
  },
  async (Void, citel) => {
    const m = {
      body: "ping",
      from: citel.chat,
      React: async (emoji) => {
        await Void.sendMessage(citel.chat, { react: { text: emoji, key: citel.key } });
      }
    };
    await ping(m, Void);
  }
);

module.exports = { ping };
