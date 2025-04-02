/*import axios from "axios";
import lazacksongs from "yt-search";

let handler = async (m, { conn, text, botname }) => {
    if (!text) return m.reply("Specify a video you want to download");

    await m.reply("Searching...");

    try {
        let search = await lazacksongs(text);
        let video = search.videos[0];

        if (!video) return m.reply("No results found");

        let link = video.url;
        let apis = [
            `https://home.lazacktech.biz.id/api/ytdl?url=${link}&format=mp4`,
        ];

        for (const api of apis) {
            try {
                let { data } = await axios.get(api);
                if (data.status === 200) {
                    let videoUrl = data.result?.downloadUrl || data.url;
                    let videoData = {
                        title: data.result?.title || video.title,
                        author: data.result?.author || video.author.name,
                        thumbnail: data.result?.image || video.thumbnail,
                        videoUrl: link,
                    };

                    await conn.sendMessage(m.chat, {
                        image: { url: videoData.thumbnail },
                        caption: `
*Title:* ${videoData.title}
*Author:* ${videoData.author}
Join Lazack Organisation for more features.`
                    },
                    { quoted: m }
                    );

                    await m.reply("[❗] Please wait, the video is being downloaded...");

                    await conn.sendMessage(m.chat, {
                        video: { url: videoUrl },
                        mimetype: "video/mp4",
                    },
                    { quoted: m }
                    );

                    await m.reply("Enjoy your video!");

                    return;
                }
            } catch (e) {
                console.error(`API Error (${api}):`, e.message);
                continue;
            }
        }

        return m.reply("Failed to download the video, please try again later");
    } catch (error) {
        return m.reply("Error: " + error.message);
    }
};

handler.help = ["video <title>"];
handler.tags = ["video"];
handler.command = /^(video|v)$/i;

export default handler;*/
