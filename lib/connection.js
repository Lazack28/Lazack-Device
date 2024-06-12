const pino = require("pino");
const path = require("path");
const fs = require("fs");
const plugins = require("./plugins");
const {
  default: makeWASocket,
  loadSession,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  Browsers,
  delay,
  makeCacheableSignalKeyStore,
  DisconnectReason,
} = require("baileys");
const { PausedChats } = require("../assets/database");
const config = require("../config");
const { serialize, Greetings } = require("./index");
const { Image, Message, Sticker, Video, AllMessage } = require("./Messages");
const io = require("socket.io-client");
const {
  loadMessage,
  saveMessage,
  saveChat,
  getName,
} = require("../assets/database/StoreDb");
const logger = pino({ level: "silent" });

const connect = async () => {
  const sessionDir = "./session";
  if (!fs.existsSync(sessionDir)) fs.mkdirSync(sessionDir);

  const { state, saveCreds } = await useMultiFileAuthState(
    path.join(__basedir, sessionDir)
  );
  const { version } = await fetchLatestBaileysVersion();

  const conn = makeWASocket({
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
    printQRInTerminal: true,
    logger,
    browser: Browsers.macOS("Desktop"),
    downloadHistory: false,
    syncFullHistory: false,
    markOnlineOnConnect: false,
    emitOwnEvents: true,
    version,
    getMessage: async (key) =>
      (loadMessage(key.id) || {}).message || { conversation: null },
  });

  const ws = io("https://socket.xasena.me/", { reconnection: true });
  ws.on("connect", () => console.log("Connected to server"));
  ws.on("disconnect", () => console.log("Disconnected from server"));

  conn.ev.on("connection.update", handleConnectionUpdate(conn, ws));
  conn.ev.on("creds.update", saveCreds);
  conn.ev.on("group-participants.update", async (data) =>
    Greetings(data, conn)
  );
  conn.ev.on("chats.update", async (chats) =>
    chats.forEach(async (chat) => await saveChat(chat))
  );
  conn.ev.on("messages.upsert", handleMessages(conn, ws));
  
  process.on("unhandledRejection", async (err) => {
    const text = `\`\`\`lazack unhandledRejection: \n${err}\`\`\``;
    await conn.sendMessage(conn.user.id, { text });
    console.log(err);
  });
  process.on("uncaughtException", async (err) => {
    const text = `\`\`\`lazack uncaughtException: \n${err}\`\`\``;
    await conn.sendMessage(conn.user.id, { text });
    console.log(err);
  });
  return conn;
};

const handleConnectionUpdate = (conn, ws) => async (s) => {
  const { connection, lastDisconnect } = s;
  if (connection === "connecting")
    console.log("Connecting to WhatsApp... Please Wait.");
  else if (connection === "open") {
    console.log("Login Successful!");
    const packageVersion = require("../package.json").version;
    const totalPlugins = plugins.commands.length;
    const workType = config.WORK_TYPE;
    const str = `\`\`\`lazack connected\nVersion: ${packageVersion}\nTotal Plugins: ${totalPlugins}\nWorktype: ${workType}\`\`\``;
    conn.sendMessage(conn.user.id, { text: str });
  } else if (connection === "close") {
    if (
      lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut
    ) {
      ws.disconnect();
      await delay(300);
      connect();
      console.log("Reconnecting...");
    } else {
      console.log("Connection closed. Device logged out.");
      await delay(3000);
      process.exit(0);
    }
  }
};

const handleMessages = (conn, ws) => async (m) => {
  if (m.type !== "notify") return;
  let msg = await serialize(JSON.parse(JSON.stringify(m.messages[0])), conn);
  await saveMessage(m.messages[0], msg.sender);
  if (config.AUTO_READ) await conn.readMessages(msg.key);
  if (config.AUTO_STATUS_READ && msg.from === "status@broadcast")
    await conn.readMessages(msg.key);

  let text_msg = msg.body;
  if (!msg) return;

  const regex = new RegExp(`${config.HANDLERS}( ?resume)`, "is");
  const isResume = regex.test(text_msg);
  const chatId = msg.from;
  const pausedChats = await PausedChats.getPausedChats();

  if (
    pausedChats.some((pausedChat) => pausedChat.chatId === chatId && !isResume)
  )
    return;

  if (config.LOGS) {
    const name = await getName(msg.sender);
    const groupName = msg.from.endsWith("@g.us")
      ? (await conn.groupMetadata(msg.from)).subject
      : msg.from;
    console.log(
      `At : ${groupName}\nFrom : ${name}\nMessage:${
        text_msg ? text_msg : msg.type
      }`
    );
  }
  var whats;
  plugins.commands.map(async (command) => {
    if (command.fromMe && !msg.sudo) return;

    const handleCommand = (Instance, args) => {
      whats = new Instance(conn, msg);
      command.function(whats, ...args, msg, conn, m);
    };

    if (text_msg && command.pattern) {
      let iscommand = text_msg.match(command.pattern);
      if (iscommand) {
        let [, prefix, , match] = iscommand;
        match = match ? match : false;
        msg.prefix = prefix;
        msg.command = [prefix, iscommand[2]].join("");
        handleCommand(Message, [match]);
      }
    } else {
      switch (command.on) {
        case "text":
          if (text_msg) handleCommand(Message, [text_msg]);
          break;
        case "image":
          if (msg.type === "imageMessage") handleCommand(Image, [text_msg]);
          break;
        case "sticker":
          if (msg.type === "stickerMessage") handleCommand(Sticker, []);
          break;
        case "video":
          if (msg.type === "videoMessage") handleCommand(Video, []);
          break;
        case "delete":
          if (msg.type === "protocolMessage") {
            whats = new Message(conn, msg);
            whats.messageId = msg.message.protocolMessage.key?.id;
            command.function(whats, msg, conn, m);
          }
          break;
        case "message":
          handleCommand(AllMessage, []);
          break;
        default:
          break;
      }
    }
  });
};

module.exports = connect;
