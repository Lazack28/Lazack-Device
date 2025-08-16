/* 
- Flux Ai Image By Angel-OFC 
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
import axios from "axios";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `${emoji} Please enter a term to generate an image.`, m)
  await m.react('🕓')

  try {
    const result = await fluximg.create(text);
    if (result && result.imageLink) {
      await m.react('✅')
      await conn.sendMessage(
        m.chat,
        {
          image: { url: result.imageLink },
          caption: `*\`Results For:\`* ${text}`,
        },
        { quoted: m }
      );
    } else {
      throw new Error("Could not create the image. Please try again.");
    }
  } catch (error) {
    console.error(error);
    conn.reply(
      m.chat,
      "An error occurred while creating the image.",
      m
    );
  }
};

handler.help = ["flux *<text>*"];
handler.tags = ["ai"];
handler.command = ["flux"];

export default handler;

const fluximg = {
  defaultRatio: "2:3", 

  create: async (query) => {
    const config = {
      headers: {
        accept: "*/*",
        authority: "1yjs1yldj7.execute-api.us-east-1.amazonaws.com",
        "user-agent": "Postify/1.0.0",
      },
    };

    try {
      const response = await axios.get(
        `https://1yjs1yldj7.execute-api.us-east-1.amazonaws.com/default/ai_image?prompt=${encodeURIComponent(
          query
        )}&aspect_ratio=${fluximg.defaultRatio}`,
        config
      );
      return {
        imageLink: response.data.image_link,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};