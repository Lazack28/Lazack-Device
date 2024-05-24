const util =require('util')
const fs = require('fs-extra');
const {zokou}=require(__dirname+"/../framework/zokou")
const {format,styletext}=require(__dirname+"/../framework/mesfonctions")
//const {police}=require(__dirname+"/../framework/mesfonctions")

const os =require("os");
const moment=require("moment-timezone")
const s =require(__dirname+"/../set")



zokou({nomCom:"menu2",categorie:"Général"},async(dest,zk,commandeOptions)=>{
let {ms,repondre}=commandeOptions;
let {cm}=require(__dirname+"/../framework//zokou")
  var coms={}
  var mode ="public";
  if(s.MODE_PUBLIC!="oui")
  {
    mode="privé"
  }

  var emoji={"Général":"🌐","Logo":"🎨","hentai":"🔥","weeb":"🌸","recherche":"🔍","conversion":"🌟","groupe":"♻️"}
cm.map(async(com,index)=>{if(!coms[com.categorie])coms[com.categorie]=[]; coms[com.categorie].push(com.nomCom)})
              
  const temps=moment(moment()).format("HH:MM:SS")

  moment.tz.setDefault('asia/karachi ').locale("id")

  const date =moment.tz("asia/karachi").format("DD/MM/YYYY")
  

 console.log("date" +date) 
  console.log("temps "+temps)
  
let menuMsg="  ╩═══ * Ƶ𝓞ｋØ𝓊 * ╩═══\n\n";

  
/*menuMsg+=`



Owner : ${s.NOM_OWNER} \n       || Commandes : ${cm.length} \n        || Date : ${date}\n || Heure : ${temps} \n || Mémoire : ${format(os.totalmem()-os.freemem())}/${format(os.totalmem())}\n || Plateforme : ${os.platform()}\n || Developpeur : Djalega++ \n\n ╰────────────────`;




  
╚═════ ▓▓ ࿇ ▓▓ ═════╝*/



 /* menuMsg+=`
╔════ ▓▓ ࿇ ▓▓ ════╗ 

||      
||     Prefix : ${s.prefixe}
||      Owner : ${s.NOM_OWNER} 
||      Commands : ${cm.length}      
||      Date : ${date}
||      Heure : ${temps}
||      Memories : ${format(os.totalmem()-os.freemem())}/${format(os.totalmem())}                   {Plateforme : ${os.platform()}
||  Developer : Lazack_28
|| Believe you can in everything 
╚════ ▓▓ ࿇ ▓▓ ════╝`;*/


  menuMsg+=`
╔════---------
║  💌   ${s.PREFIXE} menu
║  💌   ${s.PREFIXE} alive  
║  💌   ${s.PREFIXE} ping
║  💌   ${s.PREFIXE} owner
║  💌   ${s.PREFIXE} support 
║  💌   ${s.PREFIXE} toolmenu
║  💌   ${s.PREFIXE} downloadmenu
║  💌   ${s.PREFIXE} mainmenu
║     Lazack_28
  ✍️ Believe in you always remember you can even if it will take you time.
╚════---------------;
