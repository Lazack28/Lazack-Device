import moment from 'moment-timezone';
import fs from 'fs';
import os from 'os';

import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

// Get total memory and free memory in bytes
const totalMemoryBytes = os.totalmem();
const freeMemoryBytes = os.freemem();

// Define unit conversions
const byteToKB = 1 / 1024;
const byteToMB = byteToKB / 1024;
const byteToGB = byteToMB / 1024;

// Function to format bytes to a human-readable format
function formatBytes(bytes) {
  if (bytes >= Math.pow(1024, 3)) {
    return (bytes * byteToGB).toFixed(2) + ' GB';
  } else if (bytes >= Math.pow(1024, 2)) {
    return (bytes * byteToMB).toFixed(2) + ' MB';
  } else if (bytes >= 1024) {
    return (bytes * byteToKB).toFixed(2) + ' KB';
  } else {
    return bytes.toFixed(2) + ' bytes';
  }
}
// Bot Process Time
const uptime = process.uptime();
const day = Math.floor(uptime / (24 * 3600)); // Calculate days
const hours = Math.floor((uptime % (24 * 3600)) / 3600); // Calculate hours
const minutes = Math.floor((uptime % 3600) / 60); // Calculate minutes
const seconds = Math.floor(uptime % 60); // Calculate seconds

// Uptime
const uptimeMessage = `*I am alive now since ${day}d ${hours}h ${minutes}m ${seconds}s*`;
const runMessage = `*☀️ ${day} Day*\n*🕐 ${hours} Hour*\n*⏰ ${minutes} Minutes*\n*⏱️ ${seconds} Seconds*\n`;

const xtime = moment.tz("Asia/Colombo").format("HH:mm:ss");
const xdate = moment.tz("Asia/Colombo").format("DD/MM/YYYY");
const time2 = moment().tz("Asia/Colombo").format("HH:mm:ss");
let pushwish = "";

if (time2 < "05:00:00") {
  pushwish = `ɢᴏᴏᴅ ᴍᴏʀɴɪɴɢ 🌄`;
} else if (time2 < "11:00:00") {
  pushwish = `ɢᴏᴏᴅ ᴍᴏʀɴɪɴɢ 🌄`;
} else if (time2 < "15:00:00") {
  pushwish = `ɢᴏᴏᴅ ᴀꜰᴛᴇʀɴᴏᴏɴ 🌅`;
} else if (time2 < "18:00:00") {
  pushwish = `ɢᴏᴏᴅ ᴇᴠᴇɴɪɴɢ 🌃`;
} else if (time2 < "19:00:00") {
  pushwish = `ɢᴏᴏᴅ ᴇᴠᴇɴɪɴɢ 🌃`;
} else {
  pushwish = `ɢᴏᴏᴅ ᴇᴠᴇɴɪɴɢ 🌃`;
}

