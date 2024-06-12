let handler = async (m, { conn, args }) => {
  let users = Object.entries(global.db.data.users).filter(user => user[1].premium).map(([key, value]) => {
    return { ...value, jid: key }
  })
  let sortedP = users.map(toNumber('premiumTime')).sort(sort('premiumTime'))
  let len = args[0] && args[0].length > 0 ? Math.min(100, Math.max(parseInt(args[0]), 10)) : Math.min(10, sortedP.length)
  let cp = `*List Premium*
${sortedP.slice(0, len).map(({ jid, name, premiumTime, registered }, i) => `• ${i + 1}. ( ${conn.msToDate(premiumTime - new Date() * 1)} ) ${registered ? name : conn.getName(jid)} @${jid.split('@')[0]}`).join`\n`}`
  let { key } = await conn.reply(m.chat, cp, m, { contextInfo: { mentionedJid: conn.parseMention(cp) }})
 setTimeout(() => {
conn.sendMessage(m.chat, { delete: key })
}, 120000) 
}
handler.help = ['premlist [angka]']
handler.tags = ['info']
handler.command = /^(listprem|premlist)$/i

module.exports = handler

function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
  else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
    return { ...b[i], [property]: a[property] === undefined ? _default : a[property] }
  }
  else return a => a === undefined ? _default : a
}