import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `Enter some text to talk with Llama AI.`, m)
    try {
        let api = await fetch(`https://delirius-apiofc.vercel.app/ia/llamaia?query=${text}`)
        let json = await api.json()
        let responseMessage = json.data;

        await conn.sendMessage(m.chat, {
            text: responseMessage
        }, { quoted: m });

    } catch (error) { 
        console.error(error)
    }
}

handler.command = ['llama', 'meta']

export default handler