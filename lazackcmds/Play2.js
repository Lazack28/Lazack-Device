const TikTok = async (url) => {
  try {
    const response = await fetch("https://api.yanzbotz.live/api/downloader/tiktok?url=" + encodeURIComponent(url) + "&apiKey=PrincelovesYanz");
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

let handler = async (m, { conn, args }) => {
  const url = args[0];
  if (!url) {
    return m.reply("🟢 Example:\n .tiktok paste your link");
  }

  m.react("⏳");

  try {
    let result = await TikTok(url);
    let type = result.type;
    let details = ╭━━⊱𝗧𝗜𝗞𝗧𝗢𝗞 𝗗𝗟\n;
    details += 🎗 Type: ${type}\n;
    details += 🎗 Name: ${result.name || "N/A"}\n;
    details += 🎗 Username: ${result.username || "N/A"}\n;
    details += 🎗 Views: ${result.views || "N/A"}\n;
    details += 🎗 Likes: ${result.likes || "N/A"}\n;
    details += 🎗 Comments: ${result.comments || "N/A"}\n;
    details += 🎗 Favorite: ${result.favorite || "N/A"}\n;
    details += 🎗 Shares: ${result.shares || "N/A"}\n;
    details += 🎗 Description: ${result.description || "N/A"}\n╰━━━━━━━━━━━━━━━━━;

    await conn.sendMessage(m.chat, { text: details }, { quoted: m });

    if (type === "image") {
      for (let i = 0; i < result.image.length; i++) {
        await conn.sendMessage(m.chat, { image: { url: result.image[i] }, caption: *🎗 Image:* ${i + 1} }, { quoted: m });
      }
      await conn.sendFile(m.chat, result.sound, "tiktok.mp3", '', m, null, { mimetype: "audio/mp4" });
    } else if (type === "video") {
      await conn.sendMessage(m.chat, { video: { url: result.video["no-watermark"] }, caption: details }, { quoted: m });
    }

  } catch (error) {
    m.reply("Error: Unable to download TikTok content.");
  }

  m.react("✅");
};

handler.help = ["tiktok"];
handler.tags = ["tools"];
handler.command = /^(tiktok|tt|tiktokdl|tiktokslide|tiktoknowm|tiktokvid|ttdl)$/i;

export default handler;