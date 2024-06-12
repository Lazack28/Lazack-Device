let ytdl = require('ytdl-core');
let fs = require('fs');
let search = require ('yt-search');

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('*example*: .play Lathi');
  try {
    let results = await search(text);
    let videoId = results.videos[0].videoId;
    let info = await ytdl.getInfo(videoId);
    let title = info.videoDetails.title.replace(/[^\w\s]/gi, '');
    let thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    let url = info.videoDetails.video_url;
    let duration = parseInt(info.videoDetails.lengthSeconds);
    let uploadDate = new Date(info.videoDetails.publishDate).toLocaleDateString();
    let views = info.videoDetails.viewCount;
    let minutes = Math.floor(duration / 60);
    let description = results.videos[0].description;
    let seconds = duration % 60;
    let durationText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;       
    let viewsFormatted = formatViews(views);
    //let infoText = `◦ *Title*: ${title}\n◦ *Duration*: ${durationText}\n◦ *Upload*: ${uploadDate}\n◦ *Views*: ${viewsFormatted}\n◦ *ID*: ${videoId}\n◦ *Description*: ${description}\n◦ *URL*: ${url}
    let infoText =  `╭──── 〔 Y O U T U B E 〕 ─⬣
⬡ Title: ${title}
⬡ Duration: ${durationText}
⬡ Views: ${viewsFormatted}
⬡ Upload: ${uploadDate}
⬡ Link: ${url}
╰────────⬣`;
    
  `;
     /*conn.relayMessage(m.chat, {
                extendedTextMessage:{
                text: infoText, 
                contextInfo: {
                     externalAdReply: {
                        title: wm,
                        body: "",
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: thumbnailUrl,
                        sourceUrl: url
                    }
                }, mentions: [m.sender]
}}, {});*/
const media = await baileysprepareWAMessageMedia({ image: (await conn.getFile(thumbnailUrl)).data }, { upload: conn.waUploadToServer })
const msg = {
		viewOnceMessage: {
			message: {
				messageContextInfo: {
					deviceListMetadata: {},
					deviceListMetadataVersion: 2,
				},
				interactiveMessage: {
					body: {
						text: infoText,
					},
					footer: {
						text: '_Audio sedang dikirim..._',
					},
					header: {
						title: '',
						subtitle: '',
						hasMediaAttachment: true,
						...media
					},
					nativeFlowMessage: {
						buttons: [
							{
              "name": "quick_reply",
              "buttonParamsJson":
JSON.stringify({
 "display_text": "VIDEO 📺",
"id": ".ytv " + url
              })              
            },
            	{
              "name": "quick_reply",
              "buttonParamsJson":
JSON.stringify({
 "display_text": "AUDIO 🎧",
"id": ".yta " + url
              })              
            } //snd
						],
					},
				},
			},
		},
	};
	conn.relayMessage(m.chat, msg, { });
  } catch (e) {
    console.log(e);
    m.reply(`An error occurred while searching for the song: ${e.message}`);
  }
};

handler.command = handler.help = ['play', 'song'];
handler.tags = ['downloader'];
handler.premium = false;
handler.limit = true;

module.exports = handler

function formatViews(views) {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + 'M';
  } else if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'K';
  } else {
    return views.toString();
  }
                            }
