import fs from 'fs';
import syntaxError from 'syntax-error';
import path from 'path';
import util from 'util';

const _fs = fs.promises;

let handler = async (m, { text, usedPrefix, command, __dirname }) => {
    if (!text) throw `⚠️ *Usage:* ${usedPrefix}${command} <file_name>\n\n📌 *Example:*\n${usedPrefix}savefile LazackFlow.js\n${usedPrefix}saveplugin owner`;

    if (!m.quoted) throw `⚠️ *Please reply to a media/text message to save it.*`;

    if (/p(lugin)?/i.test(command)) {
        let filename = text.replace(/plugin(s)\//i, '') + (/\.js$/i.test(text) ? '' : '.js');
        const error = syntaxError(m.quoted.text, filename, {
            sourceType: 'module',
            allowReturnOutsideFunction: true,
            allowAwaitOutsideFunction: true
        });

        if (error) throw `🚨 *Syntax Error in File:* ${filename}\n\n📌 *Error Details:*\n${error}`;

        const pathFile = path.join(__dirname, filename);

        if (fs.existsSync(pathFile)) throw `⚠️ *File "${filename}" already exists!*\n\n📌 Rename the file or modify the existing one.`;

        await _fs.writeFile(pathFile, m.quoted.text);
        m.reply(`✅ *File saved successfully as "${filename}"*.\n\n\`\`\`${util.format(m.quoted.text)}\`\`\``);
    } else {
        const isJavascript = m.quoted.text && !m.quoted.mediaMessage && /\.js/.test(text);
        
        if (isJavascript) {
            const error = syntaxError(m.quoted.text, text, {
                sourceType: 'module',
                allowReturnOutsideFunction: true,
                allowAwaitOutsideFunction: true
            });

            if (error) throw `🚨 *Syntax Error in File:* ${text}\n\n📌 *Error Details:*\n${error}`;

            await _fs.writeFile(text, m.quoted.text);
            m.reply(`✅ *File saved successfully as "${text}"*.\n\n\`\`\`${util.format(m.quoted.text)}\`\`\``);
        } else if (m.quoted.mediaMessage) {
            const media = await m.quoted.download();
            await _fs.writeFile(text, media);
            m.reply(`✅ *Media saved successfully as "${text}".*`);
        } else {
            throw `❌ *Unsupported file format!*`;
        }
    }
};

handler.help = ['plugin', 'file'].map(v => `save${v} <file_name>`);
handler.tags = ['owner'];
handler.command = /^(save|s)(p(lugin)?|(f(ile)?))$/i;
handler.rowner = true;

export default handler;
