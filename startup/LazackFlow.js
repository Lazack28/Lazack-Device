process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'
import './config.js'
import { createRequire } from 'module'
import path, { join } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { platform } from 'process'
import * as ws from 'ws'
import fs, { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watchFile, unwatchFile } from 'fs'
import yargs from 'yargs'
import { spawn } from 'child_process'
import lodash from 'lodash'
import chalk from 'chalk'
import syntaxerror from 'syntax-error'
import { tmpdir } from 'os'
import { format } from 'util'
import pino from 'pino'
import { Boom } from '@hapi/boom'
import { makeWASocket, protoType, serialize } from '../lib/simple.js'
import { Low, JSONFile } from 'lowdb'
import readline from 'readline'
import NodeCache from 'node-cache'
import pkg from 'google-libphonenumber'
const { PhoneNumberUtil } = pkg
const phoneUtil = PhoneNumberUtil.getInstance()
const { DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser } = await import('@whiskeysockets/baileys')
const { chain } = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000
protoType()
serialize()

global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
  return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString();
}
global.__dirname = function dirname(pathURL) {
  return path.dirname(global.__filename(pathURL, true));
}
global.__require = function require(dir = import.meta.url) {
  return createRequire(dir);
}
global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({...query, ...(apikeyqueryname ? {[apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]} : {})})) : '')
global.timestamp = { start: new Date }
const __dirname = global.__dirname(import.meta.url)
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp('^[#/.]')
global.db = new Low(new JSONFile('media/database/database.json'))
global.DATABASE = global.db
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) {
    return new Promise((resolve) => setInterval(async function() {
      if (!global.db.READ) {
        clearInterval(this)
        resolve(global.db.data == null ? global.loadDatabase() : global.db.data)
      }
    }, 1 * 1000))
  }
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read().catch(console.error)
  global.db.READ = null
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(global.db.data || {}),
  }
  global.db.chain = chain(global.db.data)
}
await loadDatabase()

global.chatgpt = new Low(new JSONFile(path.join(__dirname, '/db/chatgpt.json')))
global.loadChatgptDB = async function loadChatgptDB() {
  if (global.chatgpt.READ) {
    return new Promise((resolve) =>
      setInterval(async function() {
        if (!global.chatgpt.READ) {
          clearInterval(this)
          resolve(global.chatgpt.data === null ? global.loadChatgptDB() : global.chatgpt.data)
        }
      }, 1 * 1000)
    )
  }
  if (global.chatgpt.data !== null) return
  global.chatgpt.READ = true
  await global.chatgpt.read().catch(console.error)
  global.chatgpt.READ = null
  global.chatgpt.data = {
    users: {},
    ...(global.chatgpt.data || {}),
  }
  global.chatgpt.chain = lodash.chain(global.chatgpt.data)
}
await loadChatgptDB()

global.authFile = 'session'
const credsPath = path.join(__dirname, '../', global.authFile, 'creds.json')
if (!fs.existsSync(credsPath)) {
  console.log(chalk.bold.redBright(`\n⚠️ creds.json not found in ${credsPath}. Please add your credentials file and restart the bot.`))
  process.exit(1)
}

const { state, saveCreds } = await useMultiFileAuthState(global.authFile)
const msgRetryCounterCache = new NodeCache()
const { version } = await fetchLatestBaileysVersion()

const filterStrings = [
  "Q2xvc2luZyBzdGFsZSBvcGVu", // "Closing stable open"
  "Q2xvc2luZyBvcGVuIHNlc3Npb24=", // "Closing open session"
  "RmFpbGVkIHRvIGRlY3J5cHQ=", // "Failed to decrypt"
  "U2Vzc2lvbiBlcnJvcg==", // "Session error"
  "RXJyb3I6IEJhZCBNQUM=", // "Error: Bad MAC"
  "RGVjcnlwdGVkIG1lc3NhZ2U=" // "Decrypted message"
]
console.info = () => {}
console.debug = () => {}
// Redefine console methods to filter out specific log messages
function redefineConsoleMethod(methodName, filterStrings) {
  const originalConsoleMethod = console[methodName]
  console[methodName] = function() {
    const message = arguments[0]
    if (typeof message === 'string' && filterStrings.some(filterString => message.includes(atob(filterString)))) {
      arguments[0] = ""
    }
    originalConsoleMethod.apply(console, arguments)
  }
}
['log', 'warn', 'error'].forEach(methodName => redefineConsoleMethod(methodName, filterStrings))

const connectionOptions = {
  logger: pino({ level: 'silent' }),
  browser: ['Lazack-bot', 'Edge', '20.0.04'],
  auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" })),
  },
  markOnlineOnConnect: true,
  generateHighQualityLinkPreview: true,
  syncFullHistory: false,
  getMessage: async (key) => {
    let jid = jidNormalizedUser(key.remoteJid)
    let msg = await store.loadMessage(jid, key.id)
    return msg?.message || ""
  },
  msgRetryCounterCache,
  defaultQueryTimeoutMs: undefined,
  version: [2, 3000, 1015901307],
}

global.conn = makeWASocket(connectionOptions)
conn.isInit = false
conn.well = false

// Connection update handler
async function connectionUpdate(update) {
  const { connection, lastDisconnect, isNewLogin } = update
  global.stopped = connection
  if (isNewLogin) conn.isInit = true
  const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
  if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
    await global.reloadHandler(true).catch(console.error)
    global.timestamp.connect = new Date
  }
  if (global.db.data == null) loadDatabase()
  if (connection == 'open') {
    console.log(chalk.bold.greenBright(`\n❒⸺⸺⸺⸺【• CONNECTED •】⸺⸺⸺⸺❒\n│\n│ 🟢 Successfully connected to WhatsApp.\n│\n❒⸺⸺⸺⸺【• CONNECTED •】⸺⸺⸺⸺❒`))
  }
  let reason = new Boom(lastDisconnect?.error)?.output?.statusCode
  if (connection === 'close') {
    if (reason === DisconnectReason.badSession) {
      console.log(chalk.bold.cyanBright("⚠️ NO CONNECTION, DELETE THE FOLDER session AND SCAN THE QR CODE ⚠️"))
    } else if (reason === DisconnectReason.connectionClosed) {
      console.log(chalk.bold.magentaBright("╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☹\n┆ ⚠️ CONNECTION CLOSED, RECONNECTING....\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☹"))
      await global.reloadHandler(true).catch(console.error)
    } else if (reason === DisconnectReason.connectionLost) {
      console.log(chalk.bold.blueBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☂\n┆ ⚠️ CONNECTION LOST WITH SERVER, RECONNECTING....\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☂`))
      await global.reloadHandler(true).catch(console.error)
    } else if (reason === DisconnectReason.connectionReplaced) {
      console.log(chalk.bold.yellowBright("╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✗\n┆ ⚠️ CONNECTION REPLACED, ANOTHER SESSION HAS BEEN OPENED, PLEASE CLOSE THE CURRENT SESSION FIRST.\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✗"))
    } else if (reason === DisconnectReason.loggedOut) {
      console.log(chalk.bold.redBright(`\n⚠️ NO CONNECTION, DELETE THE FOLDER session AND SCAN THE QR CODE ⚠️`))
      await global.reloadHandler(true).catch(console.error)
    } else if (reason === DisconnectReason.restartRequired) {
      console.log(chalk.bold.cyanBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✓\n┆ 🎩 CONNECTING TO SERVER...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✓`))
      await global.reloadHandler(true).catch(console.error)
    } else if (reason === DisconnectReason.timedOut) {
      console.log(chalk.bold.yellowBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ▸\n┆ ⌛ CONNECTION TIMEOUT, RECONNECTING....\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ▸`))
      await global.reloadHandler(true).catch(console.error)
    } else {
      console.log(chalk.bold.redBright(`\n⚠️❗ UNKNOWN DISCONNECTION REASON: ${reason || 'Not found'} >> ${connection || 'Not found'}`))
    }
  }
}
process.on('uncaughtException', console.error)

let isInit = true
let handler = await import('./handler.js')
global.reloadHandler = async function(restatConn) {
  try {
    const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error)
    if (Object.keys(Handler || {}).length) handler = Handler
  } catch (e) {
    console.error(e)
  }
  if (restatConn) {
    const oldChats = global.conn.chats
    try {
      global.conn.ws.close()
    } catch { }
    conn.ev.removeAllListeners()
    global.conn = makeWASocket(connectionOptions, { chats: oldChats })
    isInit = true
  }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler)
    conn.ev.off('connection.update', conn.connectionUpdate)
    conn.ev.off('creds.update', conn.credsUpdate)
  }
  conn.handler = handler.handler.bind(global.conn)
  conn.connectionUpdate = connectionUpdate.bind(global.conn)
  conn.credsUpdate = saveCreds.bind(global.conn, true)
  conn.ev.on('messages.upsert', conn.handler)
  conn.ev.on('connection.update', conn.connectionUpdate)
  conn.ev.on('creds.update', conn.credsUpdate)
  isInit = false
  return true
}

const pluginFolder = global.__dirname(join(__dirname, '../lazackcmds/index'))
const pluginFilter = (filename) => /\.js$/.test(filename)
global.plugins = {}
async function filesInit() {
  for (const filename of readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      const file = global.__filename(join(pluginFolder, filename))
      const module = await import(file)
      global.plugins[filename] = module.default || module
    } catch (e) {
      conn.logger.error(e)
      delete global.plugins[filename]
    }
  }
}
filesInit().then((_) => Object.keys(global.plugins)).catch(console.error)

global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    const dir = global.__filename(join(pluginFolder, filename), true)
    if (filename in global.plugins) {
      if (existsSync(dir)) conn.logger.info(`UPDATED - '${filename}' SUCCESSFULLY`)
      else {
        conn.logger.warn(`A FILE WAS DELETED: '${filename}'`)
        return delete global.plugins[filename]
      }
    } else conn.logger.info(`NEW PLUGIN DETECTED: '${filename}'`)
    const err = syntaxerror(readFileSync(dir), filename, {
      sourceType: 'module',
      allowAwaitOutsideFunction: true,
    })
    if (err) conn.logger.error(`SYNTAX ERROR WHILE LOADING '${filename}'\n${format(err)}`)
    else {
      try {
        const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`))
        global.plugins[filename] = module.default || module
      } catch (e) {
        conn.logger.error(`ERROR LOADING PLUGIN '${filename}\n${format(e)}'`)
      } finally {
        global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
      }
    }
  }
}
Object.freeze(global.reload)
watchFile(fileURLToPath(import.meta.url), () => {
  unwatchFile(fileURLToPath(import.meta.url))
  console.log(chalk.bold.greenBright("Updated"))
  import(`${fileURLToPath(import.meta.url)}?update=${Date.now()}`)
})

// Validate if a phone number is valid using google-libphonenumber
async function isValidPhoneNumber(number) {
  try {
    number = number.replace(/\s+/g, '')
    if (number.startsWith('+521')) {
      number = number.replace('+521', '+52')
    } else if (number.startsWith('+52') && number[4] === '1') {
      number = number.replace('+52 1', '+52')
    }
    const parsedNumber = phoneUtil.parseAndKeepRawInput(number)
    return phoneUtil.isValidNumber(parsedNumber)
  } catch (error) {
    return false
  }
}