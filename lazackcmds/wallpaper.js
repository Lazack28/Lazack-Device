import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw m.reply(`*𝙿𝚕𝚎𝚊𝚜𝚎 𝚎𝚗𝚝𝚎𝚛 𝚝𝚑𝚎 𝚝𝚎𝚡𝚝 𝚘𝚏 𝚝𝚑𝚎 𝚒𝚖𝚊𝚐𝚎 𝚢𝚘𝚞 𝚠𝚊𝚗𝚝*\n\n*_𝚎𝚡𝚊𝚖𝚙𝚕𝚎_*\n *${usedPrefix + command} Naruto*`);

  const apiUrl = `https://weeb-api.vercel.app/wallpaper?query=${encodeURIComponent(text)}`;

  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw `Error fetching the wallpaper: ${response.status} ${response.statusText}`;
    }

    const imageUrls = await response.json();

    if (imageUrls.length === 0) {
      throw `No wallpapers found for: ${text}`;
    }

    // Choose 2 random images from the array
    const randomIndexes = getRandomIndexes(imageUrls.length, 2);
    const randomImages = randomIndexes.map(index => imageUrls[index]);

    for (const imageUrl of randomImages) {
      const imageResponse = await fetch(imageUrl);

      if (!imageResponse.ok) {
        throw `Error fetching the image: ${imageResponse.status} ${imageResponse.statusText}`;
      }

      // Use 'arrayBuffer()' to get the image data
      const arrayBuffer = await imageResponse.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer); // Convert to Buffer if necessary

      conn.sendFile(m.chat, buffer, 'wallpaper.jpg', `*${text}*`, m, null, rcanal);
    }
  } catch (error) {
    m.react(error);
  }
};

// Function to generate random indexes
function getRandomIndexes(max, count) {
  const indexes = [];
  while (indexes.length < count) {
    const randomIndex = Math.floor(Math.random() * max);
    if (!indexes.includes(randomIndex)) {
      indexes.push(randomIndex);
    }
  }
  return indexes;
}

handler.help = [''].map(v => 'wallpaper' + v + ' <query>');
handler.tags = ['downloads'];
handler.command = /^(wall|wallpaper)$/i;

export default handler