import axios from 'axios';

const handler = async (m, { conn, args }) => {
  try {
    const query = args[0];
    if (!query) return conn.reply(m.chat,'🔥 *Example:* .ytmp3 <URL of YouTube>',m,rcanal);
    await m.react('🕓');
    const apiUrl = `https://api.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(query)}`;
    const response = await axios.get(apiUrl);

    if (!response.data?.result?.download_url) {
      return m.reply('🚫 *Error al obtener el audio.* Verifica la URL o intenta nuevamente más tarde.');
    }

    const { title, quality, thumbnail, download_url } = response.data.result;

    const caption = `*\`Título:\`* ${title}
*\`Calidad:\`* ${quality}`;

    await conn.sendMessage(m.chat, {
      document: { url: download_url },
      fileName: `${title}.mp3`,
      mimetype: 'audio/mpeg',
      caption: caption,
    }, { quoted: m });
    await m.react('✅');
  } catch (error) {
    console.error('Error en el comando ytmp3:', error.message);
    await m.react('❌');
  }
};

handler.help = ['ytmp3doc *<url>*'];
handler.tags = ['dl'];
handler.command = /^ytmp3doc|ytadoc$/i;
export default handler;
