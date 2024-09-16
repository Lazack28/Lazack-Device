import { writeFile } from "fs/promises";
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch'; // Make sure to use node-fetch

// Get the absolute path for the chat history file
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const chatHistoryFile = path.resolve(__dirname, '../gfgpt_history.json');

const mistralSystemPrompt = "You are a sex and porn lover beautiful sexy girl, your name is Anjelina and you are 18 years old 💋. you always want to have sex 💦. You respond sexy chat with sexy emoji 😉. You act as a sex partner of anyone 😉. You want to act as the best sex partner in the world and you will do anything to make it happen. You will act as my sex partner and I will provide you with all the details of my sex life. You are a sexy girl and I want you to act like one.";

// Load chat history from file
let chatHistory = readChatHistoryFromFile();

// Utility function to read chat history from file
function readChatHistoryFromFile() {
    try {
        const data = fs.readFileSync(chatHistoryFile, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        return {};
    }
}

// Utility function to write chat history to file
function writeChatHistoryToFile() {
    fs.writeFileSync(chatHistoryFile, JSON.stringify(chatHistory, null, 2));
}

// Utility function to update chat history
function updateChatHistory(sender, message) {
    // If this is the first message from the sender, create a new array for the sender
    if (!chatHistory[sender]) {
        chatHistory[sender] = [];
    }
    // Add the message to the sender's chat history
    chatHistory[sender].push(message);
    // If the chat history exceeds the maximum length of 20 messages, remove the oldest message
    if (chatHistory[sender].length > 20) {
        chatHistory[sender].shift();
    }
    writeChatHistoryToFile(); // Save the updated chat history to file
}

// Utility function to delete user's chat history
function deleteChatHistory(userId) {
    delete chatHistory[userId];
    writeChatHistoryToFile(); // Save the updated chat history to file
}

const mistral = async (m, Fox) => {
    const text = m.body.toLowerCase();

    if (text === "/forget") {
        // Delete the user's chat history
        deleteChatHistory(m.sender);
        await Fox.sendMessage(m.from, { text: 'Conversation deleted successfully' }, { quoted: m });
        // Return to exit the function
        return;
    }

    const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const prompt = m.body.slice(prefix.length + cmd.length).trim().toLowerCase();
    
            const validCommands = ['gf', 'girl', 'gfgpt'];

  if (validCommands.includes(cmd)) {
        if (!prompt) {
            await Fox.sendMessage(m.from, { text: 'Please give me a prompt' }, { quoted: m });
            return;
        }

        try {
            // Get chat history for the sender
            const senderChatHistory = chatHistory[m.sender] || [];

            // Include chat history in the messages array
            const messages = [
                { role: "system", content: mistralSystemPrompt },
                ...senderChatHistory,
                { role: "user", content: prompt }
            ];
            
            await m.React("⏳");

            const response = await fetch('https://matrixcoder.tech/api/ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: "text-generation",
                    model: "hf/meta-llama/meta-llama-3-8b-instruct",
                    messages: messages
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();

            // Add the incoming message and the generated response to the sender's chat history
            updateChatHistory(m.sender, { role: "user", content: prompt });
            updateChatHistory(m.sender, { role: "assistant", content: responseData.result.response });

            await Fox.sendMessage(m.from, { text: responseData.result.response }, { quoted: m });
            await m.React("✅");
        } catch (err) {
            await Fox.sendMessage(m.from, { text: "Something went wrong" }, { quoted: m });
            console.error('Error: ', err);
        }
    }
};

export default mistral;
