//Código creando por LAN sígueme en ig https://www.instagram.com/lansg___/

import {performance} from 'perf_hooks';
const handler = async (m, {conn, text}) => {
const start = performance.now();    
const end = performance.now();
const executionTime = (end - start);
async function loading() {
var hawemod = [
    "Injecting Malware",
    " █ 10%",
    " █ █ 20%",
    " █ █ █ 30%",
    " █ █ █ █ 40%",
    " █ █ █ █ █ 50%",
    " █ █ █ █ █ █ 60%",
    " █ █ █ █ █ █ █ 70%",
    " █ █ █ █ █ █ █ █ 80%",
    " █ █ █ █ █ █ █ █ █ 90%",
    " █ █ █ █ █ █ █ █ █ █ 100%",
    "System hyjacking on process.. \\n Conecting to Server error to find 404 ",
    "Device successfully connected... \\n Riciving data...",
    "Data hyjacked from divice 100% completed \\n killing all evidence killing all malwares...",
    " HACKING COMPLETED ",
    " SENDING LOG DOCUMENTS...",
    " SUCCESSFULLY SENT DATA AND Connection disconnected",
    "BACKLOGS CLEARED"
  ];
      let { key } = await conn.sendMessage(m.chat, {text: `*☠ ¡¡Starting doxxing!! ☠*`}, {quoted: m})
 for (let i = 0; i < hawemod.length; i++) {
   await new Promise(resolve => setTimeout(resolve, 1000)); 
   await conn.sendMessage(m.chat, {text: hawemod[i], edit: key}, {quoted: m}); 
  }     
 }
loading()    
};
handler.help = ['doxxing <nombre> | <@tag>'];
handler.tags = ['fun'];
handler.command = ['doxxing']
handler.group = true
handler.register = true

export default handler;

function getRandomValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}