import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command('image', {
    description: 'Will search img from the given term.',
    category: 'utils',
    usage: 'image',
    aliases: ['image'],
    exp: 15,
    cooldown: 20
})
export default class extends BaseCommand {
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        if (!context) return void (await M.reply('Baka!! what image you wnt?'))
        const texas = context.trim().split('|')
        const term = texas[0]
        const amount = parseInt(texas[1])
        if (!amount)
            return void M.reply(
                `Give me the number, Baka!\n\nExample: *${this.client.config.prefix}image JFLEX og|5*`
            )
        if (amount > 20) return void M.reply(`Do you want me to spam in this group?`)
        for (let i = 0; i < amount; i++) {
            const data = await this.client.utils.fetch<string[]>(`https://weeb-api.vercel.app/gisearch?query=${texas}`)
            if (!data.length) return void (await M.reply('*404 Error! Found no Results*'))
            const buffer = await this.client.utils.getBuffer(data[Math.floor(Math.random() * data.length)])
            await M.reply(buffer, 'image').catch(() => {
                return void M.reply('An error occurred. Try again later')
            })
        }
    }
                                                                             } 
