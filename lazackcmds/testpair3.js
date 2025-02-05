let handler = async (m, { conn, command, usedPrefix }) => {
    let resp;
    try {
        if (global.conns.some(c => c.user.jid === conn.user.jid)) {
            if (/stop/i.test(command)) {
                let i = global.conns.indexOf(conn);
                if (global.conn.user.jid != conn.user.jid && m.sender != global.conn.user.jid) {
                    if (i < 0) return;
                    resp = `${gt} Paused. If you want to resume, use the command *${usedPrefix}serbot* or your token.`;
                    await conn.sendMessage(m.chat, { text: resp }, { quoted: m });
                    conn.ev.removeAllListeners();
                    conn.ws.close();
                    conn.isInit = false;
                    global.conns.splice(i, 1);
                    return;
                }
            }
        } else {
            resp = '*This command can only be executed by a user who is a Sub-Bot*.';
            return conn.sendMessage(m.chat, { text: resp }, { quoted: m });
        }
    } catch (e) {
        resp = '*There was an error trying to turn off the Sub-Bot.*';
        console.log('Error trying to turn off the Sub-Bot: ', e);
        return conn.sendMessage(m.chat, { text: resp }, { quoted: m });
    }
};

handler.command = /^(berhenti|stop|detener)$/i;
handler.private = true;
export default handler;