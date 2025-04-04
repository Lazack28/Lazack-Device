import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'

let handler = async (m, { conn, text }) => {
  if (!text && !m.quoted?.text) {
    return conn.reply(m.chat, '💡 Please provide some text to make fancy! Usage: *fancy <your text here>*', m)
  }

  // Get the text from the message or the quoted message
  let inputText = text || m.quoted?.text || m.text
  
  try {
    // Fetch the stylized/fancy text
    let fancyTexts = await fancyText(inputText)
    
    // Format the output in a user-friendly way
    let formattedResponse = Object.entries(fancyTexts)
      .map(([name, value]) => `✨ *${name}*:\n${value}\n`)
      .join('\n')
    
    // Send the response with the formatted fancy style options
    conn.reply(m.chat, `Here are your fancy styles for *"${inputText}"*:\n\n${formattedResponse}`, m)
  } catch (error) {
    console.error('Error fetching fancy text:', error)
    conn.reply(m.chat, '❌ Sorry, there was an error while fetching the styles. Please try again later.', m)
  }
}

handler.help = ['style', 'fancy'].map(v => v + ' *<text>*')
handler.tags = ['tools']
handler.command = /^(style(text)?|fancy)$/i

export default handler

// Function to fetch fancy text styles from the web
async function fancyText(text) {
  let res = await fetch('http://qaz.wtf/u/convert.cgi?text=' + encodeURIComponent(text))
  let html = await res.text()
  let dom = new JSDOM(html)
  let table = dom.window.document.querySelector('table').children[0].children
  let obj = {}

  for (let tr of table) {
    let name = tr.querySelector('.aname').innerHTML
    let content = tr.children[1].textContent.replace(/^\n/, '').replace(/\n$/, '')
    obj[name + (obj[name] ? ' Reversed' : '')] = content
  }

  return obj
}
