import fetch from 'node-fetch'

const userCooldown = new Set()

let handler = async (m, { text, usedPrefix, command }) => {
  // Cooldown check
  if (userCooldown.has(m.sender)) {
    return conn.reply(m.chat, '⏳ Please wait 5 minutes before donating again.', m)
  }

  // Parse input
  let phone = text.trim()
  let amount = 500 // Default amount

  if (text.includes(' ')) {
    const [inputPhone, inputAmount] = text.split(' ')
    phone = inputPhone.trim()
    amount = parseInt(inputAmount) || 500
  }

  // Validate phone number
  if (!phone || !/^(0\d{8,9}|\+255\d{9})$/.test(phone)) {
    return conn.reply(
      m.chat,
      `📌 Invalid phone number.\n\nExample:\n${usedPrefix + command} 0758868502 1000`,
      m
    )
  }

  // Format phone for API
  if (phone.startsWith('0')) {
    phone = '255' + phone.slice(1)
  } else if (phone.startsWith('+255')) {
    phone = phone.slice(1)
  }

  const orderId = `DON-${Date.now()}`
  const payload = {
    order_id: orderId,
    buyer_name: m.pushName || 'Anonymous',
    buyer_phone: phone,
    amount: amount
  }

  try {
    await m.react(rwait)
    userCooldown.add(m.sender)
    setTimeout(() => userCooldown.delete(m.sender), 5 * 60 * 1000)

    const res = await fetch('https://api-pay-du0j.onrender.com/make-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const data = await res.json()

    if (data.status === 'success') {
      const msg = `《✧》 *Donation Initiated* 《✧》

💳 Order ID: ${orderId}
💰 Amount: ${amount} TZS
📱 Phone: ${phone}

📌 Check your phone for an STK pop-up and enter your PIN.`
      await conn.reply(m.chat, msg, m)
      await m.react(done)
    } else {
      await conn.reply(m.chat, `❌ Failed: ${data.message || 'Unknown error'}`, m)
      await m.react(error)
    }
  } catch (err) {
    console.error('Donation error:', err)
    await conn.reply(m.chat, '⚠️ Server error. Try again later.', m)
    await m.react(error)
  }
}

handler.help = ['donate <phone> [amount]']
handler.tags = ['payment']
handler.command = ['donate']
handler.register = false

export default handler
