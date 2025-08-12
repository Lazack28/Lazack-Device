/*
《✧》DONATE PLUGIN《✧》
- Lazaro Mtaju (@Lazack28)
*/

import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {
  let phone = text.trim()

  // Validate phone number (Tanzania format)
  if (!phone || !/^(0\d{8,9}|\+255\d{9})$/.test(phone)) {
    return conn.reply(
      m.chat,
      `📌 Please provide your phone number.\n\nExample:\n${usedPrefix + command} 0758868502`,
      m
    )
  }

  // Convert local format to international for ZenoPay
  if (phone.startsWith('0')) {
    phone = '255' + phone.slice(1)
  }

  // Fixed minimum donation
  const amount = 500
  const orderId = `DON-${Date.now()}`
  const payload = {
    order_id: orderId,
    buyer_email: 'lazaromtaju12@gmail.com', // optional
    buyer_name: m.pushName || 'Anonymous',
    buyer_phone: phone,
    amount: amount
  }

  try {
    await m.react(rwait)

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

📌 Please check your phone for an STK pop-up (mobile money payment request) and enter your PIN to complete the payment.

✅ I will notify you once payment is confirmed.`
      await conn.reply(m.chat, msg, m)
      await m.react(done)
    } else {
      await conn.reply(m.chat, `❌ Failed to start donation: ${data.message}`, m)
      await m.react(error)
    }
  } catch (err) {
    console.error('Donation error:', err.message)
    await conn.reply(m.chat, `⚠️ Error initiating donation.`, m)
    await m.react(error)
  }
}

handler.help = ['donate <phone>']
handler.tags = ['payment']
handler.command = ['donate']
handler.register = false

export default handler
