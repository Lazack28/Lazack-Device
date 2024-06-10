import { BaseCommand, Command, Message } from '../../Structures';

// Define a custom interface for the message structure
interface CustomMessage {
    message: {
        conversation?: string;
        extendedTextMessage?: {
            text: string;
        };
        imageMessage?: {
            caption: string;
        };
    };
}

interface CustomMessageContent {
    text: string;
    footer: string;
    headerType?: number;
}

@Command('report', {
    aliases: ['bug'],
    description: 'Send message to mods, report an issue, or give advice',
    usage: '#report <your_message>',
    category: 'core',
    cooldown: 200
})
export default class ReportCommand extends BaseCommand {
    public override execute = async ({ from, sender, message }: Message): Promise<void> => {
        // Cast message to CustomMessage
        const customMessage = message as unknown as CustomMessage;

        // Extract text from message content
        const text = this.getMessageText(customMessage);
        const args = text.trim().split(/\s+/).slice(1); // Split message text and remove the command part

        if (!args.length) {
            return void (await this.client.sendMessage(sender.jid, { text: 'Please provide a message to report.' }, { quoted: message }));
        }

        const reportText = args.join(' ');
        const supportText = `*━━━❰ 𝐑𝐄𝐏𝐎𝐑𝐓 ❱━━━*\n\n
        *From:* ${sender.username}\n
        *Message:* ${reportText}\n
        *©Mircus-md Inc*`;

        const footerText = '© Mircus-md Inc 2024';

        const messageContent: CustomMessageContent = {
            text: supportText,
            footer: footerText,
            headerType: 1
        };

        // Send the report message to the mods' group
        const modsGroupJID = '120363288185277676@g.us';
        await this.sendDirectMessage(modsGroupJID, messageContent, { quoted: message });

        // Acknowledge receipt to the sender
        return void (await this.client.sendMessage(sender.jid, { text: 'Your report has been sent to the moderators.' }, { quoted: message }));
    }

    private getMessageText(message: CustomMessage): string {
        // Handle different possible structures of the message object
        return message.message.conversation
            || message.message.extendedTextMessage?.text
            || message.message.imageMessage?.caption
            || '';
    }

    private async sendDirectMessage(userJID: string, content: CustomMessageContent, options: any): Promise<void> {
        try {
            // Send the message to the specified JID
            await this.client.sendMessage(userJID, content, options);
        } catch (error) {
            console.error('Error sending direct message:', error);
        }
    }
}
