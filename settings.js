import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//*─────────────────────────────*

//BETA: If you want to avoid typing the number that will be the bot in the console, add it here:
//Only applies for option 2 (being a bot with 8-digit text code)
global.botNumber = '' //Example: 255734980103

//*─────────────────────────────*

global.owner = [
// <-- Number @s.whatsapp.net -->
  ['255734980103', 'LAZACK28', true],
  ['255613868502', 'LAZACK28', true],
  
// <-- Number @lid -->
  ['', 'lAZACK', true],
  ['', '', true], 
  ['', '', true]
];

//*─────────────────────────────*

global.mods = []
global.suittag = ['255734980103'] 
global.prems = []

//*─────────────────────────────*

global.library = 'Baileys'
global.baileys = 'V 6.7.17' 
global.vs = '2.2.5'
global.nameqr = 'LAZACK DEVICE'
global.namebot = 'LAZACK-DEVICE'
global.sessions = 'session'
global.jadi = 'JadiBots' 
global.yukiJadibts = true

//*─────────────────────────────*

global.packname = '⪛✰ LAZACK-DEVICE ✰⪜'
global.botname = 'LAZACK-DEVICE'
global.wm = '✿◟LAZACK DEVICE◞✿'
global.author = 'Made With By LzcTeam'
global.dev = '© Powered By LzcTeam'
global.textbot = 'lazackorganisation'
global.tag = 'lazack28'

//*─────────────────────────────*

global.currency = 'teamlz'
global.welcome1 = '❍ Edit With The Command setwelcome'
global.welcome2 = '❍ Edit With The Command setbye'
global.banner = 'https://lazackorganisation.my.id/mtaju.jpg'
global.avatar = 'https://lazackorganisation.my.id/mtaju.jpg'

//*─────────────────────────────*

global.gp1 = 'https://chat.whatsapp.com/EATTgyi5jx16HgAggPg8yI?mode=r_c'
global.community1 = 'https://chat.whatsapp.com/EATTgyi5jx16HgAggPg8yI?mode=r_c'
global.channel = 'https://whatsapp.com/channel/0029ValRlNGCXC3EussN4b2E'
global.channel2 = 'https://whatsapp.com/channel/0029ValRlNGCXC3EussN4b2E'
global.md = 'https://github.com/Lazack28/Lazack-Device'
global.email = 'lazaromtaju12@gmail.com'

//*─────────────────────────────*

global.catalog = fs.readFileSync('./Botify/lazack.jpg');
global.style = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalog, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363321705798318@newsletter',
}
global.multiplier = 60

//*─────────────────────────────*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

//*─────────────────────────────*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
