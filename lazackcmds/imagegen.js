import gis from 'g-i-s';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(
      `📌 *Usage:* ${usedPrefix}${command} <search term>\n\n🔎 Please provide a search term for the images.`
    );
  }

  // Keywords to block adult content and download-related searches
  const blockedKeywords = [
    'sex', 'porn', 'xxx', 'nude', '18+', 'explicit', 'nsfw',
    'download', 'mp3', 'mp4', 'convert', 'torrent'
  ];

  if (blockedKeywords.some(keyword => text.toLowerCase().includes(keyword))) {
    return m.reply(`🚫 Sorry, but I cannot process this request.`);
  }

  // Sponsor thumbnail (Optional)
  const sponsorThumbnail = 'https://home.lazackorganisation.my.id/img/img1.png'; 

  // Fake contact message (Optional)
  let botContact = {
    key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' },
    message: {
      contactMessage: {
        displayName: `Lazack Device`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;Lazack device;;;\nFN:Lazack device\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
  };

  try {
    gis(text, async (error, results) => {
      if (error) {
        console.error('Image Search Error:', error);
        return m.reply(`❌ An error occurred while searching for images. Please try again later.`);
      }

      if (!results || results.length === 0) {
        return m.reply(`⚠️ No images were found for your search term: *${text}*`);
      }

      // Limit images to send (e.g., 5)
      const numberOfImages = Math.min(results.length, 5);
      const imageUrls = results.slice(0, numberOfImages).map(result => result.url);

      // Send images with captions
      for (const url of imageUrls) {
        await conn.sendMessage(
          m.chat,
          {
            image: { url },
            caption: `🔹 *Search Term:* ${text}\n🔹 *Source:* Internet`,
          },
          { quoted: botContact }
        );
      }

      // Final message with external ad reply
      await conn.sendMessage(
        m.chat,
        {
          text: `✨ *Search Completed!*\n🔗 Support us: https://github.com/Lazack28/Lazack-Device`,
          contextInfo: {
            externalAdReply: {
              title: '🔍 Powered by Team Lazack28!',
              body: 'Explore, Innovate, Inspire.',
              thumbnailUrl: sponsorThumbnail,
              sourceUrl: 'https://github.com/Lazack28/Lazack-Device',
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: botContact }
      );
    });
  } catch (e) {
    console.error('Unexpected Error:', e);
    m.reply(`⚠️ An unexpected error occurred. Please try again later.`);
  }
};

// Command metadata
handler.help = ['image'];
handler.tags = ['tools'];
handler.command = ['image', 'img'];

export default handler;
