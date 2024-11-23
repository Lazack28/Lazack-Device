const userLastMessageMap = new Map();

export async function all(m) {
  // when someone sends a group link to the bot's dm
  if (
    (m.mtype === 'groupInviteMessage' ||
      m.text.startsWith('Hello') ||
      m.text.startswith('Niaje') ||
      m.text.startswith('Vp') ||
      m.text.startsWith('Mambo')) &&
    !m.isBaileys &&
    !m.isGroup
  ) {
    this.sendMessage(
      m.chat,
      {
        text: `*Hi ✋*`.trim(),
      },
      { quoted: m }
    )
    /*this.sendButton(m.chat, `*Invite bot to a group*      
    Hallo @${m.sender.split('@')[0]} 
    you can rent the bot to join a group or contact owner 
    more info click on the button
  `.trim(), igfg, null, [['Rent', '/buyprem']] , m, { mentions: [m.sender] })*/
    m.react('😎')
  }

  return !0
}