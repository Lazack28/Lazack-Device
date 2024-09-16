import axios from 'axios';
import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
const gptApiBaseUrl = 'https://chatgpt.apinepdev.workers.dev/?question=';

const gptResponse = async (m, Fox) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['gpt', 'ai'];

  if (validCommands.includes(cmd)) {
    if (!text) return m.reply('Please provide a question.');

    try {
      await m.React('🕘');

      const apiUrl = `${gptApiBaseUrl}${encodeURIComponent(text)}`;
      const response = await axios.get(apiUrl);
      const result = response.data;

      if (result && result.answer) {
        const answer = result.answer;
        
        // Check if the answer contains code
        const codeMatch = answer.match(/```([\s\S]*?)```/);
        
        if (codeMatch) {
          const code = codeMatch[1];
          
          let msg = generateWAMessageFromContent(m.from, {
            viewOnceMessage: {
              message: {
                messageContextInfo: {
                  deviceListMetadata: {},
                  deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                  body: proto.Message.InteractiveMessage.Body.create({
                    text: answer
                  }),
                  footer: proto.Message.InteractiveMessage.Footer.create({
                    text: "> ©ʀᴇᴅ-ꜰᴏx-ᴍᴅ"
                  }),
                  header: proto.Message.InteractiveMessage.Header.create({
                    title: "",
                    subtitle: "",
                    hasMediaAttachment: false
                  }),
                  nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                    buttons: [
                      {
                        name: "cta_copy",
                        buttonParamsJson: JSON.stringify({
                          display_text: "Copy Your Code",
                          id: "copy_code",
                          copy_code: code
                        })
                      }
                    ]
                  })
                })
              }
            }
          }, {});

          await Fox.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
          });
        } else {
          await Fox.sendMessage(m.from, { text: answer }, { quoted: m });
        }

        await m.React('✅');
      } else {
        throw new Error('Invalid response from the GPT API.');
      }
    } catch (error) {
      console.error('Error getting GPT response:', error.message);
      m.reply('Error getting response from GPT.');
      await m.React('❌');
    }
  }
};

export default gptResponse;
