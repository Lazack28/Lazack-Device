export async function before(m) {
  if (!m.text || !global.prefix.test(m.text)) return

  const usedPrefix = global.prefix.exec(m.text)[0]
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase()
  if (!command || command === 'bot') return

  const validCommand = (cmd, plugins) => {
    for (let plugin of Object.values(plugins)) {
      if (!plugin.command) continue
      let cmds = Array.isArray(plugin.command) ? plugin.command : [plugin.command]
      if (cmds.includes(cmd)) return true
    }
    return false
  }

  if (validCommand(command, global.plugins)) {
    let chat = global.db.data.chats[m.chat]
    let user = global.db.data.users[m.sender]

    if (chat.isBanned) {
      const notice = `🚫 *${botname}* is disabled in this group, nya~ 💔\n\n🛡️ An *admin-sama* can enable it with:\n➤ *${usedPrefix}bot on*`
      await m.reply(notice)
      return
    }

    user.commands = (user.commands || 0) + 1
  } else {
    const inputCommand = m.text.trim().split(' ')[0]
    const allCommands = []

    for (let plugin of Object.values(global.plugins)) {
      if (!plugin.command) continue
      let cmds = Array.isArray(plugin.command) ? plugin.command : [plugin.command]
      allCommands.push(...cmds.map(cmd => usedPrefix + cmd))
    }

    // 🌸 Simple function to search for similar commands
    function searchSimilar(base, list) {
      const score = (a, b) => {
        let same = 0
        for (let i = 0; i < Math.min(a.length, b.length); i++) {
          if (a[i] === b[i]) same++
        }
        return same / Math.max(a.length, b.length)
      }
      return list
        .map(cmd => ({ cmd, score: score(base, cmd) }))
        .filter(e => e.score >= 0.3)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
    }

    const suggestions = searchSimilar(inputCommand, allCommands)

    let response = `💢 *Command not found, nya~*\n\n`
    response += `🌸 The command *${inputCommand}* does not exist or is misspelled.\n`
    response += `📖 Use *${usedPrefix}help* to see the full list of commands.\n`

    if (suggestions.length > 0) {
      response += `\n💡 Maybe you meant:\n`
      for (let s of suggestions) {
        let percent = (s.score * 100).toFixed(1)
        response += `➤ ${s.cmd} (${percent}%)\n`
      }
    }

    response += `\n✨ Keep trying, I believe in you~! >w<`

    await m.reply(response)
  }
}
