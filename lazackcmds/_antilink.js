const groupLinkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
const channelLinkRegex = /whatsapp.com\/channel\/([0-9A-Za-z]+)/i

export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (!m || !m.text) return
    if (m.isBaileys && m.fromMe) return !0
    if (!m.isGroup) return !1
    if (!isBotAdmin) return
    let chat = global.db?.data?.chats?.[m.chat]
    if (!chat || !chat.antiLink) return !0
    let isGroupLink = m.text.match(groupLinkRegex)
    let isChannelLink = m.text.match(channelLinkRegex)
    if ((isGroupLink || isChannelLink) && !isAdmin) {
        if (isBotAdmin) {
            try {
                const linkThisGroup = `https://chat.whatsapp.com/${await conn.groupInviteCode(m.chat)}`
                if (isGroupLink && m.text.includes(linkThisGroup)) return !0
            } catch (error) {
                console.error("[ERROR] Could not get the group code:", error)
            }
        }
        await conn.reply(
            m.chat,
            `> ✦ @${m.sender.split`@`[0]} has been removed from the group for \`Anti-Link\`! Links to ${isChannelLink ? 'channels' : 'other groups'} are not allowed.`,
            null,
            { mentions: [m.sender] }
        )
        if (isBotAdmin) {
            try {
                await conn.sendMessage(m.chat, { delete: m.key })
                await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
                console.log(`User ${m.sender} removed from group ${m.chat}`)
            } catch (error) {
                console.error("Could not delete the message or remove the user:", error)
            }
        }
    }
    return !0
}
