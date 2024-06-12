let handler = async (m, { usedPrefix, command, conn, text }) => {
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let kon = `*Database saat ini ${totalreg} user*\n*Registrasi saat ini ${rtotalreg} user*`
    conn.reply(m.chat, kon, m, {
        contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
     	showAdAttribution: true,
          title: "Database " + namebot,
          body: "",
          thumbnailUrl: fla  + "Database",
          sourceUrl: null,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });
}
handler.help = ['user']
handler.tags = ['info']
handler.command = /^(pengguna|(jumlah)?database|user)$/i

module.exports = handler
