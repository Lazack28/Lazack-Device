import { IArgs } from '.'
import { Client, Message } from '../Structures'
import { MessageHandler } from '../Handlers'

export interface ICommand {
    /**Name of the command */
    name: string
    /**The client of WhatsApp */
    client: Client
    /**Handler of message */
    handler: MessageHandler
    /**Configuration of the command */
    config: ICommandConfig
    /**Method for executing the command */
    execute(M: Message, args: IArgs): Promise<void | never>
}

interface ICommandConfig {
    /**Description of the command */
    description: string
    /**An example on how the command should be used */
    usage: string
    /**Category of the command */
    category: TCategory
    /**Aliases of the command */
    aliases?: string[]
    /**Experience to be gained by using this command */
    exp?: number
    /**Can be used in dm? */
    dm?: boolean
    /**Cooldown of the command */
    cooldown?: number
    adminRequired?: boolean
}

export type TCategory =
    | 'fun'
    | 'games'
    | 'porn'
    | 'utils'
    | 'bot'
    | 'anime'
    | 'economy'
    | 'cards'
    | 'pokemon'
    | 'general'
    | 'media'
    | 'characters'
    | 'moderation'
    | 'educative'
    | 'dev'
    | 'coding'
