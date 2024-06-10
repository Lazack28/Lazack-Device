import { BaseCommand, Command, Message } from '../../Structures'

@Command('answer', {
    description: 'answer',
    aliases: ['ans'],
    usage: 'answer',
    exp: 10,
    cooldown: 15,
    category: 'games'
})
export default class extends BaseCommand {
    public override execute = async (M: Message): Promise<void> => {
        const res = this.handler.quiz.quizResponse.get(M.from)
        if (!res) return void M.reply(`There's no quiz ongoing in this group.`)
        const arr = this.handler.quiz.failed.get(M.from) as string[]
        if (arr.includes(M.sender.jid))
            return void M.reply(`You have recently attempted to answer this question, give it a break.`)
        if (!M.numbers.length) return void M.reply(`Provide the option number, Baka!`)
        const c = res.options.indexOf(res.answer) + 1
        if (c !== M.numbers[0]) {
            arr.push(M.sender.jid)
            this.handler.quiz.failed.set(M.from, arr)
            return void M.reply(`✖️ Wrong guess.`)
        }
        const exp = Math.floor(Math.random() * 251)
        await this.client.DB.setExp(M.sender.jid, exp)
        return void M.reply(`🎉 Correct answer. You have earned *${exp} experience*.`)
    }
}
