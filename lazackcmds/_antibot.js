import { areJidsSameUser } from '@whiskeysockets/baileys'

export async function before(m, { participants, conn }) {
    if (m.isGroup) {
    let chat = global.db.data.chats[m.chat]

        if (!chat.antiBot) {
            return
        }

        let botJid = global.conn.user.jid

        if (botJid === conn.user.jid) {
            return
        } else {
            let isBotPresent = participants.some(p => areJidsSameUser(botJid, p.id))

            if (isBotPresent) {
                setTimeout(async () => {
                    await this.groupLeave(m.chat)
                }, 5000)
            }
        }
    }
}
