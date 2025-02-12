import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].nsfw) {
    return conn.reply(m.chat, `🚩 this can be used in group *Nsfw.*\n\n> administrator onl can activate this command */on nsfw*`, m, rcanal);
}
let res = await fetch(`https://fantox-apis.vercel.app/${command}`)
await m.react('🕓')
try {
if (!res.ok) throw await res.text()
let json = await res.json()
if (!json.url) throw m.react('✖️')
await conn.sendFile(m.chat, json.url, 'thumbnail.jpg', `*» Resultado* : ${command}`, m, null, rcanal)
await m.react('✅')
} catch {
await m.react('✖️')
}}
handler.command = ['genshin', 'swimsuit', 'schoolswimsuit', 'white', 'barefoot', 'touhou', 'gamecg', 'hololive', 'uncensored', 'sunglasses', 'glasses', 'weapon', 'shirtlift', 'chain', 'fingering', 'flatchest', 'torncloth', 'bondage', 'demon', 'wet', 'pantypull', 'headdress', 'headphone', 'tie', 'anusview', 'shorts','stokings', 'topless', 'beach', 'bunnygirl', 'bunnyear', 'idol', 'vampire', 'gun', 'maid', 'bra', 'nobra', 'bikini', 'whitehair', 'blonde', 'pinkhair', 'bed', 'ponytail', 'nude', 'dress', 'underwear', 'foxgirl', 'uniform', 'skirt', 'sex', 'sex2', 'sex3', 'breast', 'twintail', 'spreadpussy', 'tears', 'seethrough', 'breasthold', 'drunk', 'fateseries', 'spreadlegs', 'openshirt', 'headband', 'food', 'close', 'tree', 'nipples', 'erectnipples', 'horns', 'greenhair', 'wolfgirl', 'catgirl']
handler.premium = false 
handler.register = true 
//handler.limit = 10
handler.group = true 

export default handler