import { promises, readFileSync } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import os from 'os'

let groupmenu = `
╭───✦ 『 *Group Menu* 』 ✦───╮
│
├─ ✦ .getbio 
├─ ✦ .animequote
├─ ✦ .setdesc 
├─ ✦ .setname 
├─ ✦ .add
├─ ✦ .delete
├─ ✦ .delwarn 
├─ ✦ .demote 
├─ ✦ .infogp
├─ ✦ .hidetag
├─ ✦ .invite 
├─ ✦ .kick 
├─ ✦ .link
├─ ✦ .poll 
├─ ✦ .profile
├─ ✦ .promote
├─ ✦ .resetlink
├─ ✦ .setbye 
├─ ✦ .group *open/close*
├─ ✦ .setwelcome 
├─ ✦ .simulate  
├─ ✦ .staff
├─ ✦ .tagall
├─ ✦ .totag
├─ ✦ .warn 
├─ ✦ .warns
├─ ✦ .main
│
╰──────────────────────────╯`
let ownermenu = `
╭───✦ 『 *Owner Menu* 』 ✦───╮
│
├─ ✦ .addprem 
├─ ✦ .addowner
├─ ✦ .allow 
├─ ✦ .HEROKU
├─ ✦ .ban
├─ ✦ .banchat
├─ ✦ .tx
├─ ✦ .broadcastgroup
├─ ✦ .bcgc
├─ ✦ .cleartmp
├─ ✦ .delexpired
├─ ✦ .delprem
├─ ✦ .removeowner
├─ ✦ .setppbotfull
├─ ✦ .getplugin 
├─ ✦ .getfile 
├─ ✦ .join 
├─ ✦ .reset 
├─ ✦ .resetprefix
├─ ✦ .restart
├─ ✦ .setprefix
├─ ✦ .setprefix
├─ ✦ .unban
├─ ✦ .unbanchat
├─ ✦ .update
├─ ✦ .config
├─ ✦ .listban
├─ ✦ .deleteplugin 
│
╰──────────────────────────╯`
let funmenu = `
╭───✦ 『 *Fun Menu* 』 ✦───╮
│
├─ ✦ .afk 
├─ ✦ .tomp3
├─ ✦ .toav
├─ ✦ .bot
├─ ✦ .character 
├─ ✦ .dare
├─ ✦ .flirt
├─ ✦ .gay 
├─ ✦ .pickupline
├─ ✦ .question
├─ ✦ .shayari
├─ ✦ .ship
├─ ✦ .yomamajoke
├─ ✦ .truth
├─ ✦ .waste 
├─ ✦ .image
├─ ✦ .meme
├─ ✦ .quote
│
╰──────────────────────────╯`

let reactmenu = `
╭───✦ 『 *Reaction Menu* 』 ✦───╮
│
├─ ✦ .bully 
├─ ✦ .cuddle 
├─ ✦ .cry 
├─ ✦ .hug 
├─ ✦ .awoo 
├─ ✦ .kiss 
├─ ✦ .lick 
├─ ✦ .pat 
├─ ✦ .smug 
├─ ✦ .bonk 
├─ ✦ .yeet 
├─ ✦ .blush 
├─ ✦ .smile 
├─ ✦ .wave 
├─ ✦ .highfive 
├─ ✦ .handhold 
├─ ✦ .nom 
├─ ✦ .bite 
├─ ✦ .glomp 
├─ ✦ .slap 
├─ ✦ .kill 
├─ ✦ .happy 
├─ ✦ .wink 
├─ ✦ .poke 
├─ ✦ .dance 
├─ ✦ .cringe 
│
╰──────────────────────────╯`

