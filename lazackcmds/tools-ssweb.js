import fetch from 'node-fetch'

let handler = async (m, { conn, command, args }) => {
    // Check if user provided a URL
    if (!args[0]) 
        return conn.reply(m.chat, `${emoji} Please provide a webpage link.`, m)

    try {
        // React with a waiting emoji
        await m.react(rwait)

        // Notify the user that the bot is fetching the webpage
        conn.reply(m.chat, `${emoji2} Fetching the webpage information...`, m)

        // Fetch full-page screenshot using thum.io
        let screenshot = await (await fetch(`https://image.thum.io/get/fullpage/${args[0]}`)).buffer()

        // Send the screenshot as a file
        conn.sendFile(m.chat, screenshot, 'screenshot.png', args[0], m)

        // React with done emoji
        await m.react(done)

    } catch {
        // Error handling
        return conn.reply(m.chat, `${msm} An error occurred.`, m)
        await m.react(error)
    }
}

handler.help = ['ssweb <url>', 'ss <url>']
handler.tags = ['tools']
handler.command = ['ssweb', 'ss']

export default handler
