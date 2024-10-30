/*
*[ Plugins Ytdl Audio Version]
* Created By Cifumo
* Channel: https://whatsapp.com/channel/0029VadvQ9K2UPB829z2tk1A
* Manusia kan tau caranya menghargai bagaimana, kalo gatau berarti bukan manusia.
*/




import axios from "axios";


const handler = async (m, { conn, args, command, usedPrefix }) => {
  conn.youtube = conn.youtube || {};

  if (!args[0])
    return m.reply(
      `Masukan Link Youtube!\n\nContoh :\n${usedPrefix + command} https://youtu.be/Wky7Gz_5CZs`
    );
  if (
    !/https:\/\/www.youtube.com/i.test(args[0]) &&
    !/https:\/\/youtube.com/i.test(args[0]) &&
    !/https:\/\/youtu.be/i.test(args[0])
  )
    return m.reply("Masukkan URL YouTube yang benar");

  const id = m.sender;
  if (id in conn.youtube) return m.reply("Kamu masih mendownload!");

  let ephemeral =
    conn.chats[m.chat]?.metadata?.ephemeralDuration ||
    conn.chats[m.chat]?.ephemeralDuration ||
    false;

  try {
    conn.youtube[id] = true;
    let setting = global.db.data.settings[conn.user.jid];

      let req = await axios.get('https://rest.cifumo.biz.id/api/downloader/ytdl?url=' + args[0])
      let dl = req.data.data
      let title = dl.title || apalah.title
      let { views, thumbnail, duration, description } = dl.metadata
     let fileSizeInBytes = await Buffer.byteLength(await toBuffer(dl.video))

   let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);

    let text = "*[ Youtube Downloader ]*\n\n";
    text += `╔╾┅━┅━┅━┅━┅━┅━┅━┅⋄\n`
    text += `┇ ❏ \`Title:\` ${title}\n`;
    text += `║ ❏ \`view:\` ${views || 'Null'}\n`;
    text += `┇ ❏ \`Category:\` Audio (mp3)\n`;
    if (duration) text += `║ ❏ \`Duration:\` ${duration}\n`;
    text += `┇ ❏ \`File Size:\` ${fileSizeInMegabytes.toFixed(2)} MB\n`;
    text += `╚╾┅━┅━┅━┅━┅━┅━┅━┅⋄`

    const fChat = await conn.sendMessage(
          m.chat,
          {
            text: text,
            contextInfo: {
              externalAdReply: {
                showAdAttribution: false,
                mediaType: 1,
                title: title || 'none',
                body: duration || "none",
                thumbnailUrl: thumbnail,
                renderLargerThumbnail: true,
                mediaUrl: thumbnail,
                sourceUrl: args[0],
              },
            },
          },
          { quoted: m },
        );

    const jpegThumbnail = await conn.resize(
      thumbnail || apalah.thumbnail,
      400,
      400
    );

    if (fileSizeInMegabytes > 60) {
      await conn.sendMessage(
        m.chat,
        {
          document: await toBuffer(dl.video),
          mimetype: "audio/mpeg",
          fileName: `${title}.mp3`,
          pageCount: 2024,
          jpegThumbnail,
          fileLength: fileSizeInBytes,
        },
        { quoted: fChat }
      );
    } else {
      await conn.sendMessage(
        m.chat,
        {
          audio: await toBuffer(dl.video),
          fileName: `${title}.mp3`,
          mimetype: "audio/mpeg",
          caption: title,
        },
        { quoted: fChat, ephemeralExpiration: ephemeral }
      );
    }
  } catch (e) {
    throw e;
  } finally {
    delete conn.youtube[id];
  }
};

handler.help = ["ytmp4"];
handler.tags = ["downloader"];
handler.command = /^y((outube|tb)audio|(outube|tb?)mp3|utubaudio|taudio|ta)$/i;
handler.limit = true;
handler.error = 0;
export default handler;

async function toBuffer(url) {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });
    return Buffer.from(response.data, "binary");
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    throw error;
  }
  }
