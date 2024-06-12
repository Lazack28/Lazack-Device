const { command, isPrivate } = require("../../lib/");
const { removeBg } = require("../../lib/functions");
const config = require("../../config");
command(
  {
    pattern: "rmbg",
    fromMe: isPrivate,
    desc: "Remove background of an image",
    type: "image",
  },
  async (message, match, m) => {
    if (!config.REMOVEBG)
      return await message.sendMessage(
        message.jid,
        "Set RemoveBg API Key in config.js \n Get it from https://www.remove.bg/api"
      );
    if (!message.reply_message && !message.reply_message.image)
        
      return await message.reply("Reply to an image");
    let buff = await m.quoted.download();
    let buffer = await removeBg(buff);
    if (!buffer) return await message.reply("An error occured");
    await message.sendMessage(
      message.jid,
      buffer,
      {
        quoted: message.reply_message.key,
        mimetype: "image/png",
        fileName: "removebg.png",
      },
      "document"
    );
  }
);
