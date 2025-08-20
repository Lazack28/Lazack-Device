let handler = async (m, { conn, text }) => {
  let id = m.chat
  conn.math = conn.math ? conn.math : {}
  
  // If this chat already has a pending math operation, remove it
  if (id in conn.math) {
    clearTimeout(conn.math[id][3])
    delete conn.math[id]
    m.reply('.... ')
  }

  // Clean and format the input equation
  let val = text
    .replace(/[^0-9\-\/+*×÷πEe()piPI/]/g, '') // Only allow numbers and math symbols
    .replace(/×/g, '*')                       // Replace × with *
    .replace(/÷/g, '/')                       // Replace ÷ with /
    .replace(/π|pi/gi, 'Math.PI')             // Replace π or pi with Math.PI
    .replace(/e/gi, 'Math.E')                 // Replace e with Math.E
    .replace(/\/+/g, '/')                     // Remove multiple slashes
    .replace(/\++/g, '+')                     // Remove multiple plus signs
    .replace(/-+/g, '-')                      // Remove multiple minus signs

  // Create a more user-friendly formatted version of the equation
  let format = val
    .replace(/Math\.PI/g, 'π')
    .replace(/Math\.E/g, 'e')
    .replace(/\//g, '÷')
    .replace(/\*×/g, '×')

  try {
    console.log(val)
    // Evaluate the equation safely
    let result = (new Function('return ' + val))()
    if (!result) throw result

    // Reply with formatted equation and result
    m.reply(`*${format}* = _${result}_`)
  } catch (e) {
    // If no equation entered
    if (e == undefined) return m.reply(`${emoji} Enter the equation.\nCompatible symbols: -, +, *, /, ×, ÷, π, e, (, )`)
    
    // If the format is incorrect
    return m.reply(`${emoji2} Incorrect format, only numbers (0-9) and symbols -, +, *, /, ×, ÷, π, e, (, ) can be used`)
  }
}

// Help text (commands user can use)
handler.help = ['cal *<equation>*']
handler.tags = ['tools']
handler.command = ['cal', 'calc', 'calculate', 'calculator']
handler.exp = 5
handler.register = true

export default handler
