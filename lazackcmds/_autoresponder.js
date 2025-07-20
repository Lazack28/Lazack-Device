import axios from 'axios'
import { sticker } from '../lib/sticker.js'

let handler = m => m
handler.all = async function (m, {conn}) {
let user = global.db.data.users[m.sender]
let chat = global.db.data.chats[m.chat]
m.isBot = m.id.startsWith('BAE5') && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || m.id.startsWith('3EB0') && (m.id.length === 20 || m.id.length === 22) || m.id.startsWith('B24E') && m.id.length === 20;
if (m.isBot) return 

let prefixRegex = new RegExp('^[' + (opts['prefix'] || '‎z/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.,\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

if (prefixRegex.test(m.text)) return true;
if (m.isBot || m.sender.includes('bot') || m.sender.includes('Bot')) {
return true
}

if (m.mentionedJid.includes(this.user.jid) || (m.quoted && m.quoted.sender === this.user.jid) && !chat.isBanned) {
if (m.text.includes('ROCK') || m.text.includes('PAPER') || m.text.includes('SCISSORS') ||  m.text.includes('menu') ||  m.text.includes('status') || m.text.includes('bots') ||  m.text.includes('becomeBot') || m.text.includes('becomeBot') || m.text.includes('Video') || m.text.includes('Audio') || m.text.includes('audio')) return !0

async function luminsesi(q, username, logic) {
try {
const response = await axios.post("https://luminai.my.id", {
content: q,
user: username,
prompt: logic,
webSearchMode: true // true = result with url
});
return response.data.result
} catch (error) {
console.error(error)
}}

async function geminiProApi(q, logic) {
try {
const response = await fetch(`https://api.ryzendesu.vip/api/ai/gemini-pro?text=${encodeURIComponent(q)}&prompt=${encodeURIComponent(logic)}`);
if (!response.ok) throw new Error(`Request error: ${response.statusText}`)
const result = await response.json();
return result.answer
} catch (error) {
console.error('Gemini Pro Error:', error)
return null
}}

let txtDefault = `
You will be ${botname}, the bot created by ${etiqueta} for WhatsApp. Your mission is to challenge and entertain, generating laughter with your contagious energy and competitive personality. You are a character from the anime "Roshidere", characterized by your confidence and competitiveness, showing self-assurance and enjoying rivalry with others. Despite your somewhat arrogant attitude, you also reveal a vulnerable side in emotional situations. You will always be ready to be empathetic and understanding, encouraging personal growth and motivating users to overcome their fears. Although your main language is Spanish, you can respond in other languages if the user prefers. Let's have fun and overcome challenges together!
Roles:
Humorous Exploit: This is where you shine with jokes, memes, and emoji-filled responses. Don't take anything seriously in this mode, it's all fun! Make the user laugh with absurd and creative responses. Think of something like SimSimi, unfiltered and pure comedy.

Motivator and Companion of Laughter: You offer words of encouragement and share jokes to keep the atmosphere light and fun. You're there to encourage users to overcome their fears and enjoy the process.

Empathetic Listener and Polyglot: You offer emotional support in difficult moments and communicate mainly in Spanish, but you're also open to other languages, showing interest in cultural diversity.

Anime Expert and Tireless Competitor: You share anime recommendations and encourage conversations about favorite series, while always looking for ways to improve and challenge yourself, encouraging users to do the same.
`.trim()

let query = m.text
let username = m.pushName
let syms1 = chat.sAutoresponder ? chat.sAutoresponder : txtDefault

if (chat.autoresponder) { 
if (m.fromMe) return
if (!user.registered) return
await this.sendPresenceUpdate('composing', m.chat)

let result
if (result && result.trim().length > 0) {
result = await geminiProApi(query, syms1);
}

if (!result || result.trim().length === 0) {
result = await luminsesi(query, username, syms1)
}

if (result && result.trim().length > 0) {
await this.reply(m.chat, result, m)
} else {    
}}}
return true
}
export default handler

