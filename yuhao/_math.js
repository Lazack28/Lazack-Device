let handler = m => m
handler.before = async function (m) {
  if (!/^-?[0-9]+(\.[0-9]+)?$/.test(m.text)) return !0
  let id = m.chat
  // if (!m.quoted || m.quoted.sender != this.user.jid || !/^Berapa hasil dari/i.test(m.quoted.text)) return !0
  this.math = this.math ? this.math : {}
  try {
    if (!(id in this.math) && /^apa hasil dari/i.test(m.quoted.text)) return m.reply('soal itu sudah berakhir')
    // if (m.quoted.id == this.math[id][0].id) {
    let math = JSON.parse(JSON.stringify(this.math[id][1]))
    if (m.text == math.result) {
      db.data.users[m.sender].exp += math.bonus
      clearTimeout(this.math[id][3])
      delete this.math[id]
      await this.sendButton(m.chat, data.bener + ` +${math.bonus} XP`, wm, `lagi`, `.math ${math.mode}`, m)
    } else {
      if (--this.math[id][2] == 0) {
        clearTimeout(this.math[id][3])
        delete this.math[id]
        m.reply(`*kesempatan habis!*\njawabannya *${math.result}*`)
      } else m.reply(`*jawaban salah!*\nmasih ada ${this.math[id][2]} kesempatan`)
    }
    // }
    return !0
  } catch (e) {
    return
  }
}

module.exports = handler
