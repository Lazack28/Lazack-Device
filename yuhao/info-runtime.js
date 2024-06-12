let moment = require('moment-timezone')
let fetch = require('node-fetch')
let fs = require('fs')

let handler = async (m, { conn, args, usedPrefix, command }) => {
const _uptime = process.uptime() * 1000
const uptimex = clockString(_uptime)
m.reply('*Aktif Selama:* ' + uptimex)
}
handler.help = ['runtime']
handler.tags = ['info']
handler.command = /^(uptime|runtime)$/i

module.exports = handler

function clockString(ms) {
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let daysms = ms % (24 * 60 * 60 * 1000);
    let hours = Math.floor((daysms) / (60 * 60 * 1000));
    let hoursms = ms % (60 * 60 * 1000);
    let minutes = Math.floor((hoursms) / (60 * 1000));
    let minutesms = ms % (60 * 1000);
    let sec = Math.floor((minutesms) / (1000));
    return days + " D " + hours + " H " + minutes + " M " + sec + " S";
}