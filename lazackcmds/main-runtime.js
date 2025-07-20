let handler = async (m, { usedPrefix, command }) => {
  let uptime = await process.uptime()
  let runtime = `${global.botname}

✰ Active time: ${rTime(uptime)}`
  conn.reply(m.chat, runtime, m)
}
handler.help = ['runtime']
handler.tags = ['main']
handler.command = ['runtime', 'uptime']

export default handler

const dd = new Date(new Date + 3600000);
const time = dd.toLocaleString('en-US', { 
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true 
});

function rTime(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
};