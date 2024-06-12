const Julie = require('../events');
const { MessageType, MessageOptions, Mimetype } = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');
const ffmpeg = require('fluent-ffmpeg');
const {execFile} = require('child_process');
const cwebp = require('cwebp-bin');
const Config = require('../config');
const need ="*වචනයක් අවශ්‍යයි 😭*"
             
 Julie.addCommand({pattern: 'btn ?(.*)', fromMe: true, dontAdCommandList: true}, (async (message, match) => {
      if (match[1] === '') return await message.client.sendMessage(message.jid,need);
      var topText, bottomText, tl, t2, t3 ;
      if (match[1].includes('/')) {
         var split = match[1].split('/');
         t3 = split[4];
         t2 = split[3];
         tl = split[2];
         bottomText = split[1];
         topText = split[0];
         
      }
      
    
  
  const rows = [
 {title: `${bottomText}`, description: `\n\n${tl}`, rowId:"rowid1"},
 {title: `${t2}`, description: `\n\n${t3}`, rowId:"rowid2"}
]

const sections = [{title: `${topText}`, rows: rows}]

const button = {
 buttonText: 'Click Me!',
 description: `${topText}`,
 sections: sections,
 listType: 1
}

await message.client.sendMessage(message.jid, button, MessageType.listMessage);
  
  
      //var sewimage = await axios.get(`https://pencarikode.xyz/api/textpro/stone-text?text=${topText}&text2=${bottomText}`, { responseType: 'arraybuffer' })
      
     // await message.client.sendMessage(message.jid,`${topText}${bottomText}${tl}`, MessageType.text);
   
   }));
