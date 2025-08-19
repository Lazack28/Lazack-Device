import acrcloud from "acrcloud"

// Initialize ACRCloud client
const acr = new acrcloud({
   host: "identify-ap-southeast-1.acrcloud.com",
   access_key: "ee1b81b47cf98cd73a0072a761558ab1",
   access_secret: "ya9OPe8onFAnNkyf9xMTK8qRyMGmsghfuHrIMmUI"
})

let handler = async (m, { conn, text }) => {
   let q = m.quoted ? m.quoted : m
   if (!q.mimetype || !q.mimetype.includes("audio")) {
      return m.reply("❀ Please reply to the audio you want to identify.")
   }

   m.react('🕒')
   let buffer = await q.download()

   try {
      let data = await identifyMusic(buffer)
      if (!data.length) return m.reply("✧ No song data found.")

      let messageText = "乂 S H A Z A M - M U S I C 乂\n\n"
      for (let result of data) {
         messageText += `> ✐ Title » ${result.title}\n`
         messageText += `> ✦ Artist » ${result.artist}\n`
         messageText += `> ⴵ Duration » ${result.duration}\n`
         messageText += `> 🜸 Links » ${result.url.filter(x => x).map(i => `\n${i}`).join("\n")}\n\n`
      }

      conn.relayMessage(m.chat, {
         extendedTextMessage: {
            text: messageText + dev,
            contextInfo: {
               mentionedJid: conn.parseMention(messageText),
               externalAdReply: {
                  title: '✧ Whats • Music ✧',
                  mediaType: 1,
                  previewType: 0,
                  renderLargerThumbnail: true,
                  thumbnail: await (await fetch('https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742781294508.jpeg')).buffer(),
                  sourceUrl: ''
               }
            }
         }
      }, { quoted: m })

      m.react('✅')
   } catch (error) {
      m.reply("⚠︎ An error occurred.")
   }
}

handler.command = ["whatmusic", "shazam"]
handler.help = ["whatmusic"]
handler.tags = ["tools"]
export default handler

async function identifyMusic(buffer) {
   let data = (await acr.identify(buffer)).metadata
   if (!data.music) return []

   return data.music.map(track => ({
      title: track.title,
      artist: track.artists[0].name,
      duration: formatTime(track.duration_ms),
      url: Object.keys(track.external_metadata).map(platform =>
         platform === "youtube"
            ? "https://youtu.be/" + track.external_metadata[platform].vid
            : platform === "deezer"
               ? "https://www.deezer.com/us/track/" + track.external_metadata[platform].track.id
               : platform === "spotify"
                  ? "https://open.spotify.com/track/" + track.external_metadata[platform].track.id
                  : ""
      )
   }))
}

function formatTime(ms) {
   let m = Math.floor(ms / 60000) % 60
   let s = Math.floor(ms / 1000) % 60
   return [m, s].map(v => v.toString().padStart(2, "0")).join(":")
}
