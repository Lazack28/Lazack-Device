const config = require("../../config");
const { command, isPrivate, toAudio } = require("../../lib/");
const { webp2mp4, textToImg } = require("../../lib/functions");
command(
  {
    pattern: "sticker",
    fromMe: isPrivate,
    desc: "Converts Photo/video/text to sticker",
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message&& (!message.reply_message.video || !message.reply_message.sticker || !message.reply_message.text))
      return await message.reply("_Reply to photo/video/text_");
    var buff;
    if (message.reply_message.text) {
      buff = await textToImg(message.reply_message.text);
    } else {
      buff = await m.quoted.download();
    }

    message.sendMessage(
      message.jid,
      buff,
      { packname: config.PACKNAME, author: config.AUTHOR },
      "sticker"
    );
  }
);

command(
  {
    pattern: "take",
    fromMe: isPrivate,
    desc: "Converts Photo or video to sticker",
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message.sticker)
      return await message.reply("_Reply to a sticker_");
    const packname = match.split(";")[0] || config.PACKNAME;
    const author = match.split(";")[1] || config.AUTHOR;
    let buff = await m.quoted.download();
    message.sendMessage(message.jid, buff, { packname, author }, "sticker");
  }
);

command(
  {
    pattern: "photo",
    fromMe: isPrivate,
    desc: "Changes sticker to Photo",
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message.sticker)
      return await message.reply("_Not a sticker_");
    let buff = await m.quoted.download();
    return await message.sendMessage(message.jid, buff, {}, "image");
  }
);

command(
  {
    pattern: "mp3",
    fromMe: isPrivate,
    desc: "converts video/voice to mp3",
    type: "downloader",
  },
  async (message, match, m) => {
    let buff = await m.quoted.download();
    console.log(typeof buff);
    buff = await toAudio(buff, "mp3");
    console.log(typeof buff);
    return await message.sendMessage(
      message.jid,
      buff,
      { mimetype: "audio/mpeg" },
      "audio"
    );
  }
);

command(
  {
    pattern: "mp4",
    fromMe: isPrivate,
    desc: "converts video/voice to mp4",
    type: "downloader",
  },
  async (message, match, m) => {
    if (
      !message.reply_message.video ||
      !message.reply_message.sticker ||
      !message.reply_message.audio
    )
      return await message.reply("_Reply to a sticker/audio/video_");
    let buff = await m.quoted.download();
    if (message.reply_message.sticker) {
      buff = await webp2mp4(buff);
    } else {
      buff = await toAudio(buff, "mp4");
    }
    return await message.sendMessage(
      message.jid,
      buff,
      { mimetype: "video/mp4" },
      "video"
    );
  }
);

command(
  {
    pattern: "img",
    fromMe: isPrivate,
    desc: "Converts Sticker to image",
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message.sticker)
      return await message.reply("_Reply to a sticker_");
    let buff = await m.quoted.download();
    return await message.sendMessage(message.jid, buff, {}, "image");
  }
);
