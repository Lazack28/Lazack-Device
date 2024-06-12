const { command, isPrivate } = require("../../lib/");
const { aiImage } = require("../../lib/functions");
command(
  {
    pattern: "genimage",
    fromMe: isPrivate,
    desc: "Generate image from text",
    type: "image",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.sendMessage(message.jid, "Provide a text");
    let buff = await aiImage(match);
    if (!Buffer.isBuffer(buff))
      return await message.sendMessage(message.jid, buff);
    return await message.sendMessage(
      message.jid,
      buff,
      {
        mimetype: "image/jpeg",
        caption: "X-Asena Dall-E Interface",
      },
      "image"
    );
  }
);
