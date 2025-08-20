import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync, promises as fsPromises } from "fs";
const fs = { ...fsPromises, existsSync };
import path, { join } from 'path';
import ws from 'ws';

let handler = async (m, { conn: _envio, command, usedPrefix, args, text, isOwner }) => {
    const isDeleteSession = /^(deletesesion|deletebot|deletesession|deletesesaion)$/i.test(command);
    const isStopBot = /^(stop|pausarai|pausarbot)$/i.test(command);
    const isListBots = /^(bots|sockets|socket)$/i.test(command);

    async function reportError(e) {
        await m.reply(`⚠️ An error occurred.`);
        console.error('Command Error:', e);
    }

    try {
        if (isDeleteSession) {
            let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
            let uniqid = `${who.split`@`[0]}`;
            const sessionPath = `./${jadi}/${uniqid}`;

            if (!fs.existsSync(sessionPath)) {
                await conn.sendMessage(m.chat, { 
                    text: `🔍 You don't have an active session. You can create one using:\n${usedPrefix}jadibot\n\nIf you have a session ID, you can use:\n${usedPrefix}${command} \`\`\`(ID)\`\`\`` 
                }, { quoted: m });
                return;
            }

            if (global.conn.user.jid !== conn.user.jid) {
                return conn.sendMessage(m.chat, {
                    text: `⚠️ Please use this command on the main bot.\n\nhttps://api.whatsapp.com/send/?phone=${global.conn.user.jid.split`@`[0]}&text=${usedPrefix + command}&type=phone_number&app_absent=0`
                }, { quoted: m });
            }

            await conn.sendMessage(m.chat, { text: `🔒 Your Sub-Bot session has been terminated` }, { quoted: m });
            
            try {
                await fs.rmdir(sessionPath, { recursive: true, force: true });
                await conn.sendMessage(m.chat, { text: `✅ All session data has been deleted` }, { quoted: m });
            } catch (e) {
                reportError(e);
            }
        }
        else if (isStopBot) {
            if (global.conn.user.jid == conn.user.jid) {
                await conn.reply(m.chat, `ℹ️ This is the main bot. To become a Sub-Bot, contact the main bot number.`, m);
            } else {
                await conn.reply(m.chat, `🛑 ${botname} has been paused.`, m);
                conn.ws.close();
            }
        }
        else if (isListBots) {
            const activeBots = [...new Set([...global.conns.filter(conn => 
                conn.user && 
                conn.ws.socket && 
                conn.ws.socket.readyState !== ws.CLOSED
            )])];

            function formatUptime(ms) {
                const seconds = Math.floor(ms / 1000);
                const minutes = Math.floor(seconds / 60);
                const hours = Math.floor(minutes / 60);
                const days = Math.floor(hours / 24);
                
                return [
                    days > 0 ? `${days}d` : '',
                    hours % 24 > 0 ? `${hours % 24}h` : '',
                    minutes % 60 > 0 ? `${minutes % 60}m` : '',
                    seconds % 60 > 0 ? `${seconds % 60}s` : ''
                ].filter(Boolean).join(' ') || 'Unknown';
            }

            const botList = activeBots.map((bot, index) => 
                `• [${index + 1}]\n📱 wa.me/${bot.user.jid.replace(/[^0-9]/g, '')}\n👤 User: ${bot.user.name || 'Sub-Bot'}\n⏱️ Uptime: ${bot.uptime ? formatUptime(Date.now() - bot.uptime) : 'Unknown'}`
            ).join('\n\n──────────────\n\n');

            const responseMessage = `🤖 ACTIVE SUB-BOTS LIST\n\n` +
                `ℹ️ You can request permission to add these bots to your group\n\n` +
                `\`\`\`Each Sub-Bot operates independently. The main bot is not responsible for their usage.\`\`\`\n\n` +
                `🔢 Total Connected: ${activeBots.length || '0'}\n\n` +
                `${botList.length ? botList : 'No active Sub-Bots available at this time'}`;

            await _envio.sendMessage(m.chat, {
                text: responseMessage, 
                mentions: _envio.parseMention(responseMessage)
            }, { quoted: m });
        }
    } catch (error) {
        reportError(error);
    }
};

handler.tags = ['serbot', 'management'];
handler.help = [
    'deletesession - Terminate your Sub-Bot session',
    'stop - Pause your Sub-Bot connection',
    'bots - List active Sub-Bots'
];
handler.command = [
    'deletesesion', 'deletebot'
];

export default handler;