import { execSync } from 'child_process'

var handler = async (m, { conn, text }) => {

  try {
    // Run "git pull" command (with additional arguments if from owner)
    const stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : ''));
    let messager = stdout.toString()

    // Translate messages from Spanish to English
    if (messager.includes('🕸 Ya estoy actualizada.')) messager = '🕸 I am already updated to the latest version.'
    if (messager.includes('🕸 Actualizando.')) messager = '🕸 Updating, please wait a moment while I update.\n\n' + stdout.toString()

    conn.reply(m.chat, messager, m)

  } catch { 
    try {
      // Check if there are any local file changes that prevent pulling
      const status = execSync('git status --porcelain')

      if (status.length > 0) {
        const conflictedFiles = status.toString().split('\n').filter(line => line.trim() !== '').map(line => {
          if (line.includes('.npm/') || line.includes('.cache/') || line.includes('tmp/') || line.includes('datos.json') || line.includes('database.json') || line.includes('sessions/') || line.includes('npm-debug.log')) {
            return null
          }
          return '*→ ' + line.slice(3) + '*'
        }).filter(Boolean)

        if (conflictedFiles.length > 0) {
          const errorMessage = `🕸 Cannot update.`
          await conn.reply(m.chat, errorMessage, m)
        }
      }
    } catch (error) {
      console.error(error)
      let errorMessage2 = '🐼 An unexpected error occurred.'
      if (error.message) {
        errorMessage2 += '\n🐼 Error message: ' + error.message;
      }
      await conn.reply(m.chat, errorMessage2, m)
    }
  }

}

handler.command = ['update', 'actualizar']
handler.owner = true

export default handler
