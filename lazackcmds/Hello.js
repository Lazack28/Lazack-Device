export async function all(m) {
  // when someone sends you hello message
  if (
    (m.mtype === 'hellomessage' ||
      m.text.startsWith('Hello') ||
      m.text.startsWith('Hi') ||
      m.text.startsWith('Mambo') ||
      m.text.startsWith('Oy') ||
      m.text.startsWith('Niaje') ||
      m.text.startsWith('kaka')) &&
    !m.isBaileys &&
    !m.isGroup
 /* ) {
    this.sendMessage(
      m.chat,
      {
        text: `Hello @${m.sender.split('@')[0]}\nyou can rent the bot to join a group\n\n_For more info you can DM the owner_\n*Type* \`\`\`.owner\`\`\` *to contact the owner*`.trim(),
      },
      { quoted: m }*/
    ) {
    this.sendButton(m.chat, `*WELCOME ITS ME JUST REPLYING*      
    morning or evening @${m.sender.split('@')[0]} 
    i may be offline or i may be slow to respond you but wait i will be back soon 😇\n\n *What we offer*\n\n1. Heroku credit cards\n2. Bot deployment works 24/7\n3. Social media followers\n\n\n> click the buttons to see me
  `.trim(), igfg, null, [['OWNER HELP', '.mrcs'],['GET TEXT', '.repo']] , m, { mentions: [m.sender] })
    m.react('🤫')
  }

  return !0
}
