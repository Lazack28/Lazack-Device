let levelling = require('../lib/levelling')
let fs = require('fs')
let { generateWAMessageFromContent } = require('@whiskeysockets/baileys')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
const defaultMenu = {
  before: `
❐  *「 INFO USER 」*
┆ *Name* : %name
┆ *Limit* : %limit Limit
┆ *Role* : %role
┆ *Level* : %level 
┆ *Exp* : %totalexp XP 
┗┬────────────────┈ꕥ
┌┤   *「 TODAY 」*
┆┗────────────⳹
┆ *Hari* : %week %weton
┆ *Tanggal* : %date
┆ *Tanggal Islam* : %dateIslamic
┆ *Waktu* : %time
┗────────────────┈ꕥ
%readmore`.trim(),
  header: '❐   *「 %category 」*',
  body: '│ ✾ %cmd %islimit %isPremium',
  footer: '└────────┈ꕥ\n',
  after: `
*%npmname@^%version*
${'```%npmdesc```'}
`,
}
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {

  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'ai', 'internet', 'fun', 'kerang', 'tools', 'info', 'xp', 'game', 'anime', 'downloader', 'group', 'owner', 'sticker', 'advanced', 'tanpakategori']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
'main': 'Main',
'ai': 'Openai',
'internet': 'Internet',
'fun': 'Fun',
'kerang': 'Kerang Ajaib',
'tools': 'Tools',
'info': 'Info',
'xp': 'Exp',
'game': 'Game',
'anime': 'Anime',
'downloader': 'Downloader',
'group': 'Group',
'owner': 'Creator',
'sticker': 'Sticker',
'advanced': 'Advanced',
'': 'No Catagory'
  }
  if (teks == 'game') tags = {
    'game': 'Game',
    'rpg': 'RPG'
  }
  if (teks == 'ai') tags = { 
    'ai': 'OPENAI'
  }
  if (teks == 'anime') tags = { 
    'anime': 'Anime'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'keranga') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'grup') tags = {
    'group': 'Grup'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'tanpakategori') tags = {
    '': 'Tanpa Kategori'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'advanced': 'Advanced'
  }



  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, age, money, level, role, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let umur = `*${age == '-1' ? 'Belum Daftar*' : age + '* Thn'}`
    let name = registered ? global.db.data.users[m.sender].name : m.name
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.yuhao).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
      let sections = [
      {
        title: 'List Menu ',
        rows: [
          { "header": "", "title": 'Semua Perintah', "description": "", "id": `${_p + command} all` },
          { "header": "", "title": 'AI', "description": "", "id": `${_p + command} ai` },
          { "header": "", "title": 'Game', "description": "", "id": `${_p + command} game` },
          { "header": "", "title": 'Rpg', "description": "", "id": `${_p + command} rpg` },
          { "header": "", "title": 'Anime', "description": "", "id": `${_p + command} anime` },
	  { "header": "", "title": 'XP', "description": "", "id": `${_p + command} xp` },
          { "header": "", "title": 'Stiker', "description": "", "id": `${_p + command} stiker` },
          { "header": "", "title": 'Kerang Ajaib', "description": "", "id": `${_p + command} keranga` },
          { "header": "", "title": 'Grup', "description": "", "id": `${_p + command} grup` },
          { "header": "", "title": 'Internet', "description": "", "id": `${_p + command} internet` },
          { "header": "", "title": 'Downloader', "description": "", "id": `${_p + command} downloader` },
          { "header": "", "title": 'Tools', "description": "", "id": `${_p + command} tools` },
          { "header": "", "title": 'Fun', "description": "", "id": `${_p + command} fun`},
          { "header": "", "title": 'Info', "description": "", "id": `${_p +command} info` },
          { "header": "", "title": 'Tanpa Kategori', "description": "", "id": `${_p + command} tanpakategori` },
          { "header": "", "title": 'Owner', "description": "", "id": `${_p + command} owner` },
        ]       
      }, {
      'title': 'MAIN ',
        rows: [
          { "header": "", "title": 'Creator', "description": "Nomer pengembang BOT", "id": `${_p}owner` },
          { "header": "", "title": 'Speed', "description": "menampilkan kecepatan respon BOT", "id": `${_p}ping` },
        ]
      }
    ]
      let judul = `✧────···[ Dashboard ]···────✧
*${ucapan()} ${m.name}*
╭━━━━━━━━━━━━━━━━┈─✧
┴
│⬡ Aktif selama ${muptime}
│⬡ Prefix : [ ${_p} ]
│⬡ *${Object.keys(global.db.data.users).length}* Pengguna
│⬡ *${Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned).length}* Chat Terbanned
│⬡ *${Object.entries(global.db.data.users).filter(user => user[1].banned).length}* Pengguna Terbanned
┬
├━━━━━━━━━━━━━━━━┈─⋆
│ ▸ *ᴀᴜᴛʜᴏʀ :* ʙᴇᴛᴀʙᴏᴛᴢ-ᴍᴅ
┴ ▸ *ᴏᴡɴᴇʀ :* ɴᴀʏʟᴀ-ʜᴀɴɪꜰᴀʜ
✧
┬ 📌 𝗣𝗶𝗻𝗻𝗲𝗱 :
│ ʙᴇʀɪ ᴊᴇᴅᴀ ʏᴀʜ ᴋᴀᴋ ^ω^
╰━━━━━━━━━━━━━━━━┈─◂`
      
    let msg = {
		viewOnceMessage: {
			message: {
				messageContextInfo: {
					deviceListMetadata: {},
					deviceListMetadataVersion: 2,
				},
				interactiveMessage: {
					body: {
						text: judul,
					},
					footer: {
						text: wm,
					},
					header: {
						title: '',
						subtitle: '',
						hasMediaAttachment: false
					},
					nativeFlowMessage: {
						buttons: [
							{
              "name": "single_select",
              "buttonParamsJson":
JSON.stringify({
 "title": "Klik Disini ⎙",
"sections": sections
              })              
            } 
						],
					},
					contextInfo: {
						quotedMessage: m.message,
						participant: m.sender,
						...m.key
					}
				},
			},
		},
	};
    return conn.relayMessage(m.chat, msg, { });
    
    }

    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      ucapan: global.ucapan,
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Siap untuk *${_p}levelup*` : `${max - exp} XP lagi untuk levelup`,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, umur, money, age, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    const media = await baileys.prepareWAMessageMedia({ document: (await conn.getFile(thumb)).data, fileName: namedoc, mimetype: doc, fileLength: global.fsizedoc, pageCount: global.fpagedoc }, { upload: conn.waUploadToServer })
    const media = await baileys.prepareWAMessageMedia({ document: (await conn.getFile(thumb)).data, fileName: namedoc, mimetype: doc, fileLength: global.fsizedoc, pageCount: global.fpagedoc }, { upload: conn.waUploadToServer })
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.ibb.co/gS0XrNc/avatar-contact.png')
    const msg = {
		viewOnceMessage: {
			message: {
				messageContextInfo: {
					deviceListMetadata: {},
					deviceListMetadataVersion: 2,
				},
				interactiveMessage: {
					body: {
						text: null,
					},
					footer: {
						text: text,
					},
					header: {
						title: '',
						subtitle: '',
						hasMediaAttachment: true,
						...media
					},
					nativeFlowMessage: {
						buttons: [
							{
              "name": "quick_reply",
              "buttonParamsJson":
JSON.stringify({
 "display_text": "OWNER",
"id": ".owner"
              })              
            } //snd
						],
					},
					contextInfo: {
    forwardingScore: 12,
    isForwarded: true,
    quotedMessage: m.message,
						participant: m.sender,
						...m.key,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363294442288954@newsletter',
      serverMessageId: null,
      newsletterName: namebot,
    },
				externalAdReply: {
                title: 'ʜᴏᴡ ᴀʀᴇ ʏᴏᴜ ᴛᴏᴅᴀʏ?',
                body: null,
                mediaType: 1,
                thumbnail: await (await fetch(pp)).buffer(),
                sourceUrl: sgh,
                        }
		           	}
				}
			},
		},
	};
	conn.relayMessage(m.chat, msg, { });
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', 'help']
handler.tags = ['main']
handler.command = /^(m(enu)?|help)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "Selamat dinihari"
  if (time >= 4) {
    res = "Selamat pagi"
  }
  if (time > 10) {
    res = "Selamat siang"
  }
  if (time >= 15) {
    res = "Selamat sore"
  }
  if (time >= 18) {
    res = "Selamat malam"
  }
  return res
	}
