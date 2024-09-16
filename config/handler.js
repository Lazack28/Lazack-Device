import { serialize, decodeJid } from '../lib/Serializer.js';
import path from 'path';
import fs from 'fs/promises';
import config from '../config.cjs';
import { smsg } from '../lib/myfunc.cjs';
import { handleAntilink } from './antilink.js';


const userCommandCounts = new Map();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const getMessage = async (key, store) => {
    if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id);
        return msg.message || undefined;
    }
    return {
        conversation: "Hai Im sock botwa"
    };
};

// Function to get group admins
export const getGroupAdmins = (participants) => {
    let admins = [];
    for (let i of participants) {
        if (i.admin === "superadmin" || i.admin === "admin") {
            admins.push(i.id);
        }
    }
    return admins || [];
};

const Handler = async (chatUpdate, sock, logger, store) => {
    try {
        if (chatUpdate.type !== 'notify') return;

        const m = serialize(JSON.parse(JSON.stringify(chatUpdate.messages[0])), sock, logger);
        if (!m.message) return;

        const participants = m.isGroup ? await sock.groupMetadata(m.from).then(metadata => metadata.participants) : [];
        const groupAdmins = m.isGroup ? getGroupAdmins(participants) : [];
        const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net';
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botId) : false;
        const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;


        const PREFIX = /^[\\/!#.]/;
        const isCOMMAND = (body) => PREFIX.test(body);
        const prefixMatch = isCOMMAND(m.body) ? m.body.match(PREFIX) : null;
        const prefix = prefixMatch ? prefixMatch[0] : '/';
        const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
        const text = m.body.slice(prefix.length + cmd.length).trim();

        if (m.key && m.key.remoteJid === 'status@broadcast' && config.AUTO_STATUS_SEEN) {
            await sock.readMessages([m.key]);
        }

        const botNumber = await sock.decodeJid(sock.user.id);
        const ownerNumber = config.OWNER_NUMBER + '@s.whatsapp.net';
        let isCreator = false;

        if (m.isGroup) {
            isCreator = m.sender === ownerNumber || m.sender === botNumber;
        } else {
            isCreator = m.sender === ownerNumber || m.sender === botNumber;
        }

        if (!sock.public) {
            if (!isCreator) {
                return;
            }
        }

await handleAntilink(m, sock, logger, isBotAdmins, isAdmins, isCreator); 

        const { isGroup, type, sender, from, body } = m;
        console.log(m);

        const pluginFiles = await fs.readdir(path.join(__dirname, '..', '..', 'plugin'));

        for (const file of pluginFiles) {
            if (file.endsWith('.js')) {
                const pluginModule = await import(path.join(__dirname, '..', '..', 'plugin', file));
                const loadPlugins = pluginModule.default;
                await loadPlugins(m, sock);
            }
        }
    } catch (e) {
        console.log(e);
    }
};

export default Handler;
