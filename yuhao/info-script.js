let handler = async (m, { conn }) => {

 let txt = `
Bot ini menggunakan script dari github

https://github.com/Nayla-Hanifah/Yuhao

jangan lupa kasih bintang dan fork
`
     conn.reply(m.chat, txt, m)
}
handler.help = ['sourcecode', 'script']
handler.tags = ['info']
handler.command = /^(sc|sourcecode|script)$/i

module.exports = handler


