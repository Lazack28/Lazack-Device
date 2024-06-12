let fetch = require('node-fetch');
let { chatGpt } = require('../nayla/chatgpt')

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
    if (!text) return m.reply("Masukan pertanyaan. Yang ini di tanyakan")
    await m.react("🕒");
    try {
        const result = await chatGpt(text);
        await m.reply(result);
        m.react("✅");
    } catch (error) {
        await m.react(" ❌");
    }

}
handler.help =  ['gpt', 'ai', 'openai'];
handler.tags = ["ai"];
handler.command = /^(gpt|ai|openai)$/i
handler.limit = true;
module.exports = handler;
