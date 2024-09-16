import fs from 'fs';
import path from 'path';
import config from '../config.cjs';

const modeCommand = async (m, Fox) => {
    const botNumber = await Fox.decodeJid(Fox.user.id);
    const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
    const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const text = m.body.slice(prefix.length + cmd.length).trim().toLowerCase();

    if (cmd === 'mode') {
        if (!isCreator) {
            await Fox.sendMessage(m.from, { text: "*📛 THIS IS AN OWNER COMMAND*" }, { quoted: m });
            return;
        }

        if (['public', 'private'].includes(text)) {
            if (text === 'public') {
                Fox.public = true;
                m.reply('Mode has been changed to public.');
            } else if (text === 'private') {
                Fox.public = false;
                m.reply('Mode has been changed to private.');
            } else {
                m.reply("Usage:\n.Mode public/private");
            }
        } else {
            m.reply("Invalid mode. Please use 'public' or 'private'.");
        }
    }
};

export default modeCommand;
