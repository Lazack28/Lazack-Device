import { Rank } from 'canvacord';
import { BaseCommand, Command, Message } from '../../Structures';
import { getStats } from '../../lib'; // Import your function to get user stats here

@Command('leaderboard', {
    description: "Displays the leaderboard",
    category: 'general',
    exp: 20,
    cooldown: 10,
    aliases: ['lb'],
    usage: 'leaderboard'
})
export default class extends BaseCommand {
    public override execute = async (message: Message): Promise<void> => {
        try {
            // Fetch user data (replace with actual implementation)
            const usersData = [
                { username: "User1", level: 10, experience: 100, rank: 1 }, // Replace with actual data
                { username: "User2", level: 8, experience: 80, rank: 2 },   // Replace with actual data
                { username: "User3", level: 5, experience: 50, rank: 3 }    // Replace with actual data
            ];

            const leaderboard = await Promise.all(usersData.slice(0, 10).map(async (userData, index) => {
                // Simulated profile picture (replace with actual implementation)
                const pfp = Buffer.from('image_data'); // Replace with actual profile picture

                // Simulated user data
                const { experience, level, username } = userData;

                // Build the rank card
                return new Rank()
                    .setAvatar(pfp)
                    .setLevel(level)
                    .setCurrentXP(experience)
                    .setUsername(username)
                    .setRank(index + 1)
                    .renderEmojis(true)
                    .build();
            }));

            const leaderboardMessage = leaderboard.join('\n\n');

            await message.reply(
                leaderboardMessage,
                'image',
                undefined,
                undefined,
                `🏆 *Leaderboard*`
            );
        } catch (error) {
            console.error("An error occurred while executing the leaderboard command:", error);
            // Handle the error gracefully
        }
    }
        }
