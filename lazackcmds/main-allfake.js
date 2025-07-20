import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

var handler = m => m
handler.all = async function (m) {

global.getBuffer = async function getBuffer(url, options) {
try {
options ? options : {}
var res = await axios({
method: "get",
url,
headers: {
'DNT': 1,
'User-Agent': 'GoogleBot',
'Upgrade-Insecure-Request': 1
},
...options,
responseType: 'arraybuffer'
})
return res.data
} catch (e) {
console.log(`Error : ${e}`)
}}

global.creator = 'wa.me/51901930696'
global.botUser = `${conn.user.jid.split('@')[0]}`
global.channelName = '=͟͟͞❀ Lazackorganisation ⏤͟͟͞͞★'
global.channelName2 = '=͟͟͞❀ silvatech ⏤͟͟͞͞★'
global.groupName = 'ᰔᩚ lazack28 ❀'
global.communityName = 'ᰔᩚ javascript users ❀'
global.ready = '❀ *Here you go ฅ^•ﻌ•^ฅ*'
global.profilePhoto = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://lazackorganisation.my.id/mtaju.jpg')

global.channelIdList = ["@newsletter", "@newsletter"]
global.channelNameList = ["Lazackorganisation", "silvatech"]
global.randomChannel = await getRandomChannel()

global.d = new Date(new Date + 3600000)
global.locale = 'en'
global.day = d.toLocaleDateString(locale, {weekday: 'long'})
global.date = d.toLocaleDateString('en', {day: 'numeric', month: 'numeric', year: 'numeric'})
global.month = d.toLocaleDateString('en', {month: 'long'})
global.year = d.toLocaleDateString('en', {year: 'numeric'})
global.time = d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true})

global.rwait = '🕒'
global.done = '✅'
global.error = '✖️'
global.msg = '⚠︎'

global.emoji = '❀'
global.emoji2 = '✧'
global.emoji3 = '✦'
global.emoji4 = '❍'
global.emoji5 = '✰'
global.emojis = [emoji, emoji2, emoji3, emoji4].getRandom()

global.wait = '❍ Wait a moment, I am slow...';
global.waitt = '❍ Wait a moment, I am slow...';
global.waittt = '❍ Wait a moment, I am slow...';
global.waitttt = '❍ Wait a moment, I am slow...';

var channel = ''  
var community = ''
var web = 'https://github.com/lazack28'
var web2 = 'https://github.com/lazack28/Lazack-Device' 
let web3 = 'lazaromtaju12@gmail.com'
global.socials = [channel, community, web, web2, web3].getRandom()

let category = "image"
const db = './src/database/db.json'
const db_ = JSON.parse(fs.readFileSync(db))
const random = Math.floor(Math.random() * db_.links[category].length)
const randomlink = db_.links[category][random]
const response = await fetch(randomlink)
const rimg = await response.buffer()
global.icons = rimg

var now = new Date(); var hour = now.getHours(); switch(hour){ case 0: hour = 'Good Night 🌃'; break; case 1: hour = 'Good Night 🌃'; break; case 2: hour = 'Good Night 🌃'; break; case 3: hour = 'Good Morning 🌄'; break; case 4: hour = 'Good Morning 🌄'; break; case 5: hour = 'Good Morning 🌄'; break; case 6: hour = 'Good Morning 🌄'; break; case 7: hour = 'Good Morning 🌅'; break; case 8: hour = 'Good Morning 🌄'; break; case 9: hour = 'Good Morning 🌄'; break; case 10: hour = 'Good Day 🌤'; break; case 11: hour = 'Good Day 🌤'; break; case 12: hour = 'Good Day 🌤'; break; case 13: hour = 'Good Day 🌤'; break; case 14: hour = 'Good Afternoon 🌆'; break; case 15: hour = 'Good Afternoon 🌆'; break; case 16: hour = 'Good Afternoon 🌆'; break; case 17: hour = 'Good Afternoon 🌆'; break; case 18: hour = 'Good Night 🌃'; break; case 19: hour = 'Good Night 🌃'; break; case 20: hour = 'Good Night 🌃'; break; case 21: hour = 'Good Night 🌃'; break; case 22: hour = 'Good Night 🌃'; break; case 23: hour = 'Good Night 🌃'; break;}
global.greeting = hour;

global.name = m.pushName || 'Anonymous'
global.taguser = '@' + m.sender.split("@s.whatsapp.net")
var more = String.fromCharCode(8206)
global.readMore = more.repeat(850)

global.packsticker = `°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°\nᰔᩚ User: ${name}\n❀ Bot: ${botname}\n✦ Date: ${date}\nⴵ Time: ${time}`;
global.packsticker2 = `\n°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°\n\n${dev}`
  
global.fakeContact = { key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `@g.us` } : {}) }, message: { 'contactMessage': { 'displayName': `${name}`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${name},;;;\nFN:${name},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Mobile\nEND:VCARD`, 'jpegThumbnail': null, thumbnail: null,sendEphemeral: true}}}

global.fake = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: randomChannel.id, newsletterName: randomChannel.name, serverMessageId: -1 }
}}, { quoted: m }

global.icon = [
'https://qu.ax/zzrcJ.jpg',
].getRandom()

global.rchannel = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: randomChannel.id, serverMessageId: 100, newsletterName: randomChannel.name, }, externalAdReply: { showAdAttribution: true, title: packname, body: dev, mediaUrl: null, description: null, previewType: "PHOTO", thumbnailUrl: icon, sourceUrl: socials, mediaType: 1, renderLargerThumbnail: false }, }, }}

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}

async function getRandomChannel() {
let randomIndex = Math.floor(Math.random() * channelIdList.length)
let id = channelIdList[randomIndex]
let name = channelNameList[randomIndex]
return { id, name }
}