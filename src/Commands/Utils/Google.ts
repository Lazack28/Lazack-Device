import { BaseCommand, Message, Command } from '../../Structures'
import { IArgs } from '../../Types'
import axios from 'axios'

@Command('google', {
    aliases: ['g', 'search'],
    description: 'Search on the web ',
    category: 'utils',
    usage: 'google [query]',
    exp: 10,
    dm: true
})
export default class extends BaseCommand {
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        if (!this.client.config.gkey) return void M.reply('No google API key set')
        if (!context) return void M.reply('🔎 Provide a search term')
        const term = context.trim()
        await axios
            .get(
                `https://www.googleapis.com/customsearch/v1?q=${term}&key=AIzaSyDjhIUN6IZb1A7OEvYuBs8OZJFZpkJey_w&cx=baf9bdb0c631236e5`
            )
            .then((res) => {
                if (res.status !== 200) return void M.reply(`🔍 Error: ${res.status}`)
                let result = ``
                let index = 1
                for (const item of res.data?.items) {
                    result += `*👾${index}.Title* : ${item.title}\n*🔗Link* : ${item.link}\n*📖Snippet* : ${item.snippet}\n\n`
                    index++
                }
                // return void M.reply(`🔍Command Used : ${Command.count} times\n Result for *${term}*\n\n\n ${result}`)
                return void M.reply(`🔍 Result for *${term}*\n\n\n ${result}`)
            })
            .catch((err) => {
                M.reply(`🔍 Error: ${err}`)
            })
    }
}
