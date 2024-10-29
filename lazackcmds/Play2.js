import axios from "axios";
import ytSearch from "yt-search";
import fs from "fs";

const handler = async (message, { conn, command, args, usedPrefix }) => {
  // Check if the user provided a query or quoted a message
  if (!args[0] && message.quoted && message.quoted.text) {
    args[0] = message.quoted.text;
  }
  
  // If no valid input is provided, throw an error
  if (!args[0] && !message.quoted) {
    throw ` *${usedPrefix}${command}* You must provide a valid URL.`;
  }
  
  try {
    message.react("⏳");
    const input = args[0];
    let videoLinks;
    
    // Check if the input is a YouTube URL
    if (input.includes("youtube.com") || input.includes("youtu.be")) {
      videoLinks = [{ url: input }];
    } else {
      // Search for videos if it's not a URL
      videoLinks = await search(input);
    }
    
    // Handle audio download
    await handleAudio(message, conn, videoLinks[0].url);
  } catch (error) {
    console.log(error);
    const errorMessage = {
      text: "An error occurred. Please try again later."
    };
    await conn.sendMessage(message.chat, errorMessage, { quoted: message });
  }
};

const handleAudio = async (message, conn, audioUrl) => {
  try {
    message.react("⏳");
    console.log("Fetching audio from URL: " + audioUrl);
    const downloadUrl = "https://widipe.com/download/ytdl?url=${audioUrl}";
    console.log("Requesting: " + downloadUrl);
    
    const response = await axios.get(downloadUrl);
    console.log("API Response:", response.data);
    
    if (response.data && response.data.result && response.data.result.downloadLinks) {
      const downloadLink = response.data.result.downloadLinks[0].url;
      const title = response.data.result.title || "Downloaded Audio";
      const audioBuffer = await getBuffer(downloadLink);
      
      const audioSizeMB = audioBuffer.byteLength / (1024 * 1024);
      console.log("Downloaded audio size: " + audioSizeMB.toFixed(2) + " MB");
      
      if (audioSizeMB >= 400) {
        const messageText = {
          text: '' + downloadLink
        };
        await conn.sendMessage(message.chat, messageText, { quoted: message });
      } else if (audioSizeMB >= 100 && audioSizeMB < 400) {
        const documentMessage = {
          document: audioBuffer,
          mimetype: "audio/mpeg",
          fileName: title + ".mp3"
        };
        await conn.sendMessage(message.chat, documentMessage, { quoted: message });
      } else {
        message.react("✅");
        const audioMessage = {
          audio: audioBuffer,
          mimetype: "audio/mpeg",
          fileName: title + ".mp3",
          caption: '' + title
        };
        await conn.sendMessage(message.chat, audioMessage, { quoted: message });
      }
    } else {
      throw new Error("Invalid API response or missing download URL");
    }
  } catch (error) {
    console.error("Error in handleAudio:", error.response ? error.response.data : error.message);
    const errorMessage = {
      text: "Failed to download the audio. Please try again later."
    };
    await conn.sendMessage(message.chat, errorMessage, { quoted: message });
  }
};

handler.help = ["song"].map(helpItem => helpItem + " < query >");
handler.tags = ["downloader"];
handler.command = ["song"];
export default handler;

async function search(query, options = {}) {
  const searchOptions = {
    query: query,
    hl: "es",
    gl: "ES",
    ...options
  };
  const searchResults = await ytSearch(searchOptions);
  return searchResults.videos;
}

const getBuffer = async (url, options) => {
  const headers = {
    DNT: 1,
    "Upgrade-Insecure-Requests": 1
  };
  
  const response = await axios({
    method: "get",
    url: url,
    headers: headers,
    ...options,
    responseType: "arraybuffer"
  });
  
  return response.data;
};