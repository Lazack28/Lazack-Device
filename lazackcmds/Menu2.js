import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import { canLevelUp, xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'
import fs from 'fs'
const { levelling } = '../lib/levelling.js'
import moment from 'moment-timezone'
import { promises } from 'fs'
import { join } from 'path'
const time = moment.tz('Asia/Kolkata').format('HH')
let wib = moment.tz('Asia/Kolkata').format('HH:mm:ss')
//import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, command}) => {
    let d = new Date(new Date + 3600000)
    let locale = 'en'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`
let pp = './Botify/lazack.jpg'
let user = global.db.data.users[who]
let { name, exp, diamond, lastclaim, registered, regTime, age, level, role, warn } = global.db.data.users[who]
let { min, xp, max } = xpRange(user.level, global.multiplier)
let username = conn.getName(who)
let math = max - xp
let prem = global.prems.includes(who.split`@`[0])
let sn = createHash('md5').update(who).digest('hex')
let totaluser = Object.values(global.db.data.users).length 
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length 
let more = String.fromCharCode(8206)
let readMore = more.repeat(850) 
let greeting = ucapan()
let quote = quotes[Math.floor(Math.random() * quotes.length)];


let link = `https://whatsapp.com/channel/0029VaIRINGCXC3EussN4b2E`
let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
let str = `
乂───『 *INFO*』───乂 
│ *Simple menu*
│ *_TRY NOT TO LAUGH_*
╰───────⳹
╭───────
│  BotMenu
│  OwnerMenu
│  GroupMenu
│  FunMenu
│  ReactionMenu
│  DownloaderMenu
│  GameMenu
│  LogoMenu
│  StickerMenu
│  AudioMenu
│  NewsMenu
│  EconomyMenu
│  AnimeMenu
│  NSFWMenu
│  ToolsMenu
│  AIMenu
│  ReligionMenu
│  PluginMenu
╰───────
*ALL LIST CMDS*
 *ᴀɪ* 
 .ᴀɪ
 .ʙᴜɢ
 .ʀᴇᴘᴏʀᴛ
 .ɢᴘᴛ
 .ᴅᴀʟʟᴇ
 .ʀᴇᴍɪɴɪ
 .ɢᴇᴍɪɴɪ
 *ᴛᴏᴏl* 
 .ᴄᴀʟᴄᴜʟᴀᴛᴏʀ
 .ᴛᴇᴍᴘᴍᴀɪʟ
 .ᴄʜᴇᴄᴋᴍᴀɪʟ
 .ᴛʀᴛ
 .ᴛᴛꜱ
  *ɢʀᴏᴜᴘ* 
 .ʟɪɴᴋɢʀᴏᴜᴘ
 .ꜱᴇᴛᴘᴘɢᴄ
 .ꜱᴇᴛɴᴀᴍᴇ
 .ꜱᴇᴛᴅᴇꜱᴄ
 .ɢʀᴏᴜᴘ
 .ɢᴄꜱᴇᴛᴛɪɴɢ
 .ᴡᴇʟᴄᴏᴍᴇ
 .ᴀᴅᴅ
 .ᴋɪᴄᴋ
 .ʜɪᴅᴇᴛᴀɢ
 .ᴛᴀɢᴀʟʟ
 .ᴀɴᴛɪʟɪɴᴋ
 .ᴀɴᴛɪᴛᴏxɪᴄ
 .ᴘʀᴏᴍᴏᴛᴇ
 .ᴅᴇᴍᴏᴛᴇ
 .ɢᴇꜰʙɪᴏ
 *ᴅᴏᴡɴʟᴏᴀᴅ* 
  .ᴀᴘᴋ
 .ꜰᴀᴄᴇʙᴏᴏᴋ
 .ᴍᴇᴅɪᴀꜰɪʀᴇ
 .ᴘɪɴᴛᴇʀᴇꜱᴛᴅʟ
 .ɢᴜᴛᴄʟᴏɴᴇ
 .ɢᴅʀɪᴠᴇ
 .ɪɴꜱʀᴀ
 .ʏᴛᴍᴘ3
 .ʏᴛᴍᴘ4
 .ᴘʟᴀʏ
 .ꜱᴏɴɢ
 .ᴠɪᴅᴇᴏ
 .ʏᴛᴍᴘ3ᴅᴏᴄ
 .ʏᴛᴍᴘ4ᴅᴏᴄ
 .ᴛɪᴋᴛᴏᴋ
 *ꜱᴇᴀʀᴄʜ* 
 .ᴘʟᴀʏ
 .ʏᴛꜱ
 .ɪᴍᴅʙ
 .ɢᴏᴏɢʟᴇ
 .ɢɪᴍᴀɢᴇ
 .ɪᴍɢ
 .ᴘɪɴᴛᴇʀᴇꜱᴛ
 .ᴡᴀʟʟᴘᴀᴘᴇʀ
 .ᴡɪᴋɪᴍᴇᴅɪᴀ
 .ʏᴛꜱᴇᴀʀᴄʜ
 .ʀɪɴɢᴛᴏɴᴇ
 .ʟʏʀɪᴄꜱ
 *ᴍᴀɪɴ* 
 .ᴘɪɴɢ
 .ᴀʟɪᴠᴇ>
 .ᴏᴡɴᴇʀ
 .ᴍᴇɴᴜ
 .ʜᴇʟᴘ
 .ɪɴꜰᴏʙᴏᴛ
 *ᴏᴡɴᴇʀ* 
 .ᴊᴏɪɴ
 .ʟᴇᴀᴠᴇ
 .ʙʟᴏᴄᴋ
 .ᴜɴʙʟᴏᴄᴋ
 .ꜱᴇᴛᴘᴘʙᴏᴛ
 .ᴀɴᴛɪᴄᴀʟʟ
 .ꜱᴇᴛꜱᴛᴀᴛᴜꜱ
 .ꜱᴇᴛɴᴀᴍᴇʙᴏᴛ
 .ᴀᴜᴛᴏᴛʏᴘɪɴɢ
 .ᴀʟᴡᴀʏꜱᴏɴʟɪɴᴇ
 .ᴀᴜᴛᴏʀᴇᴀᴅ
 .ᴀᴜᴛᴏꜱᴠɪᴇᴡ
 .ᴜᴘᴅᴀᴛᴇ
 .ʀᴇꜱᴛᴀʀᴛ
 *ꜱᴛᴀʟᴋ* 
  .ᴛʀᴜᴇᴄᴀʟʟᴇʀ
  .ɪɴꜱᴛᴀꜱᴛᴀʟᴋ
  .ɢɪᴛʜᴜʙꜱᴛᴀʟᴋ
 *MAKER*
  .blur
  .difuminar2
  .hornycard
  .hornylicense
  .gfx1
  .gfx2
  .gfx3
  .gfx4
  .gfx5
  .gfx6
  .gfx7
  .gfx8
  .gfx9
  .gfx10
  .gfx11
  .gfx12
  .simpcard
  .itssostupid
  .iss
  .stupid
  .tweet 
  .lolicon
  .ytcomment 
 *STICKER*
  .emojimix 
  .getsticker
  .smaker
  .stickerwithmeme 
  .swmeme 
  .swm
  .sfull
  .toimg 
  .tovid
  .trigger 
  .ttp
  .ttp2
  .ttp3
  .ttp4
  .ttp5
  .attp
  .attp2
  .attp3
  .take 
 *ECONOMY*
  .addgold 
  .addxp 
  .bank
  .buych
  .cock-fight 
  .buy
  .buyall
  .daily
  .deposit
  .gamble
  .give credit 
  .levelup
  .rank
  .rob
  .roulette
  .wallet
  .withdraw
  .work
 *PLUGINS* 
  .plugins
  .install 
  .reg 
  .mysn
  .unreg 
*https://home.lazackorganisation.my.id*
> FOOTBALL IS MY LIFE, CODING IS MY HOBBY
`



       // await conn.sendMessage(m.chat, { video: { url: [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9, pp10, pp11, pp12, pp13, pp14, pp15].getRandom() }, gifPlayback: true, caption: text.trim(), mentions: [m.sender] }, { quoted: estilo })



   conn.sendFile(m.chat, pp, 'perfil.jpg', str, m, null, link)
    m.react(done)

}
handler.help = ['main']
handler.tags = ['group']
handler.command = ['menu2', 'help2'] 

