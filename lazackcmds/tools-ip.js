import axios from 'axios'

let handler = async (m, { conn, text }) => {
  //await m.reply('🧑🏻‍💻 Searching...')
  let bot = '🍭 Searching, please wait....'
  conn.reply(m.chat, bot, m)

  if (!text) return conn.reply(m.chat, `${emoji} Please enter a valid *IP address*.`, m)

  axios.get(`http://ip-api.com/json/${text}?fields=status,message,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,isp,org,as,mobile,hosting,query`).then ((res) => {
    const data = res.data

    if (String(data.status) !== "success") {
      throw new Error(data.message || "Failed")
    }

    let ipsearch = `
☁️ *I P - I N F O* ☁️

IP Address     : ${data.query}
Country        : ${data.country}
Country Code   : ${data.countryCode}
Region/State   : ${data.regionName}
Region Code    : ${data.region}
City           : ${data.city}
District       : ${data.district}
Postal Code    : ${res.data.zip}
Timezone       : ${data.timezone}
ISP            : ${data.isp}
Organization   : ${data.org}
AS Number      : ${data.as}
Mobile Network : ${data.mobile ? "Yes" : "No"}
Hosting        : ${data.hosting ? "Yes" : "No"}
`.trim()

    conn.reply(m.chat, ipsearch, m)
  })
}

handler.help = ['ip <ip address>']
handler.tags = ['owner']
handler.command = ['ip']

export default handler
