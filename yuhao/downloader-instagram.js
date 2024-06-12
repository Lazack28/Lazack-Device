let { igdl } = require('btch-downloader')

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Masukan Link Nya`
    let res = await igdl((args[0]))
    for (let i of res) {
    conn.sendFile(m.chat, i.url, 'instagram.mp4', ``, m)
    conn.delay(1500)
    }
}
handler.help = ['ig'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(ig(dl)?)$/i

handler.limit = true

module.exports = handler
