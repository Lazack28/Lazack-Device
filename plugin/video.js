import ytdl from '@distube/ytdl-core';
import yts from 'yt-search';

const video = async (m, Fox) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['video', 'ytmp4', 'vid'];

   if (validCommands.includes(cmd)) {
    if (!text) return m.reply('Give a YouTube URL or search query.');

    try {
      await m.React("🕘");

      // Check if the input is a valid YouTube URL
      const isUrl = ytdl.validateURL(text);
      await m.React("⬇️");
      
      if (isUrl) {
        // If it's a URL, directly use ytdl-core for audio and video
        const videoStream = ytdl(text, { filter: 'audioandvideo', quality: 'highest' });

        const videoBuffer = [];

        videoStream.on('data', (chunk) => {
          videoBuffer.push(chunk);
        });

        videoStream.on('end', async () => {
          try {
            const finalVideoBuffer = Buffer.concat(videoBuffer);

            const videoInfo = await yts({ videoId: ytdl.getURLVideoID(text) });
    
            await Fox.sendMessage(m.from, { video: finalVideoBuffer, mimetype: 'video/mp4', caption: '> ©ʀᴇᴅ-ꜰᴏx-ᴍᴅ' }, { quoted: m });
            await m.React("✅");
          } catch (err) {
            console.error('Error sending video:', err);
            m.reply('Error sending video.');
            await m.React("❌");
          }
        });
      } else {
        // If it's a search query, use yt-search for video
        const searchResult = await yts(text);
        const firstVideo = searchResult.videos[0];
        await m.React("⬇️");

        if (!firstVideo) {
          m.reply('Video not found.');
          await m.React("❌");
          return;
        }

        const videoStream = ytdl(firstVideo.url, { filter: 'audioandvideo', quality: 'highest' });

        const videoBuffer = [];

        videoStream.on('data', (chunk) => {
          videoBuffer.push(chunk);
        });

        videoStream.on('end', async () => {
          try {
            const finalVideoBuffer = Buffer.concat(videoBuffer);
          
            await Fox.sendMessage(m.from, { video: finalVideoBuffer, mimetype: 'video/mp4', caption: '> ©ʀᴇᴅ-ꜰᴏx-ᴍᴅ' }, { quoted: m });
            await m.React("✅");
          } catch (err) {
            console.error('Error sending video:', err);
            m.reply('Error sending video.');
            await m.React("❌");
          }
        });
      }
    } catch (error) {
      console.error("Error generating response:", error);
      m.reply('An error occurred while processing your request.');
      await m.React("❌");
    }
  }
};

export default video;
