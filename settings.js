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
global.botNumber = '' //Example: 573218138672

//*─────────────────────────────*

global.owner = [
// <-- Number @s.whatsapp.net -->
  ['51901930696', 'Angelithoxyz', true],
  ['584146277368', 'Barboza', true],
  ['59897246324', 'izumi', true],
  ['50557865603', 'Willzek', true], 
  ['50248019799', '🐉NeoTokyo Beats🐲', true],
  
// <-- Number @lid -->
  ['184486729879638', 'Angelithoxyz', true],
  ['', '', true], 
  ['', '', true]
];

//*─────────────────────────────*

global.mods = []
global.suittag = ['51901930696'] 
global.prems = []

//*─────────────────────────────*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.17' 
global.vs = '2.2.5'
global.nameqr = 'Nino Nakano V2'
global.namebot = '✿◟Nino Bot◞✿'
global.sessions = 'Sessions'
global.jadi = 'JadiBots' 
global.yukiJadibts = true

//*─────────────────────────────*

global.packname = '⪛✰ Nino Nakano V2 ✰⪜'
global.botname = 'NINO NAKANO V2'
global.wm = '✿◟Nino Nakano V2◞✿'
global.author = 'Made With By Ryusei Club'
global.dev = '© Powered By Angelithoxyz'
global.textbot = 'Nino, Made With By Ryusei Club'
global.etiqueta = 'Angelithoxyz'

//*─────────────────────────────*

global.moneda = 'NinoCoins'
global.welcom1 = '❍ Edit With The Command setwelcome'
global.welcom2 = '❍ Edit With The Command setbye'
global.banner = 'https://files.catbox.moe/bvew26.jpg'
global.avatar = 'https://files.catbox.moe/syn9ao.jpg'

//*─────────────────────────────*

global.gp1 = 'https://chat.whatsapp.com/LYLiORNWzHkIsiecvCCdgK?mode=ac_t'
global.comunidad1 = 'https://chat.whatsapp.com/HeKcGyv2idq0tMFRFGN6qL?mode=ac_t'
global.channel = 'https://whatsapp.com/channel/0029Vaz6RTR0LKZIKwudX32x'
global.channel2 = 'https://whatsapp.com/channel/0029VapUpsT9mrGcypZy141s'
global.md = 'https://github.com/Angelithoxyz/Nino-Nakano-V2'
global.correo = 'angelithoxyz@gmail.com'

//*─────────────────────────────*

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363374826926142@newsletter',
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

