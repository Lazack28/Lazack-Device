import { BaseCommand, Command, Message } from '../../Structures'

@Command('leave', {
    description: 'Bot leaves the group',
    category: 'dev',
    usage: 'leave',
    cooldown: 5,
    dm: false
})
export default class extends BaseCommand {
    public override execute = async (M: Message): Promise<void> => {
        const jid = M.from
        await this.client.groupLeave(jid)
    }
}
