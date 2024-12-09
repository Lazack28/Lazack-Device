import fetch from "node-fetch"
import { generateWAMessageFromContent } from "@whiskeysockets/baileys"

let handler = async (m, { conn }) => {
let msg = await generateWAMessageFromContent(m.chat, {
  locationMessage: {
    degreesLatitude: 0,
    degreesLongitude: 0,
    name: "Lazack-Device Bot click here",
    address: "Tanzania",
    url: "https://Github.com/Lazack28/Lazack-Device",
    isLive: true,
    accuracyInMeters: 0,
    speedInMps: 0,
    degreesClockwiseFromMagneticNorth: 2,
    comment: "Your Welcome",
    jpegThumbnail: await conn.resize("https://imgur.com/q7WXO5w.jpeg", 300, 300),
  },
}, { quoted: m })

return conn.relayMessage(m.chat, msg.message, {})
}
handler.help = ['script']
handler.tags = ['info']
handler.command = ['script', 'script2']

export default handler
