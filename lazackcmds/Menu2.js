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
let pp = './jusorts/lazack.jpg'
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

let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
let str = `
  ✦ ───『 *group* 』─── 
  ◈ .getbio <@tag/reply>  Ⓛ
  ◈ .animequote
  ◈ .Setdesc <text>
  ◈ .setname <text>
  ◈ .add
  ◈ .delete
  ◈ .delwarn @user
  ◈ .demote (@tag)
  ◈ .infogp
  ◈ .hidetag
  ◈ .invite <917xxx>
  ◈ .kick @user
  ◈ .link
  ◈ .poll question|option|option
  ◈ .profile
  ◈ .promote
  ◈ .resetlink
  ◈ .setbye <text>
  ◈ .group *open/close*
  ◈ .setwelcome <text>
  ◈ .simulate <event> @user
  ◈ .staff
  ◈ .tagall
  ◈ .totag
  ◈ .warn @user
  ◈ .warns
  ◈ .main

   ───『 *owner* 』─── ⚝
  ◈ .addprem <@tag>
  ◈ .addowner @user
  ◈ .allow <@tag>
  ◈ .HEROKU
  ◈ .ban @user
  ◈ .banchat
  ◈ .tx
  ◈ .broadcastgroup <text>
  ◈ .bcgc <text>
  ◈ .cleartmp
  ◈ .delexpired
  ◈ .delprem @user
  ◈ .removeowner @user
  ◈ .setppbotfull
  ◈ .getplugin <name file>
  ◈ .getfile <name file>
  ◈ .join <chat.whatsapp.com> <dias>
  ◈ .reset <54xxx>
  ◈ .resetprefix
  ◈ .restart
  ◈ ..setprefix
  ◈ ..setprefix [symbol]
  ◈ .unban @user
  ◈ .unbanchat
  ◈ .update
  ◈ .config
  ◈ .listban
  ◈ .deleteplugin <name>

  ───『 *fun* 』─── ⚝
  ◈ .afk <reason>
  ◈ .tomp3
  ◈ .toav
  ◈ .bot
  ◈ .character @tag
  ◈ .dare
  ◈ .flirt
  ◈ .gay @user
  ◈ .pickupline
  ◈ .question
  ◈ .shayari
  ◈ .ship
  ◈ .yomamajoke
  ◈ .truth
  ◈ .waste @user
  ◈ .image
  ◈ .meme
  ◈ .quote

   ───『 *reaction* 』─── ⚝
  ◈ .bully @tag
  ◈ .cuddle @tag
  ◈ .cry @tag
  ◈ .hug @tag
  ◈ .awoo @tag
  ◈ .kiss @tag
  ◈ .lick @tag
  ◈ .pat @tag
  ◈ .smug @tag
  ◈ .bonk @tag
  ◈ .yeet @tag
  ◈ .blush @tag
  ◈ .smile @tag
  ◈ .wave @tag
  ◈ .highfive @tag
  ◈ .handhold @tag
  ◈ .nom @tag
  ◈ .bite @tag
  ◈ .glomp @tag
  ◈ .slap @tag
  ◈ .kill @tag
  ◈ .happy @tag
  ◈ .wink @tag
  ◈ .poke @tag
  ◈ .dance @tag
  ◈ .cringe @tag

   ───『 *downloader* 』─── ⚝
  ◈ .facebook <url>
  ◈ .gdrive 🅟
  ◈ .gitclone <url>
  ◈ .igstalk
  ◈ .instagram
  ◈ .mediafire <url>
  ◈ .mega
  ◈ .modapk
  ◈ .play <query>
  ◈ .play2 <text>
  ◈ .playvid <text>
  ◈ .spotify
  ◈ .tiktok <url>
  ◈ .tiktokstalk
  ◈ .twitter <url>
  ◈ .ytmp3 <url>
  ◈ .ytsearch
  ◈ .ytmp4 <yt-link>
  ◈ .wallpaper <query>

   ───『 *game* 』─── ⚝
  ◈ .slot <amount>
  ◈ .chess [from to]
  ◈ .chess delete
  ◈ .chess join
  ◈ .chess start
  ◈ .delttt
  ◈ .guessflag
  ◈ .Maths <modes>
  ◈ .ppt <rock/paper/scissors>
  ◈ .tictactoe <tag number>

  ───『 *maker* 』─── ⚝
  ◈ .blur
  ◈ .difuminar2
  ◈ .hornycard
  ◈ .hornylicense
  ◈ .gfx1
  ◈ .gfx2
  ◈ .gfx3
  ◈ .gfx4
  ◈ .gfx5
  ◈ .gfx6
  ◈ .gfx7
  ◈ .gfx8
  ◈ .gfx9
  ◈ .gfx10
  ◈ .gfx11
  ◈ .gfx12
  ◈ .simpcard
  ◈ .itssostupid
  ◈ .iss
  ◈ .stupid
  ◈ .tweet <comment>
  ◈ .lolicon
  ◈ .ytcomment <comment>

   ───『 *sticker* 』─── ⚝
  ◈ .emojimix <emoji+emoji>
  ◈ .getsticker
  ◈ .smaker
  ◈ .stickerwithmeme (caption|reply media)
  ◈ .swmeme <url>
  ◈ .swm(caption|reply media)
  ◈ .sfull
  ◈ .toimg <sticker>
  ◈ .tovid
  ◈ .trigger <@user>
  ◈ .ttp
  ◈ .ttp2
  ◈ .ttp3
  ◈ .ttp4
  ◈ .ttp5
  ◈ .attp
  ◈ .attp2
  ◈ .attp3
  ◈ .take <name>|<author>

   ───『 *audio* 』─── ⚝
  ◈ .bass [vn]
  ◈ .blown [vn]
  ◈ .deep [vn]
  ◈ .earrape [vn]
  ◈ .fast [vn]
  ◈ .fat [vn]
  ◈ .nightcore [vn]
  ◈ .reverse [vn]
  ◈ .robot [vn]
  ◈ .slow [vn]
  ◈ .smooth [vn]
  ◈ .tupai [vn]

  ───『 *news* 』─── ⚝
  ◈ .news
  ◈ .technews
  ◈ .ndtv

   ───『 *economy* 』─── ⚝
  ◈ .addgold <@user>
  ◈ .addxp <@user>
  ◈ .bank
  ◈ .buych
  ◈ .cock-fight <amount>
  ◈ .buy
  ◈ .buyall
  ◈ .daily
  ◈ .deposit
  ◈ .gamble <amount> <color(red/black)>
  ◈ .give credit [amount] [@tag]
  ◈ .levelup
  ◈ .rank
  ◈ .rob
  ◈ .roulette <amount> <color(red/black)>
  ◈ .wallet
  ◈ .withdraw
  ◈ .work

   ───『 *anime* 』─── ⚝
  ◈ .anime
  ◈ .akira
  ◈ .akiyama
  ◈ .anna
  ◈ .asuna
  ◈ .ayuzawa
  ◈ .boruto
  ◈ .chiho
  ◈ .chitoge
  ◈ .deidara
  ◈ .erza
  ◈ .elaina
  ◈ .eba
  ◈ .emilia
  ◈ .hestia
  ◈ .hinata
  ◈ .inori
  ◈ .isuzu
  ◈ .itachi
  ◈ .itori
  ◈ .kaga
  ◈ .kagura
  ◈ .kaori
  ◈ .keneki
  ◈ .kotori
  ◈ .kurumi
  ◈ .madara
  ◈ .mikasa
  ◈ .miku
  ◈ .minato
  ◈ .naruto
  ◈ .nezuko
  ◈ .sagiri
  ◈ .sasuke
  ◈ .sakura
  ◈ .manhwa
  ◈ .waifu
  ◈ .neko
  ◈ .zerotwo
  ◈ .loli
  ◈ .pokedex <pokemon>
  ◈ .trace

   ───『 *nsfw* 』─── ⚝
  ◈ .genshin
  ◈ .swimsuit
  ◈ .schoolswimsuit
  ◈ .white
  ◈ .barefoot
  ◈ .touhou
  ◈ .gamecg
  ◈ .hololive
  ◈ .uncensored
  ◈ .sunglasses
  ◈ .glasses
  ◈ .weapon
  ◈ .shirtlift
  ◈ .chain
  ◈ .fingering
  ◈ .flatchest
  ◈ .torncloth
  ◈ .bondage
  ◈ .demon
  ◈ .wet
  ◈ .pantypull
  ◈ .headdress
  ◈ .headphone
  ◈ .tie
  ◈ .anusview
  ◈ .shorts
  ◈ .stokings
  ◈ .topless
  ◈ .beach
  ◈ .bunnygirl
  ◈ .bunnyear
  ◈ .idol
  ◈ .vampire
  ◈ .gun
  ◈ .maid
  ◈ .bra
  ◈ .nobra
  ◈ .bikini
  ◈ .whitehair
  ◈ .blonde
  ◈ .pinkhair
  ◈ .bed
  ◈ .ponytail
  ◈ .nude
  ◈ .dress
  ◈ .underwear
  ◈ .foxgirl
  ◈ .uniform
  ◈ .skirt
  ◈ .sex
  ◈ .sex2
  ◈ .sex3
  ◈ .breast
  ◈ .twintail
  ◈ .spreadpussy
  ◈ .tears
  ◈ .seethrough
  ◈ .breasthold
  ◈ .drunk
  ◈ .fateseries
  ◈ .spreadlegs
  ◈ .openshirt
  ◈ .headband
  ◈ .food
  ◈ .close
  ◈ .tree
  ◈ .nipples
  ◈ .erectnipples
  ◈ .horns
  ◈ .greenhair
  ◈ .wolfgirl
  ◈ .catgirl
  ◈ .nsfw
  ◈ .ass
  ◈ .boobs
  ◈ .lesbian
  ◈ .pussy
  ◈ .pack
  ◈ .xvid
  ◈ .xnxx

   ───『 *tools* 』─── ⚝
  ◈ .nowa
  ◈ .qr <text>
  ◈ .qrcode <text>
  ◈ .style <key> <text>
  ◈ .weather *<place>*
  ◈ .dehaze
  ◈ .recolor
  ◈ .hdr
  ◈ .length <amount>
  ◈ .tinyurl <link>
  ◈ .shorten <link>
  ◈ .tempmail
  ◈ .shazam
  ◈ .cal <equation>
  ◈ .carbon <code>
  ◈ .define <word>
  ◈ .element
  ◈ .google
  ◈ .itunes
  ◈ .lyrics
  ◈ .imdb
  ◈ .course
  ◈ .randomcourse
  ◈ .readmore <text1>|<text2>
  ◈ .readvo
  ◈ .removebg
  ◈ .ss <url>
  ◈ .ssf <url>
  ◈ .subreddit
  ◈ .telesticker  Ⓛ
  ◈ .tourl
  ◈ .translate <lang> <text>
  ◈ .true
  ◈ .tts <lang> <task>
  ◈ .wa
  ◈ .wikipedia

  ───『 *AI* 』─── ⚝
  ◈ .bing
  ◈ .dalle
  ◈ .chatgpt
  ◈ .toanime
  ◈ .gitagpt
  ◈ .tocartoon
  ◈ .ai
  ◈ .bard
  ◈ .alexa
  ◈ .bingimg
  ◈ .gemini

   ───『 *religion* 』─── ⚝
  ◈ .gita [verse_number]
  ◈ .quran [surah_number|surah_name]

   ───『 *Bot Menu* 』─── ⚝
  ◈ .ping
  ◈ .runtime
  ◈ .script
  ◈ .server
  ◈ .blocklist
  ◈ .alive
  ◈ .info
  ◈ .owner
  ◈ .totalfeature
  ◈ .list
  ◈ .messi
  ◈ .cristianoronaldo
  ◈ .cr7
  ◈ .ppcouple
  ◈ .ppcp
  ◈ .pinterest
  ◈ .reg <name.age>
  ◈ .mysn
  ◈ .unreg 

   ───『 *plugin* 』─── ⚝
  ◈ .plugins
  ◈ .install <Gist URL>

`

    

       // await conn.sendMessage(m.chat, { video: { url: [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9, pp10, pp11, pp12, pp13, pp14, pp15].getRandom() }, gifPlayback: true, caption: text.trim(), mentions: [m.sender] }, { quoted: estilo })
    


   conn.sendFile(m.chat, pp, 'perfil.jpg', str, m, null, canal)
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
      "वक्त हमे बहुत कुछ सिखा देता है, खासकर तब जब हमारे पास वक्त नहीं होता।",
      "जिंदगी एक किताब की तरह होती है, हर दिन नया पन्ना बदलता है। कभी हंसते हैं, कभी रोते हैं, पर हर किसी की कहानी अधूरी होती है!",
      "पढ़ाई करो तो दिल लगता नही, दिल लगाओ तो दिमाग़ लगता नहीं।",
      "दोस्ती इतनी गहरी करो की दिल में बस जाओ, ऐसे दोस्ती निभाओ की हमे भी तुम्हारे दोस्त होने पर नाज हो।",
      "मेरे दोस्त तुम बहुत याद आते हो, जब भी भूख लगती है वो समोसे बहुत याद आते है।",
      "जीवन का असली मज़ा तो तब आता है, जब दूसरे आपकी ज़िंदगी जीने की कोशिश करते हैं।",
      "कुछ लोग तो इतने फालतू होते हैं, खुद की ज़िंदगी खुद ही नहीं जी पाते और दूसरों की ज़िंदगी में टांग अड़ा देते हैं।"
];
