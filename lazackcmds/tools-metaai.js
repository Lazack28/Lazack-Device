// By WillZek

const handler = async (m, {conn, text, usedPrefix, command}) => {

    if (!text) return m.reply(`*🧑‍💻 Enter a text to generate your image as you like*`);
  
    m.react('🕒');
    await conn.sendMessage(m.chat, {text: '*🧑‍💻 Please wait, we are generating your image*'}, {quoted: m});
  
    try {
      const crow = `https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${text}`;
  
      const messageText = `*Results for:* ${text}`;
      m.react(rwait); // Make sure `rwait` is defined
      await conn.sendMessage(m.chat, { image: { url: crow }, caption: messageText }, { quoted: m });
      m.react(done);  // Make sure `done` is defined
  
    } catch (error) {
      console.error(error);
      throw `*🚨 Sorry, an error occurred 😔*`;
    }
  }
  
  handler.tags = ['tools'];
  handler.help = ['tzai'];
  handler.command = ['tzai'];
  
  export default handler;
  