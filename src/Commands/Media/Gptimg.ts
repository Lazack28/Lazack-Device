import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

function generateImage(prompt: string): string | null {
  return 'Simulated_Image_URL'
}

@Command('gptimg', {
  description: 'Generate pictures Chat GPT',
  category: 'media',
  usage: 'gptimg [text]',
  aliases: ['aiimg'],
  cooldown: 20,
  dm: true
})
export default class extends BaseCommand {
  public override execute = async (
    M: Message,
    { context }: IArgs
  ): Promise<void> => {
    if (!context)
      return void M.reply(
        'Enter the picture you want to generate!'
      )
    const prompt = context.trim()
    await M.reply('*Processing!!!*')
    const simulatedImgUrl = generateImage(prompt)
    if (simulatedImgUrl) {
      await M.reply(simulatedImgUrl, 'image')
    } else {
      return void M.reply('Failed to generate image!')
    }
  }
}
