const {
  command,
  isPrivate,
  isUrl,
  AddMp3Meta,
  getBuffer,
  toAudio,
  getJson,
  validateQuality,
} = require("../../lib");
const { yta, ytv, ytsdl } = require("../../lib/ytdl");

command(
  {
    pattern: "yta",
    fromMe: isPrivate,
    desc: "Download audio from youtube",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.reply("Give me a youtube link");
    if (!isUrl(match)) return await message.reply("Give me a youtube link");
    let { dlink, title } = (
      await getJson(
        `https://api.thexapi.xyz/api/v1/download/youtube/audio?url=${match}`
      )
    ).data;
    await message.reply(`_Downloading ${title}_`);
    let buff = await getBuffer(dlink);
    return await message.sendMessage(
      message.jid,
      buff,
      {
        mimetype: "audio/mpeg",
        filename: title + ".mp3",
      },
      "audio"
    );
  }
);

command(
  {
    pattern: "ytv",
    fromMe: isPrivate,
    desc: "Download audio from youtube",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    let url = getUrl(match)[0];
    if (!url)
      return await message.reply(
        "Give me a youtube link\n\nExample: ytv youtube.com/watch?v=xxxxx 480p"
      );
    let quality = match.split(";")[1];
    if (quality && !validateQuality(quality)) {
      return await message.reply(
        "Invalid Resolution \nSupported: 144p, 240p, 360p, 480p, 720p, 1080p, 1440p, 2160p"
      );
    } else if (!quality) quality = "360p";
    if (!match)
      return await message.reply(
        "Give me a youtube link\n\nExample: ytv youtube.com/watch?v=xxxxx 480p"
      );
    if (!isUrl(match))
      return await message.reply(
        "Give me a youtube link\n\nExample: ytv youtube.com/watch?v=xxxxx 480p"
      );
    let requrl = `https://api.thexapi.xyz/api/v1/download/youtube/video?url=${url}&quality=${quality}`;
    let response = (await getJson(requrl)).data;
    const { dlink, title } = response;
    console.log(response);
    await message.reply(`_Downloading ${title}_`);
    return await message.sendMessage(
      message.jid,
      dlink,
      {
        mimetype: "video/mp4",
        filename: title + ".mp4",
      },
      "video"
    );
  }
);

command(
  {
    pattern: "song",
    fromMe: isPrivate,
    desc: "Download audio from youtube",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.reply("Give me a query");
    let { dlink, title } = await ytsdl(match);
    await message.reply(`_Downloading ${title}_`);
    let buff = await getBuffer(dlink);
    return await message.sendMessage(
      message.jid,
      buff,
      {
        mimetype: "audio/mpeg",
        filename: title + ".mp3",
      },
      "audio"
    );
  }
);

command(
  {
    pattern: "video",
    fromMe: isPrivate,
    desc: "Download video from youtube",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.reply("Give me a query");
    let { dlink, title } = await ytsdl(match, "video");
    await message.reply(`_Downloading ${title}_`);
    return await message.sendMessage(
      message.jid,
      dlink,
      {
        mimetype: "video/mp4",
        filename: title + ".mp4",
      },
      "video"
    );
  }
);
