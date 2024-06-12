let PhoneNumber = require('awesome-phonenumber')
let fetch = require('node-fetch')
let handler = async (m, { conn, text, command }) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender    
    let name = conn.getName(who)
switch (command) {
case 'goblokcek':
case 'jelekcek':
case 'gaycek':
case 'rate':
case 'lesbicek':
case 'gantengcek':
case 'cantikcek':
case 'begocek':
case 'suhucek':
case 'pintercek':
case 'jagocek':
case 'nolepcek':
case 'babicek':
case 'bebancek':
case 'baikcek':
case 'jahatcek':
case 'anjingcek':
case 'haramcek':
case 'pakboycek':
case 'pakgirlcek':
case 'sangecek':
case 'bapercek':
case 'fakboycek':
case 'alimcek':
case 'suhucek':
case 'fakgirlcek':
case 'kerencek':
case 'wibucek':
case 'pasarkascek':
case 'kulcek':                
case 'cekgoblok':
case 'cekjelek':
case 'cekgay':                
case 'ceklesbi':
case 'cekganteng':
case 'cekcantik':
case 'cekbego':
case 'ceksuhu':
case 'cekpinter':
case 'cekjago':
case 'ceknolep':
case 'cekbabi':
case 'cekbeban':
case 'cekbaik':
case 'cekjahat':
case 'cekanjing':
case 'cekharam':
case 'cekpakboy':
case 'cekpakgirl':
case 'ceksange':
case 'cekbaper':
case 'cekfakboy':
case 'cekalim':
case 'ceksuhu':
case 'cekfakgirl':
case 'cekkeren':
case 'cekwibu':
case 'cekpasarkas':
case 'cekkul': {
const cek2 = cek1[Math.floor(Math.random() * cek1.length)]
conn.sendMessage(m.chat, { text: 'Pertanyaan : *' + command + '*\nNama : ' + `@${m.sender.split('@')[0]}` + '\nJawaban : ' + cek2 + '%', mentions: [m.sender] }, { quoted: m })
      break;
    }
  }
};
handler.tags = ['fun']
handler.help = handler.command = ['goblokcek', 'jelekcek', 'gaycek', 'rate', 'lesbicek', 'gantengcek',
'cantikcek',
'begocek',
'suhucek',
'pintercek',
'jagocek',
'nolepcek',
'babicek',
'bebancek',
'baikcek',
'jahatcek',
'anjingcek',
'haramcek',
'pakboycek',
'pakgirlcek',
'sangecek',
'bapercek',
'fakboycek',
'alimcek',
'suhucek',
'fakgirlcek',
'kerencek',
'wibucek',
'pasarkascek',
'kulcek',                
'cekgoblok',
'cekjelek',
'cekgay',                
'ceklesbi',
'cekganteng',
'cekcantik',
'cekbego',
'ceksuhu',
'cekpinter',
'cekjago',
'ceknolep',
'cekbabi',
'cekbeban',
'cekbaik',
'cekjahat',
'cekanjing',
'cekharam',
'cekpakboy',
'cekpakgirl',
'ceksange',
'cekbaper',
'cekfakboy',
'cekalim',
'ceksuhu',
'cekfakgirl',
'cekkeren',
'cekwibu',
'cekpasarkas',
'cekkul']
handler.limit = true
module.exports = handler
global.cek1 = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80','81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100']