let dlmenu = `
╭───✦ 『 *Downloader Menu* 』 ✦───╮
│
├─ ✦ .facebook 
├─ ✦ .gdrive 🅟
├─ ✦ .gitclone 
├─ ✦ .igstalk
├─ ✦ .instagram
├─ ✦ .mediafire 
├─ ✦ .mega
├─ ✦ .modapk
├─ ✦ .play 
├─ ✦ .play2 
├─ ✦ .playvid 
├─ ✦ .spotify
├─ ✦ .tiktok 
├─ ✦ .tiktokstalk
├─ ✦ .twitter 
├─ ✦ .ytmp3 
├─ ✦ .ytsearch
├─ ✦ .ytmp4 
├─ ✦ .wallpaper 
│
╰──────────────────────────╯`

let gamemenu = `
╭───✦ 『 *Game Menu* 』 ✦───╮
│
├─ ✦ .slot 
├─ ✦ .chess 
├─ ✦ .chess delete
├─ ✦ .chess join
├─ ✦ .chess start
├─ ✦ .delttt
├─ ✦ .guessflag
├─ ✦ .Maths 
├─ ✦ .ppt 
├─ ✦ .tictactoe 
│
╰──────────────────────────╯`

/*let stickermenu = `
╭───✦ 『 *Sticker Menu* 』 ✦───╮
│
├─ ✦ .emojimix <emoji+emoji>
├─ ✦ .getsticker
├─ ✦ .smaker
├─ ✦ .stickerwithmeme (caption|reply media)
├─ ✦ .swmeme 
├─ ✦ .swm (caption|reply media)
├─ ✦ .sfull
├─ ✦ .toimg <sticker>
├─ ✦ .tovid
├─ ✦ .trigger <>
├─ ✦ .ttp
├─ ✦ .ttp2
├─ ✦ .ttp3
├─ ✦ .ttp4
├─ ✦ .ttp5
├─ ✦ .attp
├─ ✦ .attp2
├─ ✦ .attp3
├─ ✦ .take |<author>
│
╰──────────────────────────╯`*/

/*let audiomenu = `
╭───✦ 『 *Audio Menu* 』 ✦───╮
│
├─ ✦ .bass [vn]
├─ ✦ .blown [vn]
├─ ✦ .deep [vn]
├─ ✦ .earrape [vn]
├─ ✦ .fast [vn]
├─ ✦ .fat [vn]
├─ ✦ .nightcore [vn]
├─ ✦ .reverse [vn]
├─ ✦ .robot [vn]
├─ ✦ .slow [vn]
├─ ✦ .smooth [vn]
├─ ✦ .tupai [vn]
│
╰──────────────────────────╯`*/

let newsmenu = `
╭───✦ 『 *News Menu* 』 ✦───╮
│
├─ ✦ .news
├─ ✦ .technews
├─ ✦ .ndtv
│
╰──────────────────────────╯`

let economy = `
╭───✦ 『 *Economy Menu* 』 ✦───╮
│
├─ ✦ .addgold <>
├─ ✦ .addxp <>
├─ ✦ .bank
├─ ✦ .buych
├─ ✦ .cock-fight 
├─ ✦ .buy
├─ ✦ .buyall
├─ ✦ .daily
├─ ✦ .deposit
├─ ✦ .gamble 
├─ ✦ .give credit 
├─ ✦ .levelup
├─ ✦ .rank
├─ ✦ .rob
├─ ✦ .roulette 
├─ ✦ .wallet
├─ ✦ .withdraw
├─ ✦ .work
│
╰──────────────────────────╯`

/*let animemenu = `
╭───✦ 『 *Anime Menu* 』 ✦───╮
│
├─ ✦ .anime
├─ ✦ .akira
├─ ✦ .akiyama
├─ ✦ .anna
├─ ✦ .asuna
├─ ✦ .ayuzawa
├─ ✦ .boruto
├─ ✦ .chiho
├─ ✦ .chitoge
├─ ✦ .deidara
├─ ✦ .erza
├─ ✦ .elaina
├─ ✦ .eba
├─ ✦ .emilia
├─ ✦ .hestia
├─ ✦ .hinata
├─ ✦ .inori
├─ ✦ .isuzu
├─ ✦ .itachi
├─ ✦ .itori
├─ ✦ .kaga
├─ ✦ .kagura
├─ ✦ .kaori
├─ ✦ .keneki
├─ ✦ .kotori
├─ ✦ .kurumi
├─ ✦ .madara
├─ ✦ .mikasa
├─ ✦ .miku
├─ ✦ .minato
├─ ✦ .naruto
├─ ✦ .nezuko
├─ ✦ .sagiri
├─ ✦ .sasuke
├─ ✦ .sakura
├─ ✦ .manhwa
├─ ✦ .waifu
├─ ✦ .neko
├─ ✦ .zerotwo
├─ ✦ .loli
├─ ✦ .pokedex <pokemon>
├─ ✦ .trace
│
╰──────────────────────────╯`*/

