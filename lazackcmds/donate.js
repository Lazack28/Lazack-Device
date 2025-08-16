import fetch from 'node-fetch'

const userCooldown = new Set()
const pendingDonations = new Map() // Track pending donations for confirmation
const processedDonations = new Set() // Track completed orders to avoid duplicates

let handler = async (m, { text, usedPrefix, command }) => {
  if (userCooldown.has(m.sender)) {
    return conn.reply(m.chat, '⏳ Please wait 5 minutes before donating again.', m)
  }

  let phone = text.trim()
  let amount = 500

  if (text.includes(' ')) {
    const [inputPhone, inputAmount] = text.split(' ')
    phone = inputPhone.trim()
    amount = parseInt(inputAmount) || 500
  }

  if (!phone || !/^(0\d{8,9}|\+255\d{9})$/.test(phone)) {
    return conn.reply(
      m.chat,
      `📌 Invalid phone number.\n\nExample:\n${usedPrefix + command} 0758868502 1000`,
      m
    )
  }

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
      pendingDonations.set(orderId, {
        chat: m.chat,
        user: m.sender,
        amount,
        phone,
        timestamp: Date.now()
      })

      const msg = `《✧》 *Donation Initiated* 《✧》

💳 Order ID: ${orderId}
💰 Amount: ${amount} TZS
📱 Phone: ${phone}

📌 Check your phone for an STK pop-up and enter your PIN.

I'll notify you once payment is confirmed.`
      await conn.reply(m.chat, msg, m)
      await m.react(done)

      pollPaymentConfirmation(orderId, m)

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

// Updated poller
async function pollPaymentConfirmation(orderId, originalMessage) {
  const maxAttempts = 2 // Only 2 checks (1 minute total)
  const delay = 30 * 1000 // 30 seconds apart
  let attempts = 0

  const checkPayment = async () => {
    try {
      const res = await fetch(`https://api-pay-du0j.onrender.com/check-payment?order_id=${orderId}`)
      const data = await res.json()

      if (data.status === 'completed' && !processedDonations.has(orderId)) {
        const donation = pendingDonations.get(orderId)
        if (donation) {
          const successMsg = `🎉 *Donation Confirmed!*\n\n` +
            `💳 Order ID: ${orderId}\n` +
            `💰 Amount: ${donation.amount} TZS\n` +
            `📱 Phone: ${donation.phone}\n\n` +
            `Thank you for your support! ❤️`

          await conn.reply(donation.chat, successMsg, originalMessage)
          await conn.react(originalMessage, '✅')

          processedDonations.add(orderId) // Mark as processed
          pendingDonations.delete(orderId)
        }
        return
      }

      attempts++
      if (attempts < maxAttempts) {
        setTimeout(checkPayment, delay)
      } else {
        const donation = pendingDonations.get(orderId)
        if (donation) {
          await conn.reply(
            donation.chat,
            `⚠️ Payment for order ${orderId} not confirmed yet. Please check your mobile money transaction history.`,
            originalMessage
          )
          pendingDonations.delete(orderId)
        }
      }
    } catch (err) {
      console.error('Confirmation check error:', err)
      if (attempts < maxAttempts) {
        setTimeout(checkPayment, delay)
      }
    }
  }

  setTimeout(checkPayment, delay)
}

handler.help = ['donate <phone> [amount]']
handler.tags = ['payment']
handler.command = ['donate']
handler.register = false

export default handler
