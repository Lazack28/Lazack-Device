const { fromBuffer } = require("file-type");
const { command, isPrivate } = require("../../lib/");
const { ffmpeg, parseTimeToSeconds } = require("../../lib/functions");
command(
  {
    pattern: "trim",
    fromMe: isPrivate,
    desc: "Trim the video or audio",
    type: "user",
  },
  async (message, match, m) => {
    if (
      !message.reply_message ||
      (!message.reply_message.video && !message.reply_message.audio)
    ) {
      return await message.sendMessage("Reply to a media file");
    }
    if (!match)
      return await message.sendMessage(
        "Give the start and end time in this format: mm:ss|mm:ss"
      );

    const [start, end] = match.split("|");
    if (!start || !end)
      return await message.sendMessage(
        "Give the start and end time in this format: mm:ss|mm:ss"
      );
    const buffer = await m.quoted.download();
    const startSeconds = parseTimeToSeconds(start);
    const endSeconds = parseTimeToSeconds(end);
    const duration = endSeconds - startSeconds;
    const ext = (await fromBuffer(buffer)).ext;
    const args = ["-ss", `${startSeconds}`, "-t", `${duration}`, "-c", "copy"];
    const trimmedBuffer = await ffmpeg(buffer, args, ext, ext);
    message.sendFile(trimmedBuffer);
  }
);
