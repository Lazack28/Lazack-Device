import gis from 'g-i-s';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`Please provide a search term for the images.\n\nUsage: ${usedPrefix}${command} <search term>`);
  }

  // Thumbnail for external ad reply (optional)
  const sponsorThumbnail = 'https://home.lazackorganisation.my.id/image/img2.png'; // Replace with your preferred image URL

  // Fake contact message (optional)
  let botContact = {
    key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' },
    message: {
      contactMessage: {
        displayName: `Lazack Device`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;Lazack device;;;\nFN:Lazack device\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
  };

  // Search for images
  try {
    gis(text, async (error, results) => {
      if (error) {
        return m.reply(`An error occurred while searching for images:\n${error.message}`);
      }

      // Check if results are available
      if (!results || results.length === 0) {
        return m.reply(`No images were found for your search term: *${text}*`);
      }

      // Limit the number of images to send (e.g., 5)
      const numberOfImages = Math.min(results.length, 5);
      const imageUrls = results.slice(0, numberOfImages).map(result => result.url);

      // Send images with captions
      for (const url of imageUrls) {
        const message = {
          image: { url },
          caption: `Just Downloeaded youre pics\nSearch term: *${text}*`,
        };
        await conn.sendMessage(m.chat, message, { quoted: botContact });
      }

      // Optional: Send a final thank-you message with an external ad reply
      await conn.sendMessage(
        m.chat,
        {
          text: `✨ *Search completed!* to use this feature then, consider supporting us: https://github.com/Lazack28/Lazack-Device`,
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
    console.error('Error in the image search handler:', e);
    m.reply(`An unexpected error occurred. Please try again later.`);
  }
};

// Command metadata
handler.help = ['image'];
handler.tags = ['tools'];
handler.command = ['image', 'img'];

export default handler;
