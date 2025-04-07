
let linkRegex = /\b((https?:\/\/|www\.)?[\w-]+\.[\w-]+(?:\.[\w-]+)*(\/[\w\.\-\/]*)?)\b/i
export async function before(m, {isAdmin, isBotAdmin, text}) {
    if (m.isBaileys && m.fromMe) {
        return true;
    }
    if (!m.isGroup) return false;
    const chat = global.db.data.chats[m.chat];
    const delet = m.key.participant;
    const bang = m.key.id;
    const bot = global.db.data.settings[this.user.jid] || {};
    const user = `@${m.sender.split`@`[0]}`;
    const isGroupLink = linkRegex.exec(m.text);
    if (chat.antiLink2 && isGroupLink && !isAdmin) {
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
            const linkThisGroup2 = `https://www.youtube.com/`;
            const linkThisGroup3 = `https://youtu.be/`;
            if (m.text.includes(linkThisGroup)) return true;
            if (m.text.includes(linkThisGroup2)) return true;
            if (m.text.includes(linkThisGroup3)) return true;
        }
        await this.sendMessage(m.chat, {text: `*「 ANTI LINKS 」*\nYou never learn 🙄 ${user}, you broke the group rules, you will be expelled...!!`, mentions: [m.sender]}, {quoted: m});
        if (!isBotAdmin) return m.reply('[🚫] I am not an admin! Therefore, I cannot execute the action of expelling.');
        if (isBotAdmin && bot.restrict) {
            await conn.sendMessage(m.chat, {delete: {remoteJid: m.chat, fromMe: false, id: bang, participant: delet}});
            const responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            if (responseb[0].status === '404') return;
        } else if (!bot.restrict) return m.reply('[🚫] The owner does not have the restrict option enabled, I cannot execute the action.');
    }
    return true;
}
