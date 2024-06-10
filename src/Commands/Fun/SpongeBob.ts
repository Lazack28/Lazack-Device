import { BaseCommand, Command, Message } from '../../Structures'

@Command('SpongeBob', {
    description: 'Says hello to the bot',
    category: 'fun',
    usage: 'hi',
    aliases: ['bob'],
    exp: 25,
    cooldown: 5
})
export default class extends BaseCommand {
    public override execute = async ({ sender, reply }: Message): Promise<void> =>
        void (await reply(`╲┏━┳━━━━━━━━┓╲╲ 
╲┃◯┃╭┻┻╮╭┻┻╮┃╲╲ 
╲┃╮┃┃╭╮┃┃╭╮┃┃╲╲ 
╲┃╯┃┗┻┻┛┗┻┻┻┻╮╲ 
╲┃◯┃╭╮╰╯┏━━━┳╯╲ 
╲┃╭┃╰┏┳┳┳┳┓◯┃╲╲ 
╲┃╰┃◯╰┗┛┗┛╯╭┃╲╲

`))
}
