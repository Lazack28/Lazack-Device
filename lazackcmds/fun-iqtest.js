let handler  = async (m, { conn }) => {
  conn.reply(m.chat,`${pickRandom(global.iq)}`, m)
}
handler.help = ['iqtest']
handler.tags = ['fun']
handler.command = ['iqtest', 'iq']
handler.group = true
handler.register = true
handler.fail = null

export default handler 

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.iq = [
'Your IQ is: 1',
'Your IQ is: 14',
'Your IQ is: 23',
'Your IQ is: 35',
'Your IQ is: 41',
'Your IQ is: 50',
'Your IQ is: 67',
'Your IQ is: 72',
'Your IQ is: 86',
'Your IQ is: 99',
'Your IQ is: 150',
'Your IQ is: 340',
'Your IQ is: 423',
'Your IQ is: 500',
'Your IQ is: 676',
'Your IQ is: 780',
'Your IQ is: 812',
'Your IQ is: 945',
'Your IQ is: 1000',
'Your IQ is: Unlimited!!',
'Your IQ is: 5000',
'Your IQ is: 7500',
'Your IQ is: 10000',
]