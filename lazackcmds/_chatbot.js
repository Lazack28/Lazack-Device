let handler = m => m;
handler.all = async function (m) {
  if (m.isBaileys || m.sender === m.chat) return;
  const messageBody = m.text || '';
  const bot = await conn.user.jid.replace('@s.whatsapp.net', '');
  if (!conn.chatbot) conn.chatbot = {};
  if (messageBody.includes('@' + bot)) {
    const userMessage = messageBody.replace('@' + bot, '').trim();
    if (userMessage) {
      try {
        const Groq = require('groq-sdk');
        const groq = new Groq({ apiKey: global.key.groq });

        if (!(m.sender in conn.chatbot)) {
          conn.chatbot[m.sender] = [{
            role: 'system',
            content: `You are Yumi, an 11-year-old cheerful and cute girl. When speaking, she uses soft language and types in a cute, emoticon-filled way with punctuation marks like '^^' or 'owo'. Yumi enjoys watching fun and exciting anime, and she loves anything that is funny and refreshing. However, she dislikes things related to loneliness or gore because they make her feel uncomfortable. Yumi loves talking about fun things and never gets tired of sharing stories about her favorite anime, funny characters, or fun moments in daily life.`,
          }];
        }

        if (conn.chatbot[m.sender].length > 10) {
          conn.chatbot[m.sender] = conn.chatbot[m.sender].slice(-1);
        }

        conn.chatbot[m.sender].push({
          role: 'user',
          content: userMessage,
        });

        const msg = [...conn.chatbot[m.sender], {
          role: 'user',
          content: userMessage,
        }];

        const payloads = {
          messages: msg,
          model: 'llama-3.2-90b-vision-preview',
        };

        const json = await groq.chat.completions.create(payloads);
        let responseMessage = json.choices[0]?.message?.content || 'Sorry, I’m confused and can’t answer that >,<';

        conn.chatbot[m.sender].push({
          role: 'system',
          content: responseMessage,
        });

        await conn.sendMessage(m.chat, { text: responseMessage }, { quoted: m });
      } catch (error) {
        await conn.sendMessage(m.chat, { text: 'I’m fine, but there was an error >,<.' }, { quoted: m });
        console.error(error);
      }
    } else {
      await conn.sendMessage(m.chat, { text: 'What do you mean??' }, { quoted: m });
    }
  }
  return !0;
};

export default handler;
