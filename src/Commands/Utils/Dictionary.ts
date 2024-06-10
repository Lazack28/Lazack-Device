import { BaseCommand, Message, Command } from '../../Structures';
import { IArgs } from '../../Types';
import axios, { AxiosResponse } from 'axios';

interface DictionaryDefinition {
    definition: string;
    example?: string;
}

@Command('dictionary', {
    aliases: ['dict'],
    description: 'Search for the definition of a word',
    category: 'utils',
    usage: 'dictionary [word]',
    exp: 10,
    dm: true
})
export default class DictionaryCommand extends BaseCommand {
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        if (!context) return void M.reply('📚 Please provide a word to search for');
        const word: string = context.trim().toLowerCase();
        try {
            const res: AxiosResponse<any> = await axios.get(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
            );
            if (res.status !== 200) return void M.reply(`📚 Error: ${res.status}`);
            const data: any[] = res.data;
            if (data.length === 0) return void M.reply(`📚 No definitions found for '${word}'`);
            let result: string = '';
            data.forEach((entry, index) => {
                const definitions: DictionaryDefinition[] = entry.meanings[0].definitions;
                result += `Definitions for *${word}* (${entry.phonetic || 'No pronunciation available'}):\n`;
                definitions.forEach((definitionObj) => {
                    result += `- ${definitionObj.definition}`;
                    if (definitionObj.example) result += `\n  Example: ${definitionObj.example}`;
                    result += '\n';
                });
            });
            return void M.reply(`📚 Definitions for *${word}*\n\n${result}`);
        } catch (err) {
            M.reply(`📚 Error: ${err}`);
        }
    }
              } 