/*let nsfwmenu = `
╭───✦ 『 *NSFW Menu* 』 ✦───╮
│
├─ ✦ .genshin
├─ ✦ .swimsuit
├─ ✦ .schoolswimsuit
├─ ✦ .white
├─ ✦ .barefoot
├─ ✦ .touhou
├─ ✦ .gamecg
├─ ✦ .hololive
├─ ✦ .uncensored
├─ ✦ .sunglasses
├─ ✦ .glasses
├─ ✦ .weapon
├─ ✦ .shirtlift
├─ ✦ .chain
├─ ✦ .fingering
├─ ✦ .flatchest
├─ ✦ .torncloth
├─ ✦ .bondage
├─ ✦ .demon
├─ ✦ .wet
├─ ✦ .pantypull
├─ ✦ .headdress
├─ ✦ .headphone
├─ ✦ .tie
├─ ✦ .anusview
├─ ✦ .shorts
├─ ✦ .stokings
├─ ✦ .topless
├─ ✦ .beach
├─ ✦ .bunnygirl
├─ ✦ .bunnyear
├─ ✦ .idol
├─ ✦ .vampire
├─ ✦ .gun
├─ ✦ .maid
├─ ✦ .bra
├─ ✦ .nobra
├─ ✦ .bikini
├─ ✦ .whitehair
├─ ✦ .blonde
├─ ✦ .pinkhair
├─ ✦ .bed
├─ ✦ .ponytail
├─ ✦ .nude
├─ ✦ .dress
├─ ✦ .underwear
├─ ✦ .foxgirl
├─ ✦ .uniform
├─ ✦ .skirt
├─ ✦ .sex
├─ ✦ .sex2
├─ ✦ .sex3
├─ ✦ .breast
├─ ✦ .twintail
├─ ✦ .spreadpussy
├─ ✦ .tears
├─ ✦ .seethrough
├─ ✦ .breasthold
├─ ✦ .drunk
├─ ✦ .fateseries
├─ ✦ .spreadlegs
├─ ✦ .openshirt
├─ ✦ .headband
├─ ✦ .food
├─ ✦ .close
├─ ✦ .tree
├─ ✦ .nipples
├─ ✦ .erectnipples
├─ ✦ .horns
├─ ✦ .greenhair
├─ ✦ .wolfgirl
├─ ✦ .catgirl
├─ ✦ .nsfw
├─ ✦ .ass
├─ ✦ .boobs
├─ ✦ .lesbian
├─ ✦ .pussy
├─ ✦ .pack
├─ ✦ .xvid
├─ ✦ .xnxx
│
╰──────────────────────────╯`*/

let toolsmenu = `
╭───✦ 『 *Tools Menu* 』 ✦───╮
│
├─ ✦ .nowa
├─ ✦ .qr 
├─ ✦ .qrcode 
├─ ✦ .style 
├─ ✦ .weather 
├─ ✦ .dehaze
├─ ✦ .recolor
├─ ✦ .hdr
├─ ✦ .length 
├─ ✦ .tinyurl 
├─ ✦ .shorten 
├─ ✦ .tempmail
├─ ✦ .shazam
├─ ✦ .cal 
├─ ✦ .carbon 
├─ ✦ .define 
├─ ✦ .element
├─ ✦ .google
├─ ✦ .itunes
├─ ✦ .lyrics
├─ ✦ .imdb
├─ ✦ .course
├─ ✦ .randomcourse
├─ ✦ .readmore 
├─ ✦ .readvo
├─ ✦ .removebg
├─ ✦ .ss 
├─ ✦ .ssf 
├─ ✦ .subreddit
├─ ✦ .telesticker Ⓛ
├─ ✦ .tourl
├─ ✦ .translate
├─ ✦ .true
├─ ✦ .tts
├─ ✦ .wa
├─ ✦ .wikipedia
│
╰──────────────────────────╯`

