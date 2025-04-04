// Description: AI Image Generation Command
import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, 'Please enter the model (1/2) and prompt to generate an image.\nExample: .aiimage 1 Momoi anime', m);
  }

  const args = text.split(' ');
  const model = args.shift();
  const prompt = args.join(' ');

  if (!['1', '2'].includes(model)) {
    return conn.reply(m.chat, 'Invalid model! Use 1 or 2.', m);
  }

  if (!prompt) {
    return conn.reply(m.chat, 'Please enter a prompt after the model.', m);
  }

  const api = `https://api.crafters.biz.id/ai-img/flux?prompt=${encodeURIComponent(prompt)}&model=${model}`;

  try {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    const response = await fetch(api);
    if (!response.ok) throw new Error('Failed to fetch image from API');
    
    const json = await response.json(); 
    if (!json.status || !json.result || json.result.length === 0) {
      throw new Error('Image not found in API response');
    }
    
    for (const imageUrl of json.result) {
      await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: `Result for: ${prompt} (Model ${model})` }, { quoted: m });
    }
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'An error occurred while fetching the image.', m);
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
  }
};

handler.help = ['aiimage <model> <prompt>'];
handler.tags = ['image'];
handler.command = /^(aiimage)$/i;

export default handler;
