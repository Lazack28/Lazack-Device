// index.js — updated for Heroku + defensive fixes
// Keep the general structure and behavior from original Lazack-Device V2

//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0' // allow TLS (helps with self-signed certs used by some integrations)

import './settings.js'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile, readdirSync, statSync, unlinkSync, existsSync, mkdirSync, readFileSync, rmSync, watch } from 'fs'
import cfonts from 'cfonts'
import { createRequire } from 'module'
import { fileURLToPath, pathToFileURL } from 'url'
import { platform } from 'process'
import * as ws from 'ws'
import fs from 'fs'
import yargs from 'yargs';
import smartAutoReactNewsletter from './lazackcmds/channelreact.js';
import { spawn } from 'child_process'
import * as cp from 'child_process'
import lodash from 'lodash'
import { LazackBots } from './lazackcmds/lazack.js'
import chalk from 'chalk'
import syntaxerror from 'syntax-error'
import os from 'os'
import { format } from 'util'
import boxen from 'boxen'
import pino from 'pino'
import path, { join, dirname } from 'path'
import { Boom } from '@hapi/boom'
import { makeWASocket, protoType, serialize } from './lib/simple.js'
import { Low, JSONFile } from 'lowdb'
import { mongoDB, mongoDBV2 } from './lib/mongoDB.js'
import store from './lib/store.js'
const { proto } = (await import('@whiskeysockets/baileys')).default
import pkg from 'google-libphonenumber'
const { PhoneNumberUtil } = pkg
const phoneUtil = PhoneNumberUtil.getInstance()
const { DisconnectReason, useMultiFileAuthState, MessageRetryMap, getContentType, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser, Browsers } = await import('@whiskeysockets/baileys')
import readline, { createInterface } from 'readline'
import NodeCache from 'node-cache'
const { CONNECTING } = ws
const { chain } = lodash

// Heroku port or fallback - FIXED: Parse as number and validate range
let PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Validate port range (0-65535)
if (isNaN(PORT) || PORT < 0 || PORT > 65535) {
    console.error(chalk.bold.red(`Invalid port number: ${PORT}. Using default 3000.`));
    PORT = 3000;
}

console.log(chalk.bold.redBright(`\n✰ Starting Lazack-Device V2 ✰\n`))

// FIX: Use cfonts.say() directly instead of destructuring
cfonts.say('Lazack-Device V2', {
  font: 'block',
  align: 'center',
  colors: ['magentaBright']
})

cfonts.say(`Developed By • Lazack28`, {
  font: 'console',
  align: 'center',
  colors: ['blueBright']
})

protoType()
serialize()

// --- Defensive global helpers (fix missing globals that caused runtime errors) ---
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
  return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString();
}
global.__dirname = function dirname(pathURL) {
  return path.dirname(global.__filename(pathURL, true))
}
global.__require = function require(dir = import.meta.url) {
  return createRequire(dir)
}

// Ensure essential globals exist (tune names as required)
global.sessions = global.sessions || 'sessions'         // session folder
global.jadi = global.jadi || 'jadi'                   // jadi bots folder name
global.yukiJadibts = typeof global.yukiJadibts === 'boolean' ? global.yukiJadibts : true
global.botNumber = global.botNumber || ''             // optional
global.owner = global.owner || [['1234567890']]      // default placeholder owner list
global.mods = global.mods || []
global.prems = global.prems || []
global.APIs = global.APIs || {}
global.APIKeys = global.APIKeys || {}
global.moneda = global.moneda || 'coins'

// atob shim for Node (used in console filters)
global.atob = global.atob || ((str) => Buffer.from(str, 'base64').toString('binary'))

// Create required folders if missing
if (!existsSync(global.sessions)) mkdirSync(global.sessions, { recursive: true })
if (!existsSync(global.jadi)) mkdirSync(global.jadi, { recursive: true })

global.API = (name, pathStr = '/', query = {}, apikeyqueryname) =>
  (name in global.APIs ? global.APIs[name] : name) +
  pathStr +
  (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '');

global.timestamp = { start: new Date() }

const __dirname = global.__dirname(import.meta.url)

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp('^[#/!.]')

