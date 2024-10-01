import axios from "axios";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import os from "os";

let streamPipeline = promisify(pipeline);

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, `*_々 inter a youtube link bro*\n\n*example:*\n${usedPrefix + command} https://youtu.be/w_ufjahQlyw?si=jMBHaX8SgkNdcG2v`, m);

  try {
    let videoUrl = text; 
    let apiUrl = `https://rembotapi.vercel.app/api/yt?url=${encodeURIComponent(videoUrl)}`;
    
    let response = await axios.get(apiUrl);
    let data = response.data;

    if (!data.status) throw new Error("Error to obtain youre audio);

    let { title, thumbnail, audioUrl } = data.data;
    await m.react("⏱");

    let tmpDir = os.tmpdir();
    let fileName = `${title}.mp3`;
    let filePath = `${tmpDir}/${fileName}`;

    let audioResponse = await axios({
      url: audioUrl,
      method: 'GET',
      responseType: 'stream'
    });

    let writableStream = fs.createWriteStream(filePath);
    await streamPipeline(audioResponse.data, writableStream);

    let doc = {
      audio: {
        url: filePath,
      },
      mimetype: "audio/mp4",
      fileName: `${title}`,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: videoUrl,
          title: title,
          sourceUrl: videoUrl,
          thumbnail: await (await conn.getFile(thumbnail)).data,
        },
      },
    };

    await conn.sendMessage(m.chat, doc, { quoted: m });
    await m.react("✅");
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, `${global.error}`, m).then(_ => m.react('❌'));
  }
};

handler.help = ["ytmp3"].map((v) => v + " <url>");
handler.tags = ["dl"];
handler.command = /^(yta|ytmp3)$/i;
handler.register = true

export default handler;
