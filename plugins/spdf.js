let Julie = require('../events');
let {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
let fs = require('fs');
let axios = require('axios');
let request = require('request');
let got = require("got");
let Config = require('../config');
let Language = require('../language');
let Lang = Language.getString('unvoice');
let toxicdevil = Config.WORKTYPE == 'public' ? false : true

   Julie.addCommand({pattern: 'spdf ?(.*)', fromMe: toxicdevil, desc: 'Converts Site to PDF.' }, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid, '*You must enter a link!*', MessageType.text);

    var webimage = await axios.get(`https://api.html2pdf.app/v1/generate?url=${match[1]}&apiKey=begC4dFAup1b8LyRXxAfjetfqDg2uYx8PWmh9YJ59tTZXiUyh2Vs72HdYQB68vyc`, { responseType: 'arraybuffer' })

    await message.client.sendMessage(message.jid, '```Converting Site to PDF```', MessageType.text);

    await message.sendMessage(Buffer.from(webimage.data), MessageType.document, {mimetype: Mimetype.pdf, filename: 'Ajuser.pdf'});

    }));    
