"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
zokou({ nomCom: "telg", reaction: "✍️", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = '*LAZACK-MD* Telegram channel \n\n ' + "Click the links below to join telegram channel of Lazack-md support \n\n";
    let d = ' 📡 https://t.me/hackersreality';
    let varmess = z + d;
    var img = 'https://telegra.ph/file/4415fe12b1203e4caeecf.jpg';
    await zk.sendMessage(dest, { image: { url: img }, caption: varmess });
    //console.log("montest")
});