let Aimenu = `
╭───✦ 『 *AI Menu* 』 ✦───╮
│
├─ ✦ .bing
├─ ✦ .dalle
├─ ✦ .chatgpt
├─ ✦ .toanime
├─ ✦ .gitagpt
├─ ✦ .tocartoon
├─ ✦ .ai
├─ ✦ .bard
├─ ✦ .alexa
├─ ✦ .bingimg
├─ ✦ .gemini
│
╰──────────────────────────╯`

let religionmenu = `
╭───✦ 『 *Religion Menu* 』 ✦───╮
│
├─ ✦ .gita 
├─ ✦ .quran 
│
╰──────────────────────────╯`
let botmenu = `
╭───✦ 『 *Bot Menu* 』 ✦───╮
│
├─ ✦ .ping
├─ ✦ .runtime
├─ ✦ .script
├─ ✦ .server
├─ ✦ .blocklist
├─ ✦ .alive
├─ ✦ .info
├─ ✦ .owner
├─ ✦ .totalfeature
├─ ✦ .list
├─ ✦ .messi
├─ ✦ .cristianoronaldo
├─ ✦ .cr7
├─ ✦ .ppcouple
├─ ✦ .ppcp
├─ ✦ .pinterest
├─ ✦ .reg <name.age>
├─ ✦ .mysn
├─ ✦ .unreg
│
╰──────────────────────────╯`

let pluginmenu = `
╭───✦ 『 *Plugin Menu* 』 ✦───╮
│
├─ ✦ .plugins
├─ ✦ .install 
│
╰──────────────────────────╯`

const handler = async (m, { conn, command, text, args, usedPrefix }) => {
  let glb = global.db.data.users
  let usrs = glb[m.sender]
  let tag = `@${m.sender.split('@')[0]}`
  let mode = global.opts['self'] ? 'Private' : 'Public'

  let { age, exp, limit, level, role, registered, credit } = glb[m.sender]
  let { min, xp, max } = xpRange(level, global.multiplier)
  let name = await conn.getName(m.sender)
  let premium = glb[m.sender].premiumTime
  let prems = `${premium > 0 ? 'Premium' : 'Free'}`
  let platform = os.platform()

  let ucpn = `${ucapan()}`

  let _uptime = process.uptime() * 1000
  let _muptime
  if (process.send) {
    process.send('uptime')
    _muptime =
      (await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      })) * 1000
  }
  let muptime = clockString(_muptime)
  let uptime = clockString(_uptime)

  let totalfeatures = Object.values(global.plugins).filter(v => v.help && v.tags).length
  let totalreg = Object.keys(glb).length

  conn.lazackmenu = conn.lazackmenu ? conn.lazackmenu : {}

  global.fcontact = {
    key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' },
    message: {
      contactMessage: {
        displayName: `${name}`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
  }
  const infoText = `
╭───✦ 『 *${botname} Menu* 』 ✦───╮
│
│  𝙷𝚒 ${name} 👋
│  *${ucpn}*
├───✦ 『 *Bot Info* 』 ✦───
│  ⛥ *Bot Name:* ${botname}
│  ⛥ *Mode:* ${mode}
│  ⛥ *Platform:* ${platform}
│  ⛥ *Type:* NodeJs
│  ⛥ *Baileys:* Multi Device
│  ⛥ *Prefix:* [ *${usedPrefix}* ]
│  ⛥ *Uptime:* ${muptime}
│  ⛥ *Database Users:* ${totalreg}
│
├───✦ 『 *Command Info* 』 ✦───
│  ⛥ *Total Commands:* ${totalfeatures}
│
╰──────────────────────────╯

乂───✦ 『 *Menu Options* 』 ✦───乂
│
│ *1.* Bot Menu
│ *2.* Owner Menu
│ *3.* Group Menu
│ *4.* Fun Menu
│ *5.* Reaction Menu
│ *6.* Downloader Menu
│ *7.* Game Menu
│ *8.* Logo Menu
│ *9.* Sticker Menu
│ *10.* Audio Menu
│ *11.* News Menu
│ *12.* Economy Menu
│ *13.* Anime Menu
│ *14.* NSFW Menu
│ *15.* Tools Menu
│ *16.* AI Menu
│ *17.* Religion Menu
│ *18.* Plugin Menu
╰──────────────────────────╯

> *TEAM LAZACK*
${readMore}
`
  const { result, key, timeout } = await conn.sendMessage(
    m.chat,
    { video: { url: menuvid }, caption: infoText.trim(),
    contextInfo: {
      mentionedJid: [m.sender],
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120@newsletter',
        newsletterName: 'Free bot',
        serverMessageId: -1,
      },
      forwardingScore: 999,
      externalAdReply: {
        title: 'LAZACK ORG',
        body: 'ᴍᴇɴᴜ',
        thumbnailUrl: 'https://lazackorganisation.my.id/mtaju.jpg',
        sourceUrl: 'https://wa.me/255734980103',
        mediaType: 1,
        renderLargerThumbnail: false,
      },
    },
    
    gifPlayback: true, gifAttribution: 0 },
    { quoted: fcontact }
  )

  // Save the menu options to lazackmenu
  conn.lazackmenu[m.sender] = {
    result,
    key,
    timeout: setTimeout(() => {
      conn.sendMessage(m.chat, {
        delete: key,
      })
      delete conn.lazackmenu[m.sender]
    }, 150 * 1000),
  }
}

