var fs = require('fs')
let handler = async (m, { conn, args, command }) => {
let fitur = Object.values(yuhao).filter(v => v.help && !v.disabled).map(v => v.help).flat(1)
let totalf = Object.values(global.yuhao).filter(
    (v) => v.help && v.tags
  ).length;
let cap = `Total Fitur Bot Saat Ini: \n▢ *Plugins :* ±${totalf} Plugins Files\n▢ *Fitur :* ±${fitur.length} Menu`  
conn.reply(m.chat, cap, m)
}  
handler.help = ['totalfitur']
handler.tags = ['info']
handler.command = ['totalfitur']
module.exports = handler