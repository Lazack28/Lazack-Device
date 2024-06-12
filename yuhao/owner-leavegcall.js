let handler = async (m, { conn, usedPrefix, text, command, args, isOwner, isAdmin, isROwner }) => {
	let chat = Object.keys(conn.chats).filter(v => v.endsWith('g.us'))
    if (command.endsWith('all') || command.endsWith('semua')) {
        for (let id of chat) { // perulangan
            await conn.groupLeave(id)
            await delay(2000) // jeda 2 detik
        }
        await m.reply('Berhasil!')
    }
	let groups = Object.keys(conn.chats)
  .filter(key => key.endsWith('@g.us'))
  .map(key => conn.chats[key]);
    let listSections = []
	Object.keys(groups).map((i, index) => {
	listSections.push([++index + ' ' + groups[i].subject, [
          ['LEAVE NOW', usedPrefix + command + ' gw ' + [i], '']
        ]])
	})
	
  let type = (args[0] || '').toLowerCase()
  try {
  switch (type) {
      case 'gw':
      let i = args[1]
      let ppgc = await conn.profilePictureUrl(groups[i].id, 'image')
      let str = `${[i]}
~*Name :* ${groups[i].subject}~
~*Owner :* ${groups[i].owner ? "@" + groups[i].owner.split("@")[0] : "Unknown"}~
~*Subject Owner :* ${groups[i].subjectOwner ? "@" + groups[i].subjectOwner.split("@")[0] : "Unknown"}~
~*ID :* ${groups[i].id}~
~*Restrict :* ${groups[i].restrict}~
~*Announce :* ${groups[i].announce}~
~*Ephemeral :* ${new Date(groups[i].ephemeralDuration* 1000).toDateString()}~
~*Desc ID :* ${groups[i].descId}~
~*Description :* ${groups[i].desc?.toString().slice(0, 10) + '...' || 'unknown'}~
~*Admins :* ${groups[i].participants.filter(p => p.admin).map((v, i) => `\n${i + 1}. @${v.id.split('@')[0]}`).join(' [admin]')}~
~${isOwner ? `*Participants :* ${groups[i].participants.length}` : ''}~
~${isOwner ? `*isBotAdmin :* [ ${!!groups[i].participants.find(v => v.id == conn.user.jid).admin} ]` : ''}~
~*Created :* ${new Date(groups[i].subjectTime* 1000).toDateString()}~
~*Creation :* ${new Date(groups[i].creation* 1000).toDateString()}~
~*Size :* ${groups[i].size}~`
      
      await conn.sendFile(m.chat, ppgc ? ppgc : logo, '', str, m)
      await conn.groupLeave(groups[i].id)
        await delay(2000) // jeda 2 detik
        await m.reply('Succes Leave ' + groups[i].subject + ' !')
       break
       
    default:
      if (!/[01]/.test(command)) return conn.sendList(m.chat, ' 📺 Group List 🔎 ', `⚡ Silakan pilih Group List di tombol di bawah...\n*Teks yang anda kirim:* ${text ? text : 'Kosong'}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, `☂️ Group List Disini ☂️`, listSections, m)
      throw false
  }
  } catch {
  throw 'Grup Tidak Ditemukan Atau Bot Sudah Out!'
  }
}
handler.help = ['gc', 'gcall', 'group'].map(v => 'leave' + v)
handler.tags = ['owner']
handler.command = /^leaveg(c|ro?up)(all|semua)?$/i
handler.rowner = true
module.exports = handler
const delay = time => new Promise(res => setTimeout(res, time))