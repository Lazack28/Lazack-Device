const userLastMessageMap = new Map();

export async function all(m) {
  const isGroupInvite = m.mtype === 'groupInviteMessage';
  const isGreeting = m.text?.toLowerCase().startsWith('hello') || m.text?.toLowerCase().startsWith('mambo');

  if ((isGroupInvite || isGreeting) && !m.isBaileys && !m.isGroup) {
    let userName = m.pushName || `@${m.sender.split('@')[0]}`;

    // Professional responses
    const responses = [
      `Hello ${userName}, thank you for reaching out. How may I assist you today?`,
      `Good day, ${userName}. How can I help you?`,
      `Hello ${userName}, I appreciate your message. Please let me know how I can assist you.`,
      `Hi ${userName}, how can I be of service to you today?`,
      `Greetings ${userName}, I am here to assist you. Please let me know what you need.`
    ];

    let reply = responses[Math.floor(Math.random() * responses.length)];

    await this.sendMessage(m.chat, { text: reply.trim() }, { quoted: m });

    // Adding a neutral reaction for professionalism
    const reactions = ['✅', '💼', '📩'];
    let reaction = reactions[Math.floor(Math.random() * reactions.length)];
    m.react(reaction);
  }

  return true;
}
