let handler = m => m
handler.before = async function (m) {
    if (m.isGroup && global.db.data.chats[m.chat].expired != 0) {
        if (new Date() * 1 >= global.db.data.chats[m.chat].expired) {
            this.reply(m.chat, `waktunya *${this.user.name}* untuk meninggalkan grup, mau bot ini stay di grup kamu? sewa ke nomor https://wa.me/${numberowner}`, null).then(() => {
                    this.groupLeave(m.chat).then(() => {
                        global.db.data.chats[m.chat].expired = 0
                })
            })
        }
    }
}

module.exports = handler