let handler = m => m
handler.before = async function (m, { conn, isBotAdmin }) {

let chat = globalThis.db.data.chats[m.chat];

// If the bot is admin and autoReject is enabled
if (isBotAdmin && chat.autoRechazar) {
    const prefixes = ['6', '90', '963', '966', '967', '249', '212', '92', '93', '94', '7', '49', '2', '91', '48']
    // If sender's number starts with any of the prefixes, reject their group join request
    if (prefixes.some(prefix => m.sender.startsWith(prefix))) {
        await conn.groupRequestParticipantsUpdate(m.chat, [m.sender], 'reject')
    }
}

// If autoAccept is enabled and bot is admin
if (chat.autoAceptar && isBotAdmin) {
    const participants2 = await conn.groupRequestParticipantsList(m.chat)
    // Filter participants whose number starts with '5'
    const filteredParticipants = participants2.filter(p => p.jid.includes('@s.whatsapp.net') && p.jid.split('@')[0].startsWith('5'))
    for (const participant of filteredParticipants) {
        await conn.groupRequestParticipantsUpdate(m.chat, [participant.jid], "approve")
    }
    // If a join request message is detected and the number starts with '5', approve it
    if (m.messageStubType === 172 && m.messageStubParameters?.[0]?.includes('@s.whatsapp.net')) {
        const jid = m.messageStubParameters[0]
        if (jid.split('@')[0].startsWith('5')) {
            await conn.groupRequestParticipantsUpdate(m.chat, [jid], "approve")
        }
    }
}

// If bot is admin and antiFake is enabled
if (isBotAdmin && chat.antifake) {
    const antiFakePrefixes = ['6', '90', '212', '92', '93', '94', '7', '49', '2', '91', '48']
    // If sender's number starts with any of the anti-fake prefixes, block and remove them
    if (antiFakePrefixes.some(prefix => m.sender.startsWith(prefix))) {
        global.db.data.users[m.sender].block = true
        await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    }
}

}
export default handler