// --- lowdb initialization with guard for cloud adapter ---
let dbAdapter = null
if (/https?:\/\//.test(global.opts['db'] || '')) {
  try {
    // try to require a cloud adapter if project provided one (optional)
    const { CloudDBAdapter } = await import('./lib/cloudDBAdapter.js').catch(() => ({}))
    if (CloudDBAdapter) dbAdapter = new CloudDBAdapter(global.opts['db'])
  } catch (e) {
    console.warn('cloudDBAdapter not available, falling back to JSONFile', e)
  }
}
global.db = new Low(dbAdapter || new JSONFile('./database.json'))

global.DATABASE = global.db
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) {
    return new Promise((resolve) => setInterval(async function () {
      if (!global.db.READ) {
        clearInterval(this)
        resolve(global.db.data == null ? global.loadDatabase() : global.db.data);
      }
    }, 1000))
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

// --- Authentication state for Baileys (uses the sessions folder) ---
const { state, saveState, saveCreds } = await useMultiFileAuthState(global.sessions)
const msgRetryCounterMap = (MessageRetryMap) => { };
const msgRetryCounterCache = new NodeCache()
const { version } = await fetchLatestBaileysVersion();
let phoneNumber = global.botNumber

const methodCodeQR = process.argv.includes("qr")
const methodCode = !!phoneNumber || process.argv.includes("code")
const MethodMobile = process.argv.includes("mobile")
const colorOption = chalk.bgMagenta.white
const qrOption = chalk.bold.green
const textOption = chalk.bold.cyan
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))

let option
if (methodCodeQR) {
  option = '1'
}
if (!methodCodeQR && !methodCode && !fs.existsSync(`./${global.sessions}/creds.json`)) {
  do {
    option = await question(colorOption('⌨ Select an option:\n') + qrOption('1. With QR code\n') + textOption('2. With 8-digit text code\n--> '))

    if (!/^[1-2]$/.test(option)) {
      console.log(chalk.bold.redBright(`✦ Only numbers 1 or 2 are allowed, no letters or special symbols.`))
    }
  } while (option !== '1' && option !== '2' || fs.existsSync(`./${global.sessions}/creds.json`))
}

console.info = () => {}
console.debug = () => {}

// Connection options for WhatsApp socket
const connectionOptions = {
  logger: pino({ level: 'silent' }), // Logging level set to silent
  printQRInTerminal: option == '1' ? true : methodCodeQR ? true : false, // Show QR code in terminal if option 1 or QR method
  mobile: MethodMobile, // Use mobile mode if MethodMobile is true
  browser: option == '1' ? Browsers.macOS("Desktop") : methodCodeQR ? Browsers.macOS("Desktop") : Browsers.macOS("Chrome"), // Browser type for connection
  auth: {
    creds: state.creds, // Authentication credentials
    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })), // Signal key store
  },
  markOnlineOnConnect: true, // Mark as online when connected
  generateHighQualityLinkPreview: true, // Enable high quality link previews
  getMessage: async (key) => {
    let jid = jidNormalizedUser(key.remoteJid)
    let msg = await store.loadMessage(jid, key.id)
    return msg?.message || ""
  },
  msgRetryCounterCache, // Message retry cache
  msgRetryCounterMap, // Message retry map
  defaultQueryTimeoutMs: undefined, // Default query timeout
  version, // WhatsApp protocol version
}

global.conn = makeWASocket(connectionOptions);

// ADDED: Debug connection status
console.log(chalk.bold.cyan('Socket created, user ID:'), global.conn?.user?.id || 'Not connected yet')

if (!fs.existsSync(`./${global.sessions}/creds.json`)) {
  if (option === '2' || methodCode) {
    option = '2'
    if (!global.conn.authState.creds.registered) {
      let addNumber
      if (!!phoneNumber) {
        addNumber = phoneNumber.replace(/[^0-9]/g, '')
      } else {
        do {
          phoneNumber = await question(chalk.bgBlack(chalk.bold.greenBright(`✦ Please enter the WhatsApp number.\n${chalk.bold.yellowBright(`✏  Example: 255×××××××`)}\n${chalk.bold.magentaBright('---> ')}`)))
          phoneNumber = phoneNumber.replace(/\D/g, '')
          if (!phoneNumber.startsWith('+')) {
            phoneNumber = `+${phoneNumber}`
          }
        } while (!await isValidPhoneNumber(phoneNumber))
        rl.close()
        addNumber = phoneNumber.replace(/\D/g, '')
        setTimeout(async () => {
          let codeBot = await global.conn.requestPairingCode(addNumber).catch(() => null)
          codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot
          console.log(chalk.bold.white(chalk.bgMagenta(`✧ LINKING CODE ✧`)), chalk.bold.white(chalk.white(codeBot)))
        }, 3000)
      }
    }
  }
}

