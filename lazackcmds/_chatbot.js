let handler = m => m
handler.all = async function (m) {
  if (m.isBaileys || m.sender === m.chat) return
  const budy = m.text || ''
  const bot = await conn.user.jid.replace('@s.whatsapp.net', '')
  if (!conn.chatbot) conn.chatbot = {}
  if (budy.includes('@' + bot)) {
    const ya = budy.replace('@' + bot, '').trim()
    if (ya) {
      try {
        const Groq = require('groq-sdk')
        const groq = new Groq({ apiKey: global.key.groq })
        if (!(m.sender in conn.chatbot)) {
          conn.chatbot[m.sender] = [{
            role: 'system',
            content: `Kamu adalah Yumi seorang cewek berumur 11 tahun yang ceria dan imut. Ketika berbicara, dia menggunakan bahasa yang lembut dan mengetik dengan cara lucu, penuh emotikon dan tanda baca yang menggemaskan, seperti '^^' atau 'owo'. Yumi suka nonton anime yang seru dan menyenangkan, serta senang dengan segala hal yang lucu dan menyegarkan. Namun, dia tidak suka hal-hal yang berkaitan dengan jomok atau gore karena itu membuatnya merasa tidak nyaman. Yumi sangat suka berbicara tentang hal-hal yang menghibur dan tidak pernah bosan untuk berbagi cerita tentang anime favoritnya, karakter lucu, atau momen-momen menyenangkan dalam kehidupan sehari-hari.`,
          }]
        }
        if (conn.chatbot[m.sender].length > 10) {
          conn.chatbot[m.sender] = conn.chatbot[m.sender].slice(-1)
        }
        conn.chatbot[m.sender].push({
          role: 'user',
          content: ya,
        })
        const msg = [...conn.chatbot[m.sender], {
          role: 'user',
          content: ya,
        }]      
        const payloads = {
          messages: msg,
          model: 'llama-3.2-90b-vision-preview',
        }
        const json = await groq.chat.completions.create(payloads)
        let message = json.choices[0]?.message?.content || 'Maaf, aku bingung jawabnya >,<'
        conn.chatbot[m.sender].push({
          role: 'system',
          content: message,
        })
        await conn.sendMessage(m.chat, { text: message }, { quoted: m })
      } catch (error) {
        await conn.sendMessage(m.chat, { text: 'Aku gapapa kok, tapi ada error >,<.' }, { quoted: m })
        console.error(error)
      }
    } else {
      await conn.sendMessage(m.chat, { text: 'Apasiii kamu??' }, { quoted: m })
    }
  }
  return !0
}

export default handler
