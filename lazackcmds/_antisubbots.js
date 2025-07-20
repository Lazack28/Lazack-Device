import { areJidsSameUser } from '@whiskeysockets/baileys'
export async function before(m, { participants, conn }) {
    if (m.isGroup) {
        let chat = global.db.data.chats[m.chat];

        if (!chat.antiBot2) {
            return
        }

        let botJid = global.conn.user.jid // Main bot's JID

        if (botJid === conn.user.jid) {
            return
        } else {
            let isBotPresent = participants.some(p => areJidsSameUser(botJid, p.id))

            if (isBotPresent) {
                setTimeout(async () => {
                    await conn.reply(m.chat, `《✧》The main bot is in this group, so I will leave to avoid spam.`, m)
                    await this.groupLeave(m.chat)
                }, 5000)// 5 seconds
            }
        }
    }
}
