// Alex-X >> https://github.com/OfcKing

import fs from 'fs'
import path from 'path'

var handler = async (m, { usedPrefix, command }) => {
    try {
        await m.react('🕒') 
        conn.sendPresenceUpdate('composing', m.chat)

        const pluginsDir = './plugins'

        // Get all .js files inside plugins folder
        const files = fs.readdirSync(pluginsDir).filter(file => file.endsWith('.js'))

        let response = `✧ *Syntax Error Review:*\n\n`
        let hasErrors = false

        for (const file of files) {
            try {
                // Try importing the plugin file to check for syntax errors
                await import(path.resolve(pluginsDir, file))
            } catch (error) {
                hasErrors = true
                const stackLines = error.stack.split('\n')

                // Try to detect which line has the error
                const errorLineMatch = stackLines[0].match(/:(\d+):\d+/) 
                const errorLine = errorLineMatch ? errorLineMatch[1] : 'Unknown'

                response += `⚠︎ *Error in:* ${file}\n\n> ● Message: ${error.message}\n> ● Line number: ${errorLine}\n\n`
            }
        }

        if (!hasErrors) {
            response += '❀ Everything is fine! No syntax errors were detected.'
        }

        await conn.reply(m.chat, response, m)
        await m.react('✅')
    } catch (err) {
        await m.react('✖️') 
        await conn.reply(m.chat, `⚠︎ An error occurred: ${err.message}`, m)
    }
}

// Command settings
handler.command = ['detectsyntax', 'detect']
handler.help = ['detectsyntax']
handler.tags = ['tools']
handler.rowner = true   // Only bot owner can use this

export default handler
