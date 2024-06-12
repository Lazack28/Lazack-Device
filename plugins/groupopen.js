/* Copyright (C) 2021 AJU.

Licensed under the  GPL-3.0 License;

you may not use this file except in compliance with the License.

Ajuser - AJU

*/

const Asena = require('../events');

const {MessageType} = require('@adiwajshing/baileys');

const OP = ('This command for OPEN the  Group at MORNING');

const code = ('!unmute')

const FINAL = "```The group  has open 🔓!```"

const TMUTE = "Trying to open the group"

const TST = "!tag !gm"

const SCXR = "Running script...."

Asena.addCommand({pattern: 'open', fromMe: true, deleteCommand: true, desc: OP,}, (async (message, match) => {

  var msg = await message.reply('Preforming....');

  await message.client.sendMessage(

    message.jid,TMUTE, MessageType.text);

      await message.client.sendMessage(

        message.jid,SCXR, MessageType.text);

        await message.client.sendMessage(

          message.jid,code, MessageType.text);

            await message.client.sendMessage(

               message.jid,TST, MessageType.text);

     

                 await message.client.sendMessage(

                             message.jid,FINAL, MessageType.text);

}));
