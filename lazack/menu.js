const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
╭❛ ━━━━━━･ 𝙇𝘼𝙕𝘼𝘾𝙆-𝙈𝘿 ･━━━━━━ ❜
𖦠   *Prefix* : ${s.PREFIXE}
𖦠   *Owner* : ${s.OWNER_NAME}
𖦠   *Mode* : ${mode}
𖦠   *Commands* : ${cm.length}
𖦠   *year* : ©2024
𖦠   *country* : TANZANIA 🇹🇿
𖦠   *Memories* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
𖦠   *Plateform* : ${os.platform()}
𖦠   *Developer* : 𝐋𝐀𝐙𝐀𝐂𝐊
𖦠   *GIVE A STAR TO LAZACK-MD*
╰❢◥ ▬▬▬▬▬▬ ◆ ▬▬▬▬▬▬ ◤❢\n\n`;
    
let menuMsg = `
╭➴➵➶➴➵➶➴➵➶➴➵➶➴➵➶ 
|    🤟 Hello ${nomAuteurMessage} 
|    ＳＨＡＲＥ ＴＨＩＳ ＢＯＴ ＢＲＯ
|               *List of commands :*
|    the following are all 𝙇𝘼𝙕𝘼𝘾𝙆-𝙈𝘿 commands
╰➴➵➶➴➵➶➴➵➶➴➵➶➴➵➶ 
`;

    for (const cat in coms) {
        menuMsg += `╭┉┉┉┉┉ᖫ 𖥟 ${cmd} ᖭ┉┉┉┉•`;
        for (const cmd of coms[cat]) {
            menuMsg += `
╿ ༆ ${cmd}`;
        }
        menuMsg += `
﹄╼╾╼╾╼╾╼╾╼╾╼╾╼╾╼╾ \n`
    }

    menuMsg += `
➶➶➶➶➶ 𝒍𝒂𝒛𝒂𝒄𝒌𝟐𝟖 ➷➷➷➷➷           
*╞═════𖠁𐂃𖠁═════╡*
𓊈⇶  "❤ ＴＯ ＨＥＬＰ"
𓊈⇶         *𝕃𝔸ℤ𝔸ℂ𝕂-𝕄𝔻*
𓊈⇶  Believe in you bro you can                                          
*╞═════𖠁𐂃𖠁═════╡*
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
