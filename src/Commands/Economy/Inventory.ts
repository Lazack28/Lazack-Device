import { BaseCommand, Command, Message } from '../../Structures';

@Command('inventory', {
    category: 'economy',
    description: 'View user inventory',
    usage: 'inventory',
    aliases: ['inv']
})
export default class InventoryCommand extends BaseCommand {
    override execute = async (M: Message): Promise<void> => {
        const inventoryText = `🎒 *Inventory*\n\n` +
            `🎴 *ID:*\n` +
            `\t🏮 *Username:*\n` +
            `\t🪄 *Tag:*\n\n` +
            `*>>* 💰 *Gold:*\n` +
            `*>>* 🍀 *Total Pokemon:*\n` +
            `*>>* 🔗 *Total Items:*\n` +
            `*>>* 🃏 *Cards:*`;

        return void (await this.client.sendMessage(M.from, { text: inventoryText }, { quoted: M.message }));
    };
}
