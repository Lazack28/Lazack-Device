  let handler = async (m, { conn, usedPrefix, text }) => {
  let { key } = await conn.sendMessage(m.chat, { text: "BE AWARE EVEN ME I DONT KNOW THIS CODE" }, { quoted: m });
  const array = [
    "8==👊==D", "8===👊=D", "8=👊===D", "8=👊===D", "8==👊==D", "8===👊=D", "8====👊D", "8==👊=D", "8==👊==D", "8=👊===D", "8👊====D", "8=👊===D","8==👊==D", "8===👊=D", "8====👊D","8==👊==D", "8===👊=D", "8=👊===D", "8=👊===D", "8==👊==D", "8===👊=D", "8====👊D💦"
  ];

  for (let item of array) {
    await conn.sendMessage(m.chat, { text: `${item}`, edit: key }, { quoted: m });
    await new Promise(resolve => setTimeout(resolve, 20)); // Delay 5 seconds
  }
  return conn.sendMessage(m.chat, { text: `Oh, SHIT`.trim() , edit: key, mentions: [m.sender] }, { quoted: m });
};

handler.help = ['pajeame'];
handler.tags = ['fun'];
handler.command = ['paja', 'pajama']
handler.group = true
handler.register = true

export default handler;