export default handler
function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}

    function ucapan() {
      const time = moment.tz('Asia/Kolkata').format('HH')
      let res = "happy early in the day☀️"
      if (time >= 4) {
        res = "Good Morning 🌄"
      }
      if (time >= 10) {
        res = "Good Afternoon ☀️"
      }
      if (time >= 15) {
        res = "Good Afternoon 🌇"
      }
      if (time >= 18) {
        res = "Good Night 🌙"
      }
      return res
    }
    const quotes = [
      "I'm not lazy, I'm just on my energy saving mode.",
      "Life is short, smile while you still have teeth.",
      "I may be a bad influence, but darn I am fun!",
      "I'm on a whiskey diet. I've lost three days already.",
      "Why don't some couples go to the gym? Because some relationships don't work out.",
      "I told my wife she should embrace her mistakes... She gave me a hug.",
      "I'm great at multitasking. I can waste time, be unproductive, and procrastinate all at once.",
      "You know you're getting old when you stoop to tie your shoelaces and wonder what else you could do while you're down there.",
      "I'm so good at sleeping, I can do it with my eyes closed.",
      "If you think nobody cares if you’re alive, try missing a couple of payments.",
      "I used to think I was indecisive, but now I'm not so sure.",
      "If you can't convince them, confuse them.",
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      "I'm not clumsy, I'm just on a mission to test gravity.",
      "I told my wife she should do more push-ups. She said, 'I could do a hundred!' So I counted to ten and stopped.",
      "Life is like a box of chocolates; it doesn't last long if you're hungry.",
      "I'm not saying I'm Wonder Woman, I'm just saying no one has ever seen me and Wonder Woman in the same room together.",
      "Why do they call it beauty sleep when you wake up looking like a troll?",
      "I don't always lose my phone, but when I do, it's always on silent.",
      "My bed is a magical place where I suddenly remember everything I was supposed to do.",
      "I love the sound you make when you shut up.",
      "I'm not arguing, I'm just explaining why I'm right.",
      "I'm not a complete idiot, some parts are missing.",
      "When life gives you lemons, squirt someone in the eye.",
      "I don't need anger management. You just need to stop making me angry.",
      "I'm not saying I'm Batman. I'm just saying no one has ever seen me and Batman in the same room together.",
      "I'm not saying I'm Superman. I'm just saying no one has ever seen me and Superman in the same room together.",
      "I'm not saying I'm Spider-Man. I'm just saying no one has ever seen me and Spider-Man in the same room together.",
      "I'm not saying I'm a superhero. I'm just saying no one has ever seen me and a superhero in the same room together.",
      "The early bird can have the worm because worms are gross and mornings are stupid.",
      "If life gives you lemons, make lemonade. Then find someone whose life has given them vodka and have a party!",
      "The road to success is always under construction.",
      "I am so clever that sometimes I don't understand a single word of what I am saying.",
      "Some people just need a high-five. In the face. With a chair.",
      "I'm not saying I'm perfect, but I'm pretty close.",
      "A day without sunshine is like, you know, night.",
      "The best way to predict the future is to create it.",
      "If you can't be a good example, then you'll just have to be a horrible warning.",
      "I don't know why I keep hitting the escape button. I'm just trying to get out of here.",
      "I'm not lazy. I'm on energy-saving mode.",
      "I don't need a hairstylist, my pillow gives me a new hairstyle every morning.",
      "I don't have a bad handwriting, I have my own font.",
      "I'm not clumsy. It's just the floor hates me, the table and chairs are bullies, and the walls get in my way.",
      "I'm not saying I'm Batman. I'm just saying no one has ever seen me and Batman in the same room together.",
      "I'm not saying I'm Wonder Woman. I'm just saying no one has ever seen me and Wonder Woman in the same room together.",
      "I'm not saying I'm Superman. I'm just saying no one has ever seen me and Superman in the same room together.",
      "I'm not saying I'm Spider-Man. I'm just saying no one has ever seen me and Spider-Man in the same room together.",
      "I'm not saying I'm a superhero. I'm just saying no one has ever seen me and a superhero in the same room together.",
      ]