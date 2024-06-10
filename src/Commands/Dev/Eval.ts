import { Command, Message, BaseCommand } from '../../Structures'
import { IArgs } from '../../Types'

@Command('eval', {
    description: 'Evaluates JavaScript',
    category: 'dev',
    usage: 'eval [JavaScript code]',
    dm: true
})
export default class extends BaseCommand {
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        let out!: string
        try {
            const result = eval(context)
            out = JSON.stringify(result, null, '\t') || 'Evaluated JavaScript'
        } catch (error) {
            out = (error as any).message
        }
        return void M.reply(out)
    }
}
