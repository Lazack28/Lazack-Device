
let handler = async (m, { conn, text }) => {
  try {
    const delay = (time) => new Promise((res) => setTimeout(res, time))

    let getGroups = await conn.groupFetchAllParticipating()
    let groups = Object.values(getGroups).map((v) => v.id)

    if (!text) throw '❌ *ENTER THE MESSAGE YOU WANT TO BROADCAST*'

    let sentCount = 0
    for (let groupId of groups) {
      await delay(500) // Adjust delay to avoid rate limits

      try {
        await conn.relayMessage(
          groupId,
          {
            liveLocationMessage: {
              degreesLatitude: 35.6855,
              degreesLongitude: 139.7527,
              accuracyInMeters: 1,
              degreesClockwiseFromMagneticNorth: 0,
              caption: `📢 *BROADCAST ┃ OFFICIAL ANNOUNCEMENT*\n━━━━━━━━━━━━\n${text}\n\n🔹 *Thank you for your attention.*`,
              sequenceNumber: 2,
              timeOffset: 3,
              contextInfo: m,
            },
          },
          {}
        )
        sentCount++
      } catch (e) {
        console.error(`❌ Failed to send to group: ${groupId}`, e.message)
      }
    }

    m.reply(
      `✅ *BROADCAST COMPLETED!*\n📩 *Sent to:* ${sentCount}/${groups.length} groups\n\n⚠️ *Some messages may have failed due to restrictions.*`
    )
  } catch (err) {
    console.error('❌ Broadcast Error:', err.message)
    m.reply('⚠️ An error occurred while sending the group broadcast.')
  }
}

handler.help = ['broadcastgroup', 'bcgc'].map((v) => v + ' <text>')
handler.tags = ['owner']
handler.command = /^(broadcast|bc)(group|grup|gc)$/i
handler.owner = true

export default handler
