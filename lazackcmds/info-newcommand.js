let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `√${emoji} What command do you want to suggest?`, m)
    if (text.length < 10) return conn.reply(m.chat, `${emoji2} The suggestion must be more than 10 characters.`, m)
    if (text.length > 1000) return conn.reply(m.chat, `${emoji2} The maximum suggestion length is 1000 characters.`, m)
    const teks = `${emoji} New command suggestion from user *${nombre}*

☁️ Suggested Command:
> ${text}`
    await conn.reply(`${suittag}@s.whatsapp.net`, m.quoted ? teks + m.quoted.text : teks, m, { mentions: conn.parseMention(teks) })

    m.reply('🍬 The suggestion was sent to my owner.')
}
handler.help = ['newcommand']
handler.tags = ['info']
handler.command = ['newcommand', 'sug']

export default handler