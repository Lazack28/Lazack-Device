import { Quiz } from 'anime-quiz'
import { Command, BaseCommand, Message } from '../../Structures'

@Command('quiz', {
    description: 'starts a quiz',
    exp: 10,
    cooldown: 60,
    category: 'games',
    usage: 'quiz'
})
export default class extends BaseCommand {
    public override execute = async (M: Message): Promise<void> => {
        if (this.handler.quiz.quizResponse.has(M.from)) return void M.reply(`There's a quiz ongoing in this group. Use ${this.client.config.prefix}forfeit to forfeit the quiz.`)
        const quiz = new Quiz().getRandom()
        this.handler.quiz.creator.set(M.from, M.sender.jid)
        this.handler.quiz.quizResponse.set(M.from, quiz)
        this.handler.quiz.failed.set(M.from, [])
        let text = ''
        text += `🎀 *Question: ${quiz.question}*\n\n`
        for (let i = 0; i < quiz.options.length; i++) text += `*${i + 1}) ${quiz.options[i]}*\n`
        text += `\n🧧 *Use ${this.client.config.prefix}answer <option_number> to answer this question.*`
        text += `\n\n📒 *Note: You only have 60 seconds to answer.*`
        await M.reply(text)
        setTimeout(async () => {
            const res = this.handler.quiz.quizResponse.get(M.from)
            if (!res) return void null
            for (const key in this.handler.quiz) this.handler.quiz[key as 'quizResponse'].delete(M.from)
            return void M.reply(
                `🕕 Timed out! The correct answer was *${res.options.indexOf(res.answer)}) ${res.answer}.*`
            )
        }, 60 * 1000)
    }
}

