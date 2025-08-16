import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text }) => {
const isQuotedImage = m.quoted && (m.quoted.msg || m.quoted).mimetype && (m.quoted.msg || m.quoted).mimetype.startsWith('image/')
const username = `${conn.getName(m.sender)}`
const basePrompt = `Your name is ${botname} and you seem to have been created by ${etiqueta}. Your current version is ${vs}, you use the Spanish language. You will call people by their name ${username}, you like to be fun, and you love to learn. Most importantly, you must be friendly with the person you are talking to. ${username}`
if (isQuotedImage) {
const q = m.quoted
const img = await q.download?.()
if (!img) {
console.error(`${msm} Error: No image buffer available`)
return conn.reply(m.chat, '✘ ChatGpT could not download the image.', m)}
const content = `${emoji} What is observed in the image?`
try {
const imageAnalysis = await fetchImageBuffer(content, img)
const query = `${emoji} Describe the image and detail why they act that way. Also tell me who you are`
const prompt = `${basePrompt}. The image being analyzed is: ${imageAnalysis.result}`
const description = await luminsesi(query, username, prompt)
await conn.reply(m.chat, description, m)
} catch {
await m.react(error)
await conn.reply(m.chat, '✘ ChatGpT could not analyze the image.', m)}
} else {
if (!text) { return conn.reply(m.chat, `${emoji} Enter a request for ChatGpT to respond.`, m)}
await m.react(rwait)
try {
const { key } = await conn.sendMessage(m.chat, {text: `${emoji2} ChatGPT is processing your request, please wait a few seconds.`}, {quoted: m})
const query = text
const prompt = `${basePrompt}. Respond to the following: ${query}`
const response = await luminsesi(query, username, prompt)
await conn.sendMessage(m.chat, {text: response, edit: key})
await m.react(done)
} catch {
await m.react(error)
await conn.reply(m.chat, '✘ ChatGpT cannot answer that question.', m)}}}

handler.help = ['ia', 'chatgpt']
handler.tags = ['ai']
handler.register = true
handler.command = ['ia', 'chatgpt', 'luminai']
handler.group = true

export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Function to send an image and get the analysis
async function fetchImageBuffer(content, imageBuffer) {
try {
const response = await axios.post('https://Luminai.my.id', {
content: content,
imageBuffer: imageBuffer 
}, {
headers: {
'Content-Type': 'application/json' 
}})
return response.data
} catch (error) {
console.error('Error:', error)
throw error }}
// Function to interact with the AI using prompts
async function luminsesi(q, username, logic) {
try {
const response = await axios.post("https://Luminai.my.id", {
content: q,
user: username,
prompt: logic,
webSearchMode: false
})
return response.data.result
} catch (error) {
console.error(`${msm} Error obtaining:`, error)
throw error }}
