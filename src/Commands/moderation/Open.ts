import { BaseCommand, Command, Message } from '../../Structures'

@Command('open', {
    description: 'open the group',
    category: 'moderation',
    usage: 'open',
    exp: 5,
    adminRequired: true,
    cooldown: 10
})
export default class command extends BaseCommand {
    override execute = async ({ from, reply, groupMetadata }: Message): Promise<void> => {
        if (!groupMetadata) return void reply('*Try Again!*')
        const { announce } = await this.client.groupMetadata(from)
        if (!announce) return void reply('already opened')
        return void (await this.client.groupSettingUpdate(from, 'not_announcement'))
    }
}
