import { proto } from '@whiskeysockets/baileys'
import { Message, BaseCommand, Command } from '../../Structures'
import { IArgs, GroupFeatures } from '../../Types'

@Command('enable', {
    description: 'Enables/Disables a certain group feature',
    usage: 'set',
    aliases: ['feature', 'en', 'set'],
    cooldown: 2,
    category: 'moderation',
    exp: 25
})
export default class extends BaseCommand {
    public override execute = async (M: Message, { flags }: IArgs): Promise<void> => {
        const features = Object.keys(GroupFeatures) as (keyof typeof GroupFeatures)[]
        if (!flags.length) {
            let text = '🍁 *Available Features*'
            for (const feature of features) {
                text += `\n\n*Feature:* ${this.client.utils.capitalize(feature)} \n*Description:* ${
                    GroupFeatures[feature]
                }`
            }
            return void M.reply(text, 'text')
        } else {
            const options = flags[0].trim().toLowerCase().split('=')
            const feature = options[0].replace('--', '') as keyof typeof GroupFeatures
            const actions = ['true', 'false']
            if (!features.includes(feature))
                return void M.reply(
                    `Invalid feature bitch. Use *${this.client.config.prefix}set* to see all of the available features`
                )
            const action = options[1]
            if (!action || !actions.includes(action))
                return void M.reply(
                    `${
                        action
                            ? `Invalid option. It should be one of them: *${actions
                                  .map(this.client.utils.capitalize)
                                  .join(', ')}*.`
                            : `Provide the option to be set of this feature.`
                    } Example: *${this.client.config.prefix}set --${feature}=true*`
                )
            const data = await this.client.DB.getGroup(M.from)
            if ((action === 'true' && data[feature]) || (action === 'false' && !data[feature]))
                return void M.reply(
                    `⚠️ *${this.client.utils.capitalize(feature)} is already ${
                        action === 'true' ? 'Enabled' : 'Disabled'
                    }*`
                )
            await this.client.DB.updateGroup(M.from, feature, action === 'true')
            return void M.reply(
                `${action === 'true' ? '🟢' : '🔴'} *${this.client.utils.capitalize(feature)} is now ${
                    action === 'true' ? 'Enabled' : 'Disabled'
                }*`
            )
        }
    }
}
