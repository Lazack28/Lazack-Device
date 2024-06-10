import { format, LiteralUnion, BuiltInParserName } from 'prettier'
import { Command, BaseCommand, Message } from '../../Structures'
import { IArgs } from '../../Types'

const supportedLang = ['json', 'ts', 'js', 'css', 'md', 'yaml', 'html']

@Command('prettier', {
    description: 'Runs prettier of the given code',
    category: 'utils',
    exp: 50,
    cooldown: 15,
    usage: `prettier --lang[${supportedLang.join(', ')}] [provide/quote the message containing the code]`,
    aliases: ['format']
})
export default class extends BaseCommand {
    public override execute = async (M: Message, { flags, context }: IArgs): Promise<void> => {
        flags.forEach((flag) => (context = context.replace(flag, '')))
        if (!context && (!M.quoted || M.quoted.content === ''))
            return void M.reply(
                `Provide or quote a message containing the code that you want to run prettier along with the language and options. Example: *${this.client.config.prefix}prettier --lang=ts --no-semi --single-quote *[quotes a message containing the code]**`
            )
        const langFlag = flags.filter((flag) => flag.startsWith('--lang=') || flag.startsWith('--language='))[0]
        let lang = 'js'
        if (langFlag) lang = langFlag.split('=')[1]
        const parser = this.getParserFromLanguage(lang)
        try {
            const formattedCode = format(context || (M.quoted?.content as string), {
                parser,
                semi: parser !== 'babel' && parser !== 'babel-ts',
                singleQuote: parser !== 'babel' && parser !== 'babel-ts'
            })
            return void (await M.reply(`\`\`\`${formattedCode}\`\`\``))
        } catch (error) {
            await M.reply(`${(error as any).message}`)
            return void (await M.reply(
                `If the code's not wrong, try changing the languages to: \`\`\`${supportedLang.join(', ')}\`\`\``
            ))
        }
    }

    private getParserFromLanguage = (lang: string): LiteralUnion<BuiltInParserName, string> => {
        let parser
        switch (lang.toLowerCase().trim()) {
            default:
            case 'js':
            case 'javascript':
                parser = 'babel'
                break
            case 'css':
                parser = 'css'
                break
            case 'html':
                parser = 'html'
                break
            case 'json':
                parser = 'json'
                break
            case 'ts':
            case 'typescript':
                parser = 'babel-ts'
                break
            case 'md':
            case 'markdown':
                parser = 'markdown'
                break
            case 'yaml':
                parser = 'markdown'
                break
        }
        return parser
    }
}
