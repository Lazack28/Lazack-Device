import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/;

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `❀ Please enter the name of the music to download.`, m);
    }

    let videoIdToFind = text.match(youtubeRegexID) || null;
    let ytplay2 = await yts(videoIdToFind === null ? text : "https://youtu.be/" + videoIdToFind[1]);

    if (videoIdToFind) {
      const videoId = videoIdToFind[1];
      ytplay2 =
        ytplay2.all.find((item) => item.videoId === videoId) ||
        ytplay2.videos.find((item) => item.videoId === videoId);
    }

    ytplay2 = ytplay2.all?.[0] || ytplay2.videos?.[0] || ytplay2;
    if (!ytplay2 || ytplay2.length == 0) return m.reply("✧ No results found for your search.");

    let { title, thumbnail, timestamp, views, ago, url, author } = ytplay2;
    title = title || "Not found";
    thumbnail = thumbnail || "Not found";
    timestamp = timestamp || "Not found";
    views = views || "Not found";
    ago = ago || "Not found";
    url = url || "Not found";
    author = author || "Not found";

    const formattedViews = formatViews(views);
    const channel = author.name ? author.name : "Unknown";
    const infoMessage = `「✦」Downloading *<${title}>*\n\n> ✧ Channel » *${channel}*\n> ✰ Views » *${formattedViews}*\n> ⴵ Duration » *${timestamp}*\n> ✐ Published » *${ago}*\n> 🜸 Link » ${url}`;

    const thumb = (await conn.getFile(thumbnail))?.data;
    const JT = {
      contextInfo: {
        externalAdReply: {
          title: botname,
          body: dev,
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true,
        },
      },
    };

    await conn.reply(m.chat, infoMessage, m, JT);

    // ===== AUDIO HANDLER =====
    if (["play", "yta", "ytmp3", "playaudio"].includes(command)) {
      const audioAPIs = [
        `https://api.vreden.my.id/api/ytmp3?url=${url}`,
        `https://apis.davidcyriltech.my.id/youtube/mp3?url=${url}`,
        `https://api.ryzendesu.vip/api/downloader/ytmp3?url=${url}`,
        `https://api.neoxr.eu/api/youtube?url=${url}&type=audio&apikey=GataDios`,
      ];

      let result = null;
      let finalTitle = title;

      for (const apiUrl of audioAPIs) {
        try {
          const apiResponse = await (await fetch(apiUrl)).json();
          result =
            apiResponse?.result?.download?.url ||
            apiResponse?.data?.url ||
            apiResponse?.downloadUrl;
          if (apiResponse?.result?.title) finalTitle = apiResponse.result.title;
          if (result) break;
        } catch (err) {
          console.log(`Audio API failed: ${apiUrl} | ${err.message}`);
          continue;
        }
      }

      if (!result) {
        return conn.reply(
          m.chat,
          "⚠︎ Could not fetch audio from any API. The file may be too large or APIs are temporarily down.",
          m
        );
      }

      await conn.sendMessage(
        m.chat,
        {
          audio: { url: result },
          fileName: `${finalTitle}.mp3`,
          mimetype: "audio/mpeg",
        },
        { quoted: m }
      );
    }

    // ===== VIDEO HANDLER =====
    else if (["play2", "ytv", "ytmp4", "mp4"].includes(command)) {
      const videoAPIs = [
        `https://api.neoxr.eu/api/youtube?url=${url}&type=video&quality=480p&apikey=GataDios`,
        `https://api.vreden.my.id/api/ytmp4?url=${url}`,
        `https://api.ryzendesu.vip/api/downloader/ytmp4?url=${url}`,
        `https://apis.davidcyriltech.my.id/youtube/mp4?url=${url}`,
      ];

      let resultUrl = null;
      let finalTitle = title;

      for (const apiUrl of videoAPIs) {
        try {
          const apiResponse = await (await fetch(apiUrl)).json();
          resultUrl =
            apiResponse?.result?.download?.url || apiResponse?.data?.url || apiResponse?.downloadUrl;
          if (apiResponse?.result?.title) finalTitle = apiResponse.result.title;
          if (resultUrl) break;
        } catch (err) {
          console.log(`Video API failed: ${apiUrl} | ${err.message}`);
          continue;
        }
      }

      if (!resultUrl) {
        return conn.reply(
          m.chat,
          "⚠︎ Could not fetch video from any API. The file may be too large or APIs are temporarily down.",
          m
        );
      }

      await conn.sendFile(m.chat, resultUrl, `${finalTitle}.mp4`, title, m);
    }

    // Invalid command
    else {
      return conn.reply(m.chat, "✧︎ Unrecognized command.", m);
    }
  } catch (error) {
    return m.reply(`⚠︎ An error occurred: ${error}`);
  }
};

handler.command = handler.help = [
  "play",
  "yta",
  "ytmp3",
  "play2",
  "ytv",
  "ytmp4",
  "playaudio",
  "mp4",
];
handler.tags = ["downloads"];
handler.group = true;

export default handler;

// ===== FUNCTION TO FORMAT VIEWS =====
function formatViews(views) {
  if (views === undefined) return "Not available";

  if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`;
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`;

  return views.toString();
}
