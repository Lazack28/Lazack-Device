import { IArgs, ICommand } from '../../Types'
import { Client, Message } from '../'
import { MessageHandler } from '../../Handlers'

export class BaseCommand {
    constructor(public name: string, public config: ICommand['config']) {}

    public execute = async (M: Message, args: IArgs): Promise<void | never> => {
        throw new Error('Command method not implemented')
    }

    public client!: Client

    public handler!: MessageHandler
}
