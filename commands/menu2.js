const os = require('os')
const moment = require("moment-timezone")
const fs = require("fs")
const Config = require('../config')
let { fancytext, tlang, tiny, runtime, formatp, botpic, prefix, sck1 } = require("../lib");
const long = String.fromCharCode(8206)
const readmore = long.repeat(4001)
const Secktor = require('../lib/commands')

    //---------------------------------------------------------------------------
Secktor.cmd({
            pattern: "help1",
            alias: ["menu1"],
            desc: "Help list",
            category: "general",
            react: "📃",
            filename: __filename
        },
        async(Void, citel, text) => {
            const { commands } = require('../lib');
            if (text.split(" ")[0]) {
                let arr = [];
                const cmd = commands.find((cmd) => cmd.pattern === (text.split(" ")[0].toLowerCase()))
                if (!cmd) return await citel.reply("*😔No Such commands.*");
                else arr.push(`*🍁Command:* ${cmd.pattern}`);
                if (cmd.category) arr.push(`*✨Category:* ${cmd.category}`);
                if (cmd.alias) arr.push(`*⚡️Alias:* ${cmd.alias}`);
                if (cmd.desc) arr.push(`*🗂Description:* ${cmd.desc}`);
                if (cmd.use) arr.push(`*📡Usage:*\n \`\`\`${prefix}${cmd.pattern} ${cmd.use}\`\`\``);
                return await citel.reply(arr.join('\n'));
            } else {
                const cmds = {}
                commands.map(async(command, index) => {
                    if (command.dontAddCommandList === false && command.pattern !== undefined) {
                        if (!cmds[command.category]) cmds[command.category] = []
                        cmds[command.category].push(command.pattern)
                    }
                })
                const time = moment(moment())
                    .format('HH:mm:ss')
                moment.tz.setDefault('Africa/NAIROBI')
                    .locale('id')
                const date = moment.tz('asia/Islamabad').format('DD/MM/YYYY')
                let total = await sck1.countDocuments()
                let str = `––-〘  LAZACK MD  〙–––\n`
                str +=
                   '```' + `
─────᭓᭓᭓᭓᭓──── 
▋ ➪ 𝐔𝐬𝐞𝐫: ${citel.pushName} 
▋ ➪ 𝐏𝐫𝐞𝐟𝐢𝐱𝐞: 〘 ${prefix} 〙
▋ ➪ 𝐎𝐰𝐧𝐞𝐫: LAZACK28 
▋ ➪ 𝐏𝐥𝐮𝐠𝐢𝐧𝐬: ${commands.length} 
▋ ➪ 𝐔𝐩𝐭𝐢𝐦𝐞: ${runtime(process.uptime())} 
─────᭓᭓᭓᭓᭓──── 

        Moded by Lazack28
© 2024
✞᭓᭓᭓᭓᭓᭓᭓᭓᭓᭓᭓᭓᭓᭓᭓᭓᭓↰✞
currently working on Lazack md v2
✞᭓᭓᭓᭓᭓᭓᭓᭓᭓᭓᭓᭓᭓᭓᭓᭓᭓↰✞
™Lazack28
––––––––––––
` + '```'
                  };
                return await Void.sendMessage(citel.chat, buttonMessaged);
            }
        }
    )
