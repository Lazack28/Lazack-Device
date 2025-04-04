import axios from 'axios';

let handler = async (m, { conn, usedPrefix, command }) => {
  // Message for usage instructions if no command argument is provided
  if (!command) {
    return m.reply(
      `📌 *Usage:* ${usedPrefix}${command}\n\n🔎 *Please try again by clicking the button below to get a random image of Cristiano Ronaldo.*`
    );
  }

  try {
    // Fetch Cristiano Ronaldo data from the API
    let cristiano = (
      await axios.get(
        `https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/CristianoRonaldo.json`
      )
    ).data;
    
    // Get a random image from the fetched data
    let ronaldo = await cristiano[Math.floor(cristiano.length * Math.random())];

    // Send the image with a caption about Cristiano Ronaldo
    await conn.sendMessage(
      m.chat,
      {
        image: { url: ronaldo },
        caption: `⚽ *Siiiuuuuuu!* 💥\n\nHere is a random image of Cristiano Ronaldo. Enjoy!`,
      }
    );

    // React with a success emoji
    m.react('✅');
  } catch (e) {
    console.error(e);
    m.reply(`⚠️ An unexpected error occurred while fetching the data. Please try again later.`);
  }
};

// Command metadata
handler.help = ['cristianoronaldo', 'cr7'];
handler.tags = ['img'];
handler.command = /^(ronaldo|cr7)$/i;

export default handler;