handler.before = async (m, { conn }) => {
  conn.lazackmenu = conn.lazackmenu ? conn.lazackmenu : {}
  if (m.isBaileys || !(m.sender in conn.lazackmenu)) return
  const { result, key, timeout } = conn.lazackmenu[m.sender]
  if (!m.quoted || m.quoted.id !== key.id || !m.text) return
  const choice = m.text.trim()

  if (choice === '1') {
    await conn.sendMessage(
      m.chat,
      { image: { url: 'https://lazackorganisation.my.id/mtaju.jpg.' }, caption: botmenu },
      { quoted: fcontact }
    )
  } else if (choice === '2') {
    await conn.sendMessage(
      m.chat,
      { image: { url: 'https://lazackorganisation.my.id/mtaju.jpg.' }, caption: ownermenu },
      { quoted: fcontact }
    )
  } else if (choice === '3') {
    await conn.sendMessage(
      m.chat,
      { image: { url: 'https://lazackorganisation.my.id/mtaju.jpg.' }, caption: groupmenu },
      { quoted: fcontact }
    )
  } else if (choice === '4') {
    await conn.sendMessage(
      m.chat,
      { image: { url: 'https://lazackorganisation.my.id/mtaju.jpg.' }, caption: funmenu },
      { quoted: fcontact }
    )
  } else if (choice === '5') {
    await conn.sendMessage(
      m.chat,
      { image: { url: 'https://lazackorganisation.my.id/mtaju.jpg.' }, caption: reactmenu },
      { quoted: fcontact }
    )
  } else if (choice === '6') {
    await conn.sendMessage(
      m.chat,
      { image: { url: 'https://lazackorganisation.my.id/mtaju.jpg.' }, caption: dlmenu },
      { quoted: fcontact }
    )
  } else if (choice === '7') {
    await conn.sendMessage(
      m.chat,
      { image: { url: 'https://lazackorganisation.my.id/mtaju.jpg.' }, caption: groupmenu },
      { quoted: fcontact }
    )
  } else if (choice === '8') {
    await conn.sendMessage(
      m.chat,
      { image: { url: 'https://lazackorganisation.my.id/mtaju.jpg.' }, caption: logomenu },
      { quoted: fcontact }
    )
  } else if (choice === '9') {
    await conn.sendMessage(
      m.chat,
      {
        image: { url: 'https://lazackorganisation.my.id/mtaju.jpg.' },
        caption: stickermenu,
      },
      { quoted: fcontact }
    )
  } else if (choice === '10') {
    await conn.sendMessage(
      m.chat,
      { image: { url: 'https://lazackorganisation.my.id/mtaju.jpg.' }, caption: audiomenu },
      { quoted: fcontact }
    )
  } else if (choice === '11') {
    await conn.sendMessage(
      m.chat,
      { image: { url: 'https://lazackorganisation.my.id/mtaju.jpg.' }, caption: newsmenu },
      { quoted: fcontact }
    )
  } else if (choice === '12') {
    await conn.sendMessage(
      m.chat,
      { image: { url: 'https://lazackorganisation.my.id/mtaju.jpg.' }, caption: economy },
      { quoted: fcontact }
    )
  } else if (choice === '13') {
    await conn.sendMessage(
      m.chat,
      { image: { url: 'https://lazackorganisation.my.id/mtaju.jpg.' }, caption: animemenu },
      { quoted: fcontact }
    )
  } else if (choice === '14') {
    await conn.sendMessage(
      m.chat,
      { image: { url: 'https://lazackorganisation.my.id/mtaju.jpg.' }, caption: nsfwmenu },
      { quoted: fcontact }
    )
  } else if (choice === '15') {
    await conn.sendMessage(
      m.chat,
      { image: { url: 'https://lazackorganisation.my.id/mtaju.jpg.' }, caption: toolsmenu },
      { quoted: fcontact }
    )
  } else if (choice === '16') {
    await conn.sendMessage(
      m.chat,
      { image: { url: 'https://lazackorganisation.my.id/mtaju.jpg.' }, caption: Aimenu },
      { quoted: fcontact }
    )
  } else if (choice === '17') {
    await conn.sendMessage(
      m.chat,
      {
        image: { url: 'https://lazackorganisation.my.id/mtaju.jpg.' },
        caption: religionmenu,
      },
      { quoted: fcontact }
    )
  } else if (choice === '18') {
    await conn.sendMessage(
      m.chat,
      { image: { url: 'https://lazackorganisation.my.id/mtaju.jpg.' }, caption: pluginmenu },
      { quoted: fcontact }
    )
  } else {
    m.reply('Invalid choice. Please reply with a valid number.')
  }
}

handler.help = ['play']
handler.tags = ['downloader']
handler.command = /^(menu)$/i
handler.limit = true
export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, ' H ', m, ' M ', s, ' S '].map(v => v.toString().padStart(2, 0)).join('')
}

function clockStringP(ms) {
  let ye = isNaN(ms) ? '--' : Math.floor(ms / 31104000000) % 10
  let mo = isNaN(ms) ? '--' : Math.floor(ms / 2592000000) % 12
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [
    ye,
    ' *Years 🗓️*\n',
    mo,
    ' *Month 🌙*\n',
    d,
    ' *Days ☀️*\n',
    h,
    ' *Hours 🕐*\n',
    m,
    ' *Minute ⏰*\n',
    s,
    ' *Second ⏱️*',
  ]
    .map(v => v.toString().padStart(2, 0))
    .join('')
}

function ucapan() {
  const time = moment.tz('Africa/Nairobi').format('HH')
  let res = 'Good morning ☀️'
  if (time >= 4) {
    res = 'Good Morning 🌄'
  }
  if (time >= 10) {
    res = 'Good Afternoon ☀️'
  }
  if (time >= 15) {
    res = 'Good Afternoon 🌇'
  }
  if (time >= 18) {
    res = 'Good Night 🌙'
  }
  return res
}