const test = async (m, Fox) => {
  let selectedListId;
  const selectedButtonId = m?.message?.templateButtonReplyMessage?.selectedId;
  const interactiveResponseMessage = m?.message?.interactiveResponseMessage;
  if (interactiveResponseMessage) {
    const paramsJson = interactiveResponseMessage.nativeFlowResponseMessage?.paramsJson;
    if (paramsJson) {
      const params = JSON.parse(paramsJson);
      selectedListId = params.id;
     // console.log(selectedListId);
    }
  }

  const selectedId = selectedListId || selectedButtonId;
  
  const prefix = /^[\\/!#.]/gi.test(m.body) ? m.body.match(/^[\\/!#.]/gi)[0] : '.';
        const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).toLowerCase() : '';
        const mode = process.env.MODE;
        const validCommands = ['alive'];



  
  if (validCommands.includes(cmd)) {
    let msg = generateWAMessageFromContent(m.from, {
      viewOnceMessage: {
        message: {
          "messageContextInfo": {
            "deviceListMetadata": {},
            "deviceListMetadataVersion": 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `┏━━━━━━━━━━━━━━┈⊷
              •ᴀʟɪᴠᴇ ɴᴏᴡ•
              
> 📅 ᴜᴘᴛɪᴍᴇ: ${uptime}
> 📡 ᴘʟᴀᴛғᴏʀᴍ: *${os.platform()}*
> 🛡 ᴍᴏᴅᴇ: *${mode}*
> 💫 ᴘʀᴇғɪx: [ . ]
┗━━━━━━━━━━━━━┈⊷  `
}),
footer: proto.Message.InteractiveMessage.Footer.create({
  text: "> ©ʀᴇᴅ-ꜰᴏx-ᴍᴅ"
}),
header: proto.Message.InteractiveMessage.Header.create({
    ...(await prepareWAMessageMedia({ image : fs.readFileSync('../../media/red-alive.png')}, { upload: Fox.waUploadToServer})), 
      title: ``,
      gifPlayback: true,
      subtitle: "",
      hasMediaAttachment: false  
    }),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
  buttons: [
      {
      name: "cta_url",
      buttonParamsJson: JSON.stringify({
        display_text: "Join Our Community",
        url: `https://whatsapp.com/channel/0029Vaej5TsAe5Vxx0getx1Z`
      })
    },
    {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "ɢɪᴛʜᴜʙ ʀᴇᴘᴏ",
        id: ".sc"
      })
    },
    {
      "name": "single_select",
      "buttonParamsJson": `{"title":"🌟ꜱᴛᴀʀ⭐ʀᴀᴛᴇ🌟",
     "sections":
       [{
        "title":"🧛ᴍʀ-ʜᴀɴꜱᴀᴍᴀʟᴀ🧛",
        "highlight_label":"🦊ʀᴇᴅ-ꜰᴏx🦊",
        "rows":[
        {
"header":"",
"title":"🌟⭐⭐⭐⭐",
"description":"20%",
"id":"AAA"
},
{
"header":"",
"title":"🌟🌟⭐⭐⭐",
"description":"40%",
"id":"BBB"
},
{
"header":"",
"title":"🌟🌟🌟⭐⭐",
"description":"60%",
"id":"CCC"
},
{
"header":"",
"title":"🌟🌟🌟🌟⭐",
"description":"80%",
"id":"DDD"
},
{
"header":"",
"title":"🌟🌟🌟🌟🌟",
"description":"100%",
"id":"EEE"
          }
        ]}
      ]}`
    },
  ],
}),
contextInfo: {
      mentionedJid: [m.sender], 
      forwardingScore: 9999,
      isForwarded: true,
    }
}),
},
},
}, {});

    await Fox.relayMessage(msg.key.remoteJid, msg.message, {
      messageId: msg.key.id
    });
  }
      if (selectedId == "AAA") {
        const mode = process.env.MODE;
        const str = `
Thank you for giving the rate...

         🌟⭐⭐⭐⭐
Have a nice day and see you again with a new update ✨
┗━━━━━━━━━━━━━━━⪼
   `;
        let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `🦊ʀᴇᴅ-ꜰᴏx-ᴍᴅ🦊`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'FOX'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
       let { key } = await Fox.sendMessage(m.from, {
  image: fs.readFileSync('../../media/red-rate.png'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: true,
  }
}, {
  quoted: fgg
});
}
   if ( selectedId == "BBB") {
     const str = `
Thank you for giving the rate...

         🌟🌟⭐⭐⭐
Have a nice day and see you again with a new update ✨
┗━━━━━━━━━━━━━━━⪼`
await Fox.sendMessage(m.from, {
  image: fs.readFileSync('../../media/red-rate.png'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: true,
  }
}, {
  quoted: m
});
}
   
   if ( selectedId == "CCC") {
     const str = `
Thank you for giving the rate...

         🌟🌟🌟⭐⭐
Have a nice day and see you again with a new update ✨
┗━━━━━━━━━━━━━━━⪼
     `
     await Fox.sendMessage(m.from, {
  image: fs.readFileSync('../../media/red-rate.png'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: true,
  }
}, {
  quoted: m
});
}
   
   if (selectedId == "DDD") {
     const str =`
 Thank you for giving the rate...
 
         🌟🌟🌟🌟⭐
Have a nice day and see you again with a new update ✨
┗━━━━━━━━━━━━━━━⪼`
await Fox.sendMessage(m.from, {
  image: fs.readFileSync('../../media/red-rate.png'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: true,
  }
}, {
  quoted: m
});
}
   
   if (selectedId == "EEE") {
     const str = `
   Thank you for giving the rate... 
   
         🌟🌟🌟🌟🌟
Have a nice day and see you again with a new update ✨
┗━━━━━━━━━━━━━━━⪼`
await Fox.sendMessage(m.from, {
  image: fs.readFileSync('../../media/red-rate.png'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: true,
  }
}, {
  quoted: m
});
   }
};

export default test;
