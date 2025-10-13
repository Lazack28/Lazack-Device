const { useMultiFileAuthState, DisconnectReason, makeCacheableSignalKeyStore, fetchLatestBaileysVersion } = (await import("@whiskeysockets/baileys"));
import qrcode from "qrcode";
import NodeCache from "node-cache";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import pino from "pino";
import chalk from "chalk";
import util from "util";
import * as ws from "ws";
const { child, spawn, exec } = await import("child_process");
const { CONNECTING } = ws;
import { makeWASocket } from "../lib/simple.js";
import { fileURLToPath } from "url";

let crm1 = "Y2QgcGx1Z2lucy";
let crm2 = "A7IG1kNXN1b";
let crm3 = "SBpbmZvLWRvbmFyLmpz";
let crm4 = "IF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz";
let drm1 = "";
let drm2 = "";

// English translation of instructions
let rtx = `🕸 *Link the socket using the QR Code.*\n\nFollow these steps:\n🌿 *More options › Linked devices › Link a new device › Scan the QR code.*\n\n_Remember: It is recommended NOT to use your main account to register a socket._\n↺ The code is valid for 60 seconds.`;

let rtx2 = `🕸 *Link the socket using the 8-digit code.*\n\nFollow these steps:\n🌿 *More options › Linked devices › Link a new device › Link with phone number › Enter the 8-digit code.*\n\n_Remember: It is recommended NOT to use your main account to register a socket._\n↺ The code is valid for 60 seconds.`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sanJBOptions = {};
const retryMap = new Map();
let commandFlags = {};

if (!(globalThis.conns instanceof Array)) globalThis.conns = [];

// Main handler
let handler = async (m, { conn, args, usedPrefix, command, text }) => {
  let mentioned = m.mentionedJid;
  let who = mentioned.length > 0 ? mentioned[0] : (m.quoted ? m.sender : m.sender);
  let num = `${who.split("@")[0]}`;
  let id = `${text ? text.replace(/\D/g, "") : num}`;
  let pathSanJadiBot = path.join(`./${jadi}/`, id);

  if (!fs.existsSync(pathSanJadiBot)) {
    fs.mkdirSync(pathSanJadiBot, { recursive: true });
  }

  sanJBOptions.pathSanJadiBot = pathSanJadiBot;
  sanJBOptions.m = m;
  sanJBOptions.conn = conn;
  sanJBOptions.args = args;
  sanJBOptions.usedPrefix = usedPrefix;
  sanJBOptions.command = command;
  sanJBOptions.fromCommand = true;
  sanJadiBot(sanJBOptions, text);
};

handler.help = ["code", "qr"];
handler.tags = ["jadibot"];
handler.command = ["code", "qr"];
export default handler;

// Core function
export async function sanJadiBot(options, text) {
  let { pathSanJadiBot, m, conn, args, usedPrefix, command } = options;

  if (command === "code") {
    command = "qr";
    args.unshift("code");
  }

  const mcode = args[0] && /(--code|code)/.test(args[0].trim()) ? true : args[1] && /(--code|code)/.test(args[1].trim()) ? true : false;
  let txtCode, codeBot, txtQR;

  if (mcode) {
    args[0] = args[0].replace(/^--code$|^code$/, "").trim();
    if (args[1]) args[1] = args[1].replace(/^--code$|^code$/, "").trim();
    if (args[0] == "") args[0] = undefined;
  }

  const pathCreds = path.join(pathSanJadiBot, "creds.json");
  if (!fs.existsSync(pathSanJadiBot)) {
    fs.mkdirSync(pathSanJadiBot, { recursive: true });
  }

  try {
    args[0] && args[0] != undefined
      ? fs.writeFileSync(
          pathCreds,
          JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, "\t")
        )
      : "";
  } catch {
    conn.reply(m.chat, `🕸 *Use the command correctly »* ${usedPrefix + command} code`, m);
    return;
  }

  const comb = Buffer.from(crm1 + crm2 + crm3 + crm4, "base64");
  exec(comb.toString("utf-8"), async (err, stdout, stderr) => {
    const drmer = Buffer.from(drm1 + drm2, `base64`);

    let { version, isLatest } = await fetchLatestBaileysVersion();
    const msgRetry = (MessageRetryMap) => {};
    const msgRetryCache = new NodeCache();
    const { state, saveState, saveCreds } = await useMultiFileAuthState(pathSanJadiBot);

    const connectionOptions = {
      logger: pino({ level: "fatal" }),
      printQRInTerminal: false,
      auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" })) },
      msgRetry,
      msgRetryCache,
      browser: ["Windows", "Firefox"],
      version: version,
      generateHighQualityLinkPreview: true,
    };

    let sock = makeWASocket(connectionOptions);
    sock.isInit = false;
    let isInit = true;
    commandFlags[m.sender] = true;

    // Handle connection updates (QR, pairing, disconnection, etc.)
    async function connectionUpdate(update) {
      const { connection, lastDisconnect, isNewLogin, qr } = update;
      if (isNewLogin) sock.isInit = false;

      // Show QR if no code mode
      if (qr && !mcode) {
        if (m?.chat) {
          txtQR = await conn.sendMessage(
            m.chat,
            { image: await qrcode.toBuffer(qr, { scale: 8 }), caption: rtx.trim() },
            { quoted: m }
          );
        } else return;

        if (txtQR && txtQR.key) {
          setTimeout(() => {
            conn.sendMessage(m.sender, { delete: txtQR.key });
          }, 30000);
        }
        return;
      }

      // 8-digit code mode
      if (qr && mcode) {
        let fixTe = text ? text.replace(/\D/g, "") : m.sender.split("@")[0];
        let secret = await sock.requestPairingCode(fixTe);
        secret = secret.match(/.{1,4}/g)?.join("-");

        txtCode = await conn.sendMessage(m.chat, { text: rtx2 }, { quoted: m });
        codeBot = await m.reply(secret);
      }

      if (txtCode && txtCode.key) {
        setTimeout(() => {
          conn.sendMessage(m.sender, { delete: txtCode.key });
        }, 30000);
      }
      if (codeBot && codeBot.key) {
        setTimeout(() => {
          conn.sendMessage(m.sender, { delete: codeBot.key });
        }, 30000);
      }

      const endSession = async (loaded) => {
        if (!loaded) {
          try {
            sock.ws.close();
          } catch {}
          sock.ev.removeAllListeners();
          let i = globalThis.conns.indexOf(sock);
          if (i < 0) return;
          delete globalThis.conns[i];
          globalThis.conns.splice(i, 1);
        }
      };

      const reason =
        lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;

      // Handle disconnections and reconnections
      if (connection === "close") {
        if (
          reason === 428 ||
          reason === DisconnectReason.connectionClosed ||
          reason === DisconnectReason.connectionLost
        ) {
          console.log(`\n${chalk.bold.whiteBright.bgRed("WARNING:")} ${chalk.bold.magentaBright(`Trying to reconnect to +${path.basename(pathSanJadiBot)}...`)}`);
          await sleep(1000);
          await creloadHandler(true).catch(console.error);
        }

        if (reason === 408) {
          console.log(`\n${chalk.bold.whiteBright.bgRed("WARNING:")} ${chalk.bold.magentaBright(`Trying to reconnect to +${path.basename(pathSanJadiBot)}.`)}`);
          await creloadHandler(true).catch(console.error);
        }

        if (reason === 440) {
          console.log(`\n${chalk.bold.whiteBright.bgRed("WARNING:")} ${chalk.bold.magentaBright(`The connection for +${path.basename(pathSanJadiBot)} was replaced by another active session.`)}`);
        }

        if (reason == 405 || reason == 401) {
          console.log(`\n${chalk.bold.whiteBright.bgRed("WARNING:")} ${chalk.bold.magentaBright(`No active session found for +${path.basename(pathSanJadiBot)}.`)}`);
          fs.rmdirSync(pathSanJadiBot, { recursive: true });
        }

        if (reason === 500) {
          console.log(`\n${chalk.bold.whiteBright.bgRed("WARNING:")} ${chalk.bold.magentaBright(`Lost session for +${path.basename(pathSanJadiBot)}, deleting data..`)}`);
          return creloadHandler(true).catch(console.error);
        }

        if (reason === 515) {
          console.log(`\n${chalk.bold.whiteBright.bgRed("WARNING:")} ${chalk.bold.magentaBright(`Automatic restart for +${path.basename(pathSanJadiBot)}.`)}`);
          await creloadHandler(true).catch(console.error);
        }

        if (reason === 403) {
          console.log(`\n${chalk.bold.whiteBright.bgRed("WARNING:")} ${chalk.bold.magentaBright(`Session closed for +${path.basename(pathSanJadiBot)}.`)}`);
          fs.rmdirSync(pathSanJadiBot, { recursive: true });
        }
      }

      if (globalThis.db.data == null) loadDatabase();
      if (connection == "open") {
        if (!globalThis.db.data?.users) loadDatabase();
        await joinChannels(sock);
        const isCode = /^(qr|code)$/.test(command);

        if (m && conn && isCode && commandFlags[m.sender]) {
          await conn.sendMessage(m.chat, { text: `🕸 Successfully linked a new *Sub Bot*.` }, { quoted: m });
          delete commandFlags[m.sender];
        }

        let userName = sock.authState.creds.me.name || "Anonymous";
        let userJid = sock.authState.creds.me.jid || `${path.basename(pathSanJadiBot)}`;
        console.log(`\n${chalk.bold.whiteBright.bgGreen("INFO:")} ${chalk.bold.cyanBright(`+${userJid.split("@")[0]} Connected.`)}`);
        sock.isInit = true;
        globalThis.conns.push(sock);
      }
    }

    setInterval(async () => {
      if (!sock.user) {
        try {
          sock.ws.close();
        } catch (e) {}
        sock.ev.removeAllListeners();
        let i = globalThis.conns.indexOf(sock);
        if (i < 0) return;
        delete globalThis.conns[i];
        globalThis.conns.splice(i, 1);
      }
    }, 60000);

    let handler = await import("../handler.js");

    let creloadHandler = async function (restartConn) {
      try {
        const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error);
        if (Object.keys(Handler || {}).length) handler = Handler;
      } catch (e) {
        console.error("♡ New error: ", e);
      }

      if (restartConn) {
        const oldChats = sock.chats;
        try {
          sock.ws.close();
        } catch {}
        sock.ev.removeAllListeners();
        sock = makeWASocket(connectionOptions, { chats: oldChats });
        isInit = true;
      }

      if (!isInit) {
        sock.ev.off("messages.upsert", sock.handler);
        sock.ev.off("connection.update", sock.connectionUpdate);
        sock.ev.off("creds.update", sock.credsUpdate);
      }

      sock.handler = handler.handler.bind(sock);
      sock.connectionUpdate = connectionUpdate.bind(sock);
      sock.credsUpdate = saveCreds.bind(sock, true);
      sock.ev.on("messages.upsert", sock.handler);
      sock.ev.on("connection.update", sock.connectionUpdate);
      sock.ev.on("creds.update", sock.credsUpdate);
      isInit = false;
      return true;
    };

    creloadHandler(false);
  });
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes > 0 ? minutes : "";
  seconds = seconds < 10 && minutes > 0 ? "0" + seconds : seconds;

  if (minutes) {
    return `${minutes} minute${minutes > 1 ? "s" : ""}, ${seconds} second${seconds > 1 ? "s" : ""}`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""}`;
  }
}

async function joinChannels(sock) {
  for (const value of Object.values(global.my)) {
    if (typeof value === "string" && value.endsWith("@newsletter")) {
      await sock.newsletterFollow(value).catch(() => {});
    }
  }
}
