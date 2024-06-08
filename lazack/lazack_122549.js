//LAZACK MD BY LAZACK28


















"use strict"
object.defineProperty(export, "_esModule", {value: true});
const {zokou} = require("../framework/zokou");
zokou({nomCom: "aitool", reaction:"", nomFicher: _filename }, async (dest, zk, commandeOptions) =>{
    console.log("Commande saisie !!!s");
    let z = '*LAZACK-MD* The following are the best ai links which can help you in different types of youre work.\n\n credit to mr lazack\n\n';
    let d = '1. https://krisp.ai/\n\n 2. https://www.beatoven.ai/\n\n 3. https://cleanvoice.ai/\n\n 4. https://podcastle.ai/\n\n 5. https://flair.ai/\n\n 6. https://illustroke.com/\n\n 7. https://www.patterned.ai/\n\n 8. https://stockimg.ai/\n\n 9. https://www.copy.ai/\n\n 10. https://copymonkey.ai/\n\n 11. https://www.ocoya.ai/\n\n 12. https://unbounce.com/\n\n 13. https://vidyo.ai/\n\n 14. https://Inkd.in/dmrkz_ah\n\n 15. https://otter.ai/';
    let varmess = z + d;
    var img = '//youre image';
    await zk.sendMessage(dest, { image:{ url: img }, caption: varmess });
    //console.log("montest")
});    
    