conn.isInit = false;
conn.well = false;

if (!opts['test']) {
  if (global.db) setInterval(async () => {
    if (global.db.data) await global.db.write()
    if (opts['autocleartmp'] && (global.support || {}).find) {
      const tmp = [os.tmpdir(), 'tmp', `${global.jadi}`]
      tmp.forEach((filename) => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete']))
    }
  }, 30 * 1000);
}

async function connectionUpdate(update) {
  const { connection, lastDisconnect, isNewLogin } = update;
  global.stopped = connection;
  if (isNewLogin) conn.isInit = true;
  const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
  if (code && code !== DisconnectReason.loggedOut && conn?.ws?.socket == null) {
    await global.reloadHandler(true).catch(console.error);
    global.timestamp.connect = new Date;
  }
  if (global.db.data == null) await loadDatabase();
  if ((update.qr != 0 && update.qr != undefined) || methodCodeQR) {
    if (option == '1' || methodCodeQR) {
      console.log(chalk.bold.yellow(`\n❐ SCAN THE QR CODE, IT EXPIRES IN 45 SECONDS`))
    }
  }
  if (connection == 'open') {
    console.log(chalk.bold.green('\n❀ Lazack Device Connected Successfully ❀'))
    // ADDED: Debug - check if handler is attached
    console.log(chalk.bold.cyan('Connection open, checking handler attachment...'))
    console.log(chalk.bold.cyan('Event listeners count (messages.upsert):'), 
      global.conn?.ev?.listenerCount?.('messages.upsert') || 'N/A')
  }
  let reason = new Boom(lastDisconnect?.error)?.output?.statusCode
  if (connection === 'close') {
    if (reason === DisconnectReason.badSession) {
      console.log(chalk.bold.cyanBright(`\n⚠︎ NO CONNECTION, DELETE THE ${global.sessions} FOLDER AND SCAN THE QR CODE ⚠︎`))
    } else if (reason === DisconnectReason.connectionClosed) {
      console.log(chalk.bold.magentaBright(`\n⚠︎ CONNECTION CLOSED, RECONNECTING....`))
      await global.reloadHandler(true).catch(console.error)
    } else if (reason === DisconnectReason.connectionLost) {
      console.log(chalk.bold.blueBright(`\n⚠︎ CONNECTION LOST WITH THE SERVER, RECONNECTING....`))
      await global.reloadHandler(true).catch(console.error)
    } else if (reason === DisconnectReason.connectionReplaced) {
      console.log(chalk.bold.yellowBright(`\n⚠︎ CONNECTION REPLACED, ANOTHER SESSION HAS BEEN OPENED.`))
    } else if (reason === DisconnectReason.loggedOut) {
      console.log(chalk.bold.redBright(`\n⚠︎ LOGGED OUT, DELETE THE ${global.sessions} FOLDER AND SCAN THE QR CODE ⚠︎`))
      await global.reloadHandler(true).catch(console.error)
    } else if (reason === DisconnectReason.restartRequired) {
      console.log(chalk.bold.cyanBright(`\n✧ CONNECTING TO SERVER...`))
      await global.reloadHandler(true).catch(console.error)
    } else if (reason === DisconnectReason.timedOut) {
      console.log(chalk.bold.yellowBright(`\n⧖ CONNECTION TIMEOUT, RECONNECTING....`))
      await global.reloadHandler(true).catch(console.error)
    } else {
      console.log(chalk.bold.redBright(`\n⚠︎！ UNKNOWN DISCONNECTION REASON: ${reason || 'Not found'} >> ${connection || 'Not found'}`))
    }
  }
}
process.on('uncaughtException', console.error)

let isInit = true;
let handler = await import('./handler.js')

// ADDED: Debug handler loading
console.log(chalk.bold.cyan('Handler loaded:'), typeof handler?.handler === 'function' ? 'YES' : 'NO')

global.reloadHandler = async function (restatConn) {
  console.log(chalk.bold.yellow('[reloadHandler] called, restatConn:'), restatConn)
  
  try {
    const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error);
    if (Object.keys(Handler || {}).length) {
      handler = Handler
      console.log(chalk.bold.green('[reloadHandler] Handler reloaded successfully'))
    } else {
      console.log(chalk.bold.red('[reloadHandler] Handler reload failed - empty object'))
    }
  } catch (e) {
    console.error(chalk.bold.red('[reloadHandler] Handler reload error:'), e);
  }
  
  if (restatConn) {
    const oldChats = global.conn.chats
    try {
      global.conn.ws.close()
    } catch { }
    conn.ev.removeAllListeners()
    global.conn = makeWASocket(connectionOptions, { chats: oldChats })
    isInit = true
    console.log(chalk.bold.cyan('[reloadHandler] Connection restarted'))
  }
  
  if (!isInit) {
    console.log(chalk.bold.yellow('[reloadHandler] Removing old listeners'))
    conn.ev.off('messages.upsert', conn.handler)
    conn.ev.off('connection.update', conn.connectionUpdate)
    conn.ev.off('creds.update', conn.credsUpdate)
  }

  // FIX: Wrap handler to catch errors
  conn.handler = async function(m) {
    try {
      console.log(chalk.bold.magenta('[Handler] Message received'))
      if (m.messages && m.messages[0]) {
        const msg = m.messages[0]
        console.log(chalk.bold.cyan('[Handler] From:'), msg.key.remoteJid)
        console.log(chalk.bold.cyan('[Handler] Message type:'), Object.keys(msg.message || {})[0] || 'none')
      }
      await handler.handler.bind(global.conn)(m)
    } catch (error) {
      console.error(chalk.bold.red('[Handler] Error:'), error)
    }
  }
  
  conn.connectionUpdate = connectionUpdate.bind(global.conn)
  conn.credsUpdate = saveCreds.bind(global.conn, true)

  // Attach event listeners
  conn.ev.on('messages.upsert', conn.handler)
  conn.ev.on('connection.update', conn.connectionUpdate)
  conn.ev.on('creds.update', conn.credsUpdate)
  
  console.log(chalk.bold.green('[reloadHandler] Event listeners attached'))
  console.log(chalk.bold.cyan('[reloadHandler] messages.upsert listeners:'), 
    conn.ev.listenerCount('messages.upsert'))
  
  isInit = false
  return true
}


