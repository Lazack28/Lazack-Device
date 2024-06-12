const { command, isPrivate } = require("../../lib/");
const { parsedJid } = require("../../lib/functions");
const { banUser, unbanUser, isBanned } = require("../database/ban");
command(
  {
    on: "message",
    fromMe: true,
    dontAddCommandList: true,
  },
  async (message, match) => {
    if (!message.isBaileys) return;
    const isban = await isBanned(message.jid);
    if (!isban) return;
    await message.reply("_Bot is banned in this chat_");
    const jid = parsedJid(message.participant);
    return await message.client.groupParticipantsUpdate(
      message.jid,
      jid,
      "remove"
    );
  }
);

command(
  {
    pattern: "banbot",
    fromMe: true,
    desc: "ban bot from a chat",
    type: "",
  },
  async (message, match) => {
    const chatid = message.jid;
    const isban = await isBanned(chatid);
    if (isban) {
      return await message.sendMessage(message.jid, "Bot is already banned");
    }
    await banUser(chatid);
    return await message.sendMessage(message.jid, "Bot banned");
  }
);

command(
  {
    pattern: "unbanbot",
    fromMe: true,
    desc: "Unban bot from a chat",
    type: "user",
  },
  async (message, match) => {
    const chatid = message.jid;
    const isban = await isBanned(chatid);
    if (!isban) {
      return await message.sendMessage(message.jid, "Bot is not banned");
    }
    await unbanUser(chatid);
    return await message.sendMessage(message.jid, "Bot unbanned");
  }
);
