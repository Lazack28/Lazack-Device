import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command('help', {
    description: "Displays the bot's usable commands",
    aliases: ['h', 'menu', 'commands'],
    cooldown: 5,
    exp: 20,
    usage: 'help || help <command_name>',
    category: 'general'
})
export default class extends BaseCommand {
    private imageUrls: string[] = [
        'https://telegra.ph/file/96e86a5fe768fb5cc6193.jpg',
        'https://telegra.ph/file/78e38a311fb321471d83c.jpg',
        'https://telegra.ph/file/41964deb11222c107996e.jpg',
        'https://telegra.ph/file/8b87b410b49d61de535d3.jpg',
        'https://telegra.ph/file/e9aa5e407abe6d7911ace.jpg',
    ]
    // you can add more pictures if you want bro or girl
    
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        if (!context) {
            let commands = Array.from(this.handler.commands, ([command, data]) => ({
                command,
                data
            })).filter((command) => command.data.config.category !== 'bot')
            M.reply('*..i think i love you..*')
            const randomImageUrl = this.imageUrls[Math.floor(Math.random() * this.imageUrls.length)]
            const image = await this.client.utils.getBuffer(randomImageUrl)
            let text = `✨! *@${M.sender.jid.split('@')[0]}*, 𝐈 𝐀𝐌 ${
                this.client.config.name
            }\n\n𝐌𝐲 𝐏𝐫𝐞𝐟𝐢𝐱 𝐢𝐬 - "${this.client.config.prefix}"\n\n 1. *The usable commands are listed below*.`
            const categories: string[] = []
            for (const command of commands) {
                if (categories.includes(command.data.config.category)) continue
                categories.push(command.data.config.category)
            }
            for (const category of categories) {
                const categoryCommands: string[] = []
                const filteredCommands = commands.filter((command) => command.data.config.category === category)
                text += `\n\n*━━━❰ ${this.client.utils.capitalize(category)} ❱━━━*\n\n`
                filteredCommands.forEach((command) => categoryCommands.push(command.data.name))
                text += `\`\`\`➪${categoryCommands.join(' ● ')}\`\`\``
            }
            text += `\n\n📕 *Note:*\n
 *➪ Use ${this.client.config.prefix}help <command_name> for more info of a specific command* 
 *➪ Example: *${this.client.config.prefix}help hello*
 *➪ <> hitman47 ©️ 2024 Command List*`
            return void (await M.reply(image, 'image', undefined, undefined, text, [M.sender.jid]))
        } else {
            const cmd = context.trim().toLowerCase()
            const command = this.handler.commands.get(cmd) || this.handler.aliases.get(cmd)
            if (!command) return void M.reply(`No command found | *"${context.trim()}"*`)
            return void M.reply(
                `🎐 *Command:* ${this.client.utils.capitalize(command.name)}\n🎴 *Aliases:* ${
                    !command.config.aliases
                        ? ''
                        : command.config.aliases.map((alias) => this.client.utils.capitalize(alias)).join(', ')
                }\n🔗 *Category:* ${this.client.utils.capitalize(command.config.category)}\n⏰ *Cooldown:* ${
                    command.config.cooldown ?? 3
                }s\n🎗 *Usage:* ${command.config.usage
                    .split('||')
                    .map((usage) => `${this.client.config.prefix}${usage.trim()}`)
                    .join(' | ')}\n🧧 *Description:* ${command.config.description}`
            )
        }
    }
}
                    
