import ytdl from 'ytdl-core'
import yts from 'yt-search'

const song = async (m, Fox) => {
const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();
  
  const validCommands = ['ytdl', 'ytmp3', 'music'];

   if (validCommands.includes(cmd)) {
  
    if (!text) return m.reply('give a YT URL or search query');	 
 
try {
    await m.React("🕘");

    // Check if the input is a valid YouTube URL
    const isUrl = ytdl.validateURL(text);

    if (isUrl) {
      // If it's a URL, directly use ytdl-core
      const audioStream = ytdl(text, { filter: 'audioonly', quality: 'highestaudio' });
      const audioBuffer = [];

      audioStream.on('data', (chunk) => {
        audioBuffer.push(chunk);
      });

      audioStream.on('end', async () => {
        try {
          const finalAudioBuffer = Buffer.concat(audioBuffer);

          const videoInfo = await yts({ videoId: ytdl.getURLVideoID(text) });
        
          const thumbnailMessage = {
  image: {
    url: videoInfo.thumbnail,
  },
  caption: `
╭──═❮ *YouTube Player* ✨ ❯═─┈•
│✑ *Title:* ${videoInfo.title}
│✑ *duration:* ${videoInfo.timestamp}
│✑ *Uploaded* ${videoInfo.ago}
│✑ *Uploader:* ${videoInfo.author.name}
╰────────────────❃ 
`, 
};
          await Fox.sendMessage(m.from, thumbnailMessage, { quoted: m });
          await Fox.sendMessage(m.from, { audio: finalAudioBuffer, mimetype: 'audio/mpeg' }, { quoted: m });
          await m.React("✅");
        } catch (err) {
          console.error('Error sending audio:', err);
          m.reply('Error sending audio.');
          await m.React("❌");
        }
      });
    } else {
      // If it's a search query, use yt-search
      const searchResult = await yts(text);
      const firstVideo = searchResult.videos[0];

      if (!firstVideo) {
        m.reply('Audio not found.');
        await m.React("❌");
        return;
      }

      const audioStream = ytdl(firstVideo.url, { filter: 'audioonly', quality: 'highestaudio' });
      const audioBuffer = [];

      audioStream.on('data', (chunk) => {
        audioBuffer.push(chunk);
      });

      audioStream.on('end', async () => {
        try {
          const finalAudioBuffer = Buffer.concat(audioBuffer);
          const thumbnailMsg = {
  image: {
    url: firstVideo.thumbnail,
  },
  caption: `
╭──═❮ *YouTube Player* ✨ ❯═─┈•
│✑ *Title:* ${firstVideo.title}
│✑ *duration:* ${firstVideo.timestamp}
│✑ *Uploaded* ${firstVideo.ago}
│✑ *Uploader:* ${firstVideo.author.name}
╰────────────────❃ 
`, 
};
          await Fox.sendMessage(m.from, thumbnailMsg, { quoted: m });
          //await Fox.sendMessage(m.from, doc, { quoted: m })
        let doc = {
        audio: finalAudioBuffer,
        mimetype: 'audio/mpeg',
        ptt: true,
        waveform:  [100, 0, 100, 0, 100, 0, 100],
        fileName: "Fox.mp3",

        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
            title: "↺ |◁   II   ▷|   ♡",
            body: `Now playing: ${text}`,
            thumbnailUrl: firstVideo.thumbnail,
            sourceUrl: null,
            mediaType: 1,
            renderLargerThumbnail: false
          }
        }
    };

    await Fox.sendMessage(m.from, doc, { quoted: m });
          await m.React("✅");
        } catch (err) {
          console.error('Error sending audio:', err);
          m.reply('Error sending audio.');
          await m.React("❌");
        }
      });
    }
} catch (error) {
        console.error("Error generating response:", error);
    }
}
}

export default song;
