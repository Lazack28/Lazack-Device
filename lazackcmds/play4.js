import axios from "axios";
import lazacksongs from "yt-search";

let handler = async (m, { conn, text, botname }) => {
    if (!text) return m.reply("specify a song you want to play");

    await m.reply("Searching...");

    try {
        let search = await lazacksongs(text);
        let video = search.videos[0];

        if (!video) return m.reply("No results");

        let link = video.url;
        let apis = [
            `https://apis.davidcyriltech.my.id/youtube/mp3?url=${link}`,
            `https://api.ryzendesu.vip/api/downloader/yymp3?url=${link}`,
        ];

        for (const api of apis) {
            try{
                let {data} = await axios.get(api);
                if (data.status === 200) {
                    let audioUrl = data.result?.downloadUrl || data.url;
                    let songData = {
                        tittle: data.result?.title || video.title,
                        artist: data.result?.author || video.author.name,
                        thumbnail: data.result?.image || video.thumbnail,
                        videoUrl: link,
                };
                await conn.sendMessage(m.chat, {
                    image: { url: songData.thumbnail },
                    caption: `
*Title:* ${songData.tittle}
*Artist:* ${songData.artist}
join lazack orgnasition for more features`
                },
            { quoted: m }
        );
        await m.reply ("[❗] Please wait, the song is being downloaded...");

        await conn.sendMessage(m.chat, {
            audio: { url: audioUrl },
        mimetype: "audio/mp4",},
        { quoted: m }
    );

    await m.reply("Enjoy your song!");

    return;
            }
        } catch (e) {
            console.error(`API Error: ${api}):`, e.message);
            continue; 
    }
}

return m.reply("Failed to download the song, please try again later");
} catch (error) {
    return m.reply("Error: " + error.message);
}
};

handler.help = ["play4 <song>"];
handler.tags = ["music"];
handler.command = /^(p|s)$/i;

export default handler;
