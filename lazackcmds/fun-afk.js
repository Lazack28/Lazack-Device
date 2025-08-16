const handler = async (m, {text}) => {
    const user = global.db.data.users[m.sender];
    user.afk = + new Date;
    user.afkReason = text;
    conn.reply(m.chat, `${emoji} *User ${conn.getName(m.sender)} is now AFK*\n\n*Reason: ${text ? ': ' + text : 'Not specified!'}*
`, m);
};
handler.help = ['afk [reason]'];
handler.tags = ['main'];
handler.command = ['afk'];
handler.group = true;
handler.register = true;

export default handler;