import moment from 'moment-timezone'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  try {
    let res = await fetch('https://api.github.com/repos/Lazack28/Lazack-Device')

    if (!res.ok) throw new Error('Error fetching repository data')
    let json = await res.json()

    let txt = `*乂  M A I N  -  S C R I P T  乂*\n\n`
    txt += `✩  *Name* : ${json.name}\n`
    txt += `✩  *Watchers* : ${json.watchers_count}\n`
    txt += `✩  *Size* : ${(json.size / 1024).toFixed(2)} MB\n`
    txt += `✩  *Updated* : ${moment(json.updated_at).tz('America/Lima').format('DD/MM/YY - HH:mm:ss')}\n`
    txt += `✩  *Url* : ${json.html_url}\n`
    txt += `✩  *Forks* : ${json.forks_count}\n`
    txt += `✩  *Stars* : ${json.stargazers_count}\n\n`
    txt += `> *Lazack28 Official | Lazack Device*`

    await conn.sendMessage(m.chat, {
      text: txt,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: '✨ Lazack-Device v2.0.0 (BETA)',
          body: 'Official bot repository',
          thumbnailUrl: 'https://qu.ax/nGaLj.jpg',
          sourceUrl: json.html_url,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

  } catch {
    await conn.reply(m.chat, '⚠️ An error occurred while fetching the repository.', m)
    await m.react('❌')
  }
}

handler.help = ['script', 'sc', 'repo']
handler.tags = ['main']
handler.command = ['script', 'sc', 'repo']
handler.register = true

export default handler