global.jadiBotPath = join(__dirname, './JadiBots')

if (global.yukiJadibts) {
  if (!existsSync(global.jadiBotPath)) {
    mkdirSync(global.jadiBotPath, { recursive: true })
    console.log(chalk.bold.cyan(`The folder: ${global.jadi} was created successfully.`))
  } else {
    console.log(chalk.bold.cyan(`The folder: ${global.jadi} is already created.`))
  }

  const readJadiBotPath = readdirSync(global.jadiBotPath)
  if (readJadiBotPath.length > 0) {
    const creds = 'creds.json'
    for (const gjbts of readJadiBotPath) {
      const botPath = join(global.jadiBotPath, gjbts)
      const readBotPath = readdirSync(botPath)
      if (readBotPath.includes(creds)) {
        LazackBots({ pathLazackBots: botPath, m: null, conn, args: '', usedPrefix: '/', command: 'pair' })
      }
    }
  }
}

const pluginFolder = global.__dirname(join(__dirname, './lazackcmds/index'))
const pluginFilter = (filename) => /\.js$/.test(filename)
global.plugins = {}

// ADDED: Debug plugin loading
console.log(chalk.bold.cyan('Loading plugins from:'), pluginFolder)

async function filesInit() {
  const files = readdirSync(pluginFolder).filter(pluginFilter)
  console.log(chalk.bold.cyan('Found plugin files:'), files.length)
  
  for (const filename of files) {
    try {
      const file = global.__filename(join(pluginFolder, filename))
      console.log(chalk.bold.yellow('Loading plugin:'), filename)
      const module = await import(file)
      global.plugins[filename] = module.default || module
      console.log(chalk.bold.green('✓ Loaded:'), filename)
    } catch (e) {
      console.error(chalk.bold.red('✗ Failed:'), filename, '-', e.message)
      delete global.plugins[filename]
    }
  }
  console.log(chalk.bold.cyan('Total plugins loaded:'), Object.keys(global.plugins).length)
}

filesInit().then((_) => {
  console.log(chalk.bold.green('✓ All plugins initialized'))
  return Object.keys(global.plugins)
}).catch(console.error);

global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    const dir = global.__filename(join(pluginFolder, filename), true);
    if (filename in global.plugins) {
      if (existsSync(dir)) conn.logger.info(` updated plugin - '${filename}'`)
      else {
        conn.logger.warn(`deleted plugin - '${filename}'`)
        return delete global.plugins[filename]
      }
    } else conn.logger.info(`new plugin - '${filename}'`);
    const err = syntaxerror(readFileSync(dir), filename, {
      sourceType: 'module',
      allowAwaitOutsideFunction: true,
    });
    if (err) conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`)
    else {
      try {
        const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`));
        global.plugins[filename] = module.default || module;
      } catch (e) {
        conn.logger.error(`error require plugin '${filename}\n${format(e)}`)
      } finally {
        global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
      }
    }
  }
}
Object.freeze(global.reload)
watch(pluginFolder, global.reload)

// ADDED: Call reloadHandler with debug
console.log(chalk.bold.cyan('Calling reloadHandler...'))
await global.reloadHandler().catch(e => {
  console.error(chalk.bold.red('Failed to call reloadHandler:'), e)
})

// --- Quick binary/tool checks (safe) ---
async function _quickTest() {
  const test = await Promise.all([
    spawn('ffmpeg'),
    spawn('ffprobe'),
    spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    spawn('convert'),
    spawn('magick'),
    spawn('gm'),
    spawn('find', ['--version']),
  ].map((p) => {
    return Promise.race([
      new Promise((resolve) => {
        p.on('close', (code) => {
          resolve(code !== 127);
        });
      }),
      new Promise((resolve) => {
        p.on('error', (_) => resolve(false));
      })
    ]);
  }));
  const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
  const s = global.support = { ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find };
  Object.freeze(global.support);
}

function clearTmp() {
  try {
    const tmpDir = join(__dirname, 'tmp')
    if (!existsSync(tmpDir)) return
    const filenames = readdirSync(tmpDir)
    filenames.forEach(file => {
      const filePath = join(tmpDir, file)
      try { unlinkSync(filePath) } catch {}
    })
  } catch (e) { console.error(e) }
}

function purgeSession() {
  try {
    let prekey = []
    let directory = readdirSync(`./${global.sessions}`)
    let filesFolderPreKeys = directory.filter(file => file.startsWith('pre-key-'))
    prekey = [...prekey, ...filesFolderPreKeys]
    filesFolderPreKeys.forEach(files => {
      try { unlinkSync(`./${global.sessions}/${files}`) } catch {}
    })
  } catch (e) { /* ignore */ }
}

function purgeSessionSB() {
  try {
    const listDirectories = readdirSync(`./${global.jadi}/`);
    let SBprekey = [];
    listDirectories.forEach(directory => {
      if (statSync(`./${global.jadi}/${directory}`).isDirectory()) {
        const DSBPreKeys = readdirSync(`./${global.jadi}/${directory}`).filter(fileInDir => fileInDir.startsWith('pre-key-'))
        SBprekey = [...SBprekey, ...DSBPreKeys];
        DSBPreKeys.forEach(fileInDir => {
          if (fileInDir !== 'creds.json') {
            try { unlinkSync(`./${global.jadi}/${directory}/${fileInDir}`) } catch {}
          }
        })
      }
    })
    if (SBprekey.length === 0) {
      console.log(chalk.bold.green(`\n╭» ❍ ${global.jadi} ❍\n│→ NOTHING TO DELETE`))
    } else {
      console.log(chalk.bold.cyanBright(`\n╭» ❍ ${global.jadi} ❍\n│→ NON-ESSENTIAL FILES DELETED`))
    }
  } catch (err) {
    console.log(chalk.bold.red(`\n╭» ❍ ${global.jadi} ❍\n│→ AN ERROR OCCURRED\n` + err))
  }
}

function purgeOldFiles() {
  try {
    const directories = [`./${global.sessions}/`, `./${global.jadi}/`]
    directories.forEach(dir => {
      if (!existsSync(dir)) return
      readdirSync(dir).forEach(file => {
        if (file !== 'creds.json') {
          const filePath = path.join(dir, file)
          try {
            unlinkSync(filePath)
            console.log(chalk.bold.green(`\n╭» ❍ FILE ❍\n│→ ${file} DELETED SUCCESSFULLY`))
          } catch (err) {
            console.log(chalk.bold.red(`\n╭» ❍ FILE ❍\n│→ ${file} COULD NOT BE DELETED\n` + err))
          }
        }
      })
    })
  } catch (e) { console.error(e) }
}

function redefineConsoleMethod(methodName, filterStrings) {
  const originalConsoleMethod = console[methodName]
  console[methodName] = function () {
    const message = arguments[0]
    if (typeof message === 'string' && filterStrings.some(filterString => message.includes(global.atob(filterString)))) {
      arguments[0] = ""
    }
    originalConsoleMethod.apply(console, arguments)
  }
}

// Intervals (cleanups)
setInterval(async () => {
  if (global.stopped === 'close' || !global.conn || !global.conn.user) return
  await clearTmp()
  console.log(chalk.bold.cyanBright(`\n╭» ❍ MULTIMEDIA ❍\n│→ TMP FOLDER FILES DELETED`))
}, 1000 * 60 * 4) // 4 min

setInterval(async () => {
  if (global.stopped === 'close' || !global.conn || !global.conn.user) return
  await purgeSession()
  console.log(chalk.bold.cyanBright(`\n╭» ❍ ${global.sessions} ❍\n│→ NON-ESSENTIAL SESSIONS DELETED`))
}, 1000 * 60 * 10) // 10 min

setInterval(async () => {
  if (global.stopped === 'close' || !global.conn || !global.conn.user) return
  await purgeSessionSB()
}, 1000 * 60 * 10)

setInterval(async () => {
  if (global.stopped === 'close' || !global.conn || !global.conn.user) return
  await purgeOldFiles()
  console.log(chalk.bold.cyanBright(`\n╭» ❍ FILES ❍\n│→ RESIDUAL FILES DELETED`))
}, 1000 * 60 * 10)

_quickTest().then(() => conn.logger?.info && conn.logger.info(chalk.bold(`✦  D O N E`.trim()))).catch(console.error)

async function isValidPhoneNumber(number) {
  try {
    number = number.replace(/\s+/g, '')
    if (number.startsWith('+521')) number = number.replace('+521', '+52');
    else if (number.startsWith('+52') && number[4] === '1') number = number.replace('+52 1', '+52');
    const parsedNumber = phoneUtil.parseAndKeepRawInput(number)
    return phoneUtil.isValidNumber(parsedNumber)
  } catch (error) {
    return false
  }
}

// ADDED: Bot status diagnostic
function checkBotStatus() {
  console.log(chalk.bold.cyan('\n=== Bot Status Check ==='))
  console.log(chalk.bold.yellow('Connection:'), global.conn?.user ? 'Connected' : 'Not Connected')
  console.log(chalk.bold.yellow('User ID:'), global.conn?.user?.id || 'None')
  console.log(chalk.bold.yellow('Handler loaded:'), typeof handler?.handler === 'function' ? 'YES' : 'NO')
  console.log(chalk.bold.yellow('Plugins loaded:'), Object.keys(global.plugins || {}).length)
  console.log(chalk.bold.yellow('Event listeners (messages.upsert):'), 
    global.conn?.ev?.listenerCount?.('messages.upsert') || 0)
  console.log(chalk.bold.cyan('========================\n'))
}

// Check status after 10 seconds
setTimeout(checkBotStatus, 10000)

// --- Minimal HTTP health check for Heroku (Express preferred for compatibility) ---
import express from 'express'
const app = express()
app.get('/', (req, res) => res.status(200).send('✅ Lazack-Device V2 is running'))
app.get('/health', (req, res) => res.status(200).json({ 
  ok: true, 
  uptime: process.uptime(),
  botConnected: !!global.conn?.user,
  pluginsLoaded: Object.keys(global.plugins || {}).length
}))

// Start ONLY ONE HTTP server for Heroku
app.listen(PORT, () => {
  console.log(chalk.bold.green(`HTTP server started for Heroku health checks on port ${PORT}`))
})

// Optional: Remove TLS warning line for production (Heroku handles SSL)
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0' // Comment out or remove for production
