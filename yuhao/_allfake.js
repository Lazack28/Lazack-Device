let fs = require('fs')
let fetch = require('node-fetch')
let axios = require('axios')
let moment = require('moment-timezone')

let handler = m => m
handler.all = async function (m) {
    let name = m.name
	let pp = 'https://i.ibb.co/gS0XrNc/avatar-contact.png'
	try {
		pp = await this.profilePictureUrl(m.sender, 'image')
	} catch (e) {
	} finally {
		
        global.bg = await (await fetch(thumb)).buffer()
		global.doc = pickRandom(["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/pdf"])
		
		// Module 
		global.fetch = require('node-fetch')
		global.baileys = require('@whiskeysockets/baileys')
		global.axios = require('axios')
		
		const _uptime = process.uptime() * 1000
        
		// ucapan ini mah
		global.ucapan = ucapan()
		global.wib = moment.tz('Asia/Jakarta').format("HH:mm:ss")

//Image
        let flaaa = JSON.parse(fs.readFileSync('./nayla/fla.json'))
        global.fla = pickRandom(flaaa)
        let res = await fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/neko.txt')
        let txt = await res.text()
        let arr = txt.split('\n')
        let cita = arr[Math.floor(Math.random() * arr.length)]
        global.imgg = cita
        let waifu = JSON.parse(fs.readFileSync('./nayla/waifu.json'))
        global.img = pickRandom(waifu)
        global.social = pickRandom([global.sgh, global.sig, global.snh, global.sch, global.sgc])
        
		// pesan sementara
		global.ephemeral = '86400' // 86400 = 24jam, kalo ingin di hilangkan ganti '86400' jadi 'null' atau ''
		
		// externalAdReply atau text with thumbnail. gatau bahasa Inggris? coba translate!
		global.adReply = {
			contextInfo: {
    forwardingScore: 12,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363294442288954@newsletter',
      serverMessageId: null,
      newsletterName: titlebot,
    },
				externalAdReply: {
                showAdAttribution: `${global.iklan}`, //ganti dari false ke true jika ingin ada, kirim melalui iklan, di atas pesan bot
                title: `${global.ucapan}`,
                body: wm,
                mediaType: 1,
                thumbnail: await (await fetch(thumb)).buffer(),
                sourceUrl: ``,
               }
			}
		}
		
		global.flocation = {
	key : {
           participant : '0@s.whatsapp.net'
                        },
       message: {
                    locationMessage: {
                    name: 'Chinese`s',
                    jpegThumbnail: fs.readFileSync('./yuhao.jpeg')
                          }
                        }
                      }
		
		// Fake ðŸ¤¥
		global.ftroli = { key: { remoteJid: 'status@broadcast', participant: '0@s.whatsapp.net' }, message: { orderMessage: { itemCount: 2023, status: 1, thumbnail: await conn.resize(img, 280, 210), surface: 1, message: wm, orderTitle: wm, sellerJid: '0@s.whatsapp.net' } } }
		global.fkontak = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': wm, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${wm},;;;\nFN:${wm},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`, 'jpegThumbnail': fs.readFileSync('./yuhao.jpeg'), thumbnail: fs.readFileSync('./yuhao.jpeg'),sendEphemeral: true}}}
		
        global.fvn = {
            key: { 
                 fromMe: false,
                 participant: `0@s.whatsapp.net`, ...(m.chat ? 
            { remoteJid: "6285736178354-1625305606@g.us" } : {}) 
                       },
            message: { 
               "audioMessage": {
                        "mimetype":"audio/ogg; codecs=opus",
                        "seconds": "999999999999",
                        "ptt": "true"
                               }
                             } 
                            }
               
                global.ftextt = {
            key: { 
                 fromMe: false,
                 participant: `0@s.whatsapp.net`, ...(m.chat ? 
            { remoteJid: "6285736178354-1625305606@g.us" } : {}) 
                       },
            message: { 
               "extendedTextMessage": {
                        "text":wm,
                        "title": wm,
                        'jpegThumbnail': fs.readFileSync('./yuhao.jpeg')
                               }
                             } 
                            }
               
                                      // Random Pick Fake
                             let pft = [global.flocation, global.ftroli, global.fkontak, global.ftextt, global.fvn]
			                   // Get Random
		                     global.fakes = pickRandom(pft)
		        
	}
}

module.exports = handler

function ucapan() {
	const time = moment.tz('Asia/Jakarta').format('HH')
	let res = "Selamat malam 🌌"
	if(time >= 1) {
		res = "Selamat Dini hari 🌌"
	}
	if(time >= 4) {
		res = "Selamat pagi ⛅"
	}
	if(time > 10) {
		res = "Selamat siang 🌅"
	}
	if(time >= 15) {
		res = "Selamat sore 🌇"
	}
	if(time >= 18) {
		res = "Selamat malam 🌃"
	}
	return res
}

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
			       }
