var fetch = require('node-fetch');
var util = require('util');
var api = require('betabotz-tools')

var handler = async (m, {
 text, 
 usedPrefix, 
 command
 }) => {
if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* Siapa presiden Indonesia? `
 await m.reply(wait)
  var ai = await fetch(`https://aemt.me/gpt4?text=${text}`)
  var res = await ai.json();
try {
  await m.reply(res.result)
} catch (err) {
m.reply(util.format(js))
}}
handler.command = handler.help = ['gpt4'];
handler.tags = ['ai'];
handler.limit = 2
module.exports = handler;