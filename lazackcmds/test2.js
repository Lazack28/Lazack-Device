let handler = async (m, { conn, args, usedPrefix, command }) => {
    let txt = `mircus is my best girl`
    conn.sendMessage(m.chat, { text: txt, caption: "1234", footer: "MIRCUS", buttons: [
      {
        buttonId: ".menu", 
        buttonText: { 
          displayText: 'test' 
        }
      }, {
        buttonId: ".s", 
        buttonText: {
          displayText: "Hola"
        }
      }
    ],
      viewOnce: true,
      headerType: 1,
    }, { quoted: m })
    }
    handler.command = ['tes']
    export default handler