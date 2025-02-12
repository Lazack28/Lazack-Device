import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
    if (!text) {
        await conn.reply(m.chat, '*\`Please enter the name of the APK you want to search for. 🤍\`*', m, rcanal);
    }
    await m.react('🕓');
    try {
        const fallbackUrl = `https://delirius-apiofc.vercel.app/download/apk?query=${text}`;
        const response = await fetch(fallbackUrl);
        const data = await response.json();

        const apkData = data.data;
        let message = `
📲 *APK Information* 📲
📌 *Name:* ${apkData.name}
🧑‍💻 *Developer:* ${apkData.developer || 'N/A'}
📦 *Package:* ${apkData.id}
🕒 *Last update:* ${apkData.publish}
📥 *Size:* ${apkData.size}
⭐ *Rating:* ${apkData.stats.rating.average || 'N/A'} (Total: ${apkData.stats.rating.total || 0})
📈 *Downloads:* ${apkData.stats.downloads || 0}`;

        await conn.sendFile(m.chat, apkData.image, 'thumbnail.jpg', message, m, rcanal, fake);

        if (apkData.size.includes('GB') || parseFloat(apkData.size.replace(' MB', '')) > 999) {
            return await conn.sendMessage(m.chat, { text: '*[ ⛔ ] The file is too large and will not be sent.*' }, { quoted: m });
        }

        await conn.sendMessage(m.chat, {
            document: { url: apkData.download },
            mimetype: 'application/vnd.android.package-archive',
            fileName: `${apkData.name}.apk`,
            caption: null
        }, { quoted: m });
        await m.react('✅');
    } catch (error) {
        console.error(error);
        await m.react('✖️');
    }
};

handler.help = ['apk *<name>*'];
handler.tags = ['dl'];
handler.command = /^(apk|modapk|dapk2|aptoide|aptoidedl)$/i;
handler.register = true;
handler.Monedas = 1;
export default handler;