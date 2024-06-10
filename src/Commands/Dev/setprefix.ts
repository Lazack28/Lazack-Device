import { BaseCommand, Message, Command } from '../../Structures'
import { IArgs } from '../../Types'

@Command('setprefix', {
    description: 'Will replace the old prefix with the given term',
    category: 'dev',
    dm: true,
    usage: `setprefix [new_prefix]`,
    exp: 5000
})
export default class extends BaseCommand {
    public override execute = async (
    M: Message,
    { context }: IArgs
  ): Promise<void> => {
    const newprefix = context.trim().split(" ")[0].toLowerCase();
    if (!newprefix)
      return void (await M.reply(
        `Please provide the new prefix.\n\n*Example: ${this.client.config.prefix}setprefix $`
      ));
    this.client.config.prefix = newprefix;
    const text = `*🚥Status:*\n\n✅Successfully changed the prefix to *"${newprefix}"*`;
    M.reply(text);
  };
}
