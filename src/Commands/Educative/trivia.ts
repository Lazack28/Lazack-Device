/** @format */

import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
import axios from 'axios'

@Command('trivia', {
    aliases: ['t'],
    description: 'Gives you random question based on the level. ',
    category: 'educative',
    usage: `trivia [easy/medium/hard]`,
    cooldown: 5,
    exp: 30,
    dm: true
})
export default class extends BaseCommand {
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        if (!context) return void M.reply('Give me a level, Baka!')
        const chitoge = context.trim()
        await axios
            .get(`https://opentdb.com/api.php?amount=1&difficulty=${chitoge}&type=multiple`)
            .then((response) => {
                // console.log(response);
                const text = `🎀 *Category: ${response.data.results[0].category}*\n❄ *Difficulty: ${response.data.results[0].difficulty}*\n📒 *Question:${response.data.results[0].question}*\n\n\n🎋 *Answer: ${response.data.results[0].correct_answer}*\n `
                M.reply(text)
            })
            .catch((err) => {
                M.reply(`No such level, Baka!`)
            })
    }
}
