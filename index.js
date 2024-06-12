const { command, commands } = require("./plugins");
let config = require("../config");
const axios = require("axios");
const cheerio = require("cheerio");
const OpenAI = require("openai");
const openai_api = "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";
const openai = new OpenAI({ apiKey: openai_api });

const pm2 = require("pm2");

const {
  getBuffer,
  decodeJid,
  parseJid,
  parsedJid,
  getJson,
  isIgUrl,
  isUrl,
  getUrl,
  qrcode,
  secondsToDHMS,
  igdl,
  formatBytes,
  sleep,
  clockString,
  validateQuality,
  runtime,
  AddMp3Meta,
  Bitly,
  isNumber,
  getRandom,
  findMusic,
  WriteSession,
  toAudio,
  readQr,
  getLyrics,
  isAdmin,
} = require("./functions");
const { serialize, downloadMedia } = require("./serialize");
const Greetings = require("./Greetings");;
module.exports = {
  toAudio,
  isPrivate: config.WORK_TYPE.toLowerCase() === "private",
  Greetings,
  isAdmin,
  serialize,
  getLyrics,
  readQr,
  downloadMedia,
  Function: command,
  command,
  commands,
  getBuffer,
  WriteSession,
  decodeJid,
  parseJid,
  parsedJid,
  getJson,
  isIgUrl,
  isUrl,
  getUrl,
  validateQuality,
  qrcode,
  secondsToDHMS,
  formatBytes,
  igdl, 
  sleep,
  clockString,
  runtime,
  AddMp3Meta,
  Bitly,
  isNumber,
  getRandom,
  findMusic,
};
