let handler = async (m, { conn }) => {
    let vcard = `
  BEGIN:VCARD
  VERSION:3.0
  N:;Lazack;;;
  FN:Lazack
  ORG:Lazack
  TITLE:
  TEL;waid=255734980103:255734980103
  X-ABLabel:Lazack
  X-WA-BIZ-DESCRIPTION:
  X-WA-BIZ-NAME:Lazack
  END:VCARD
    `.trim();
  
    await conn.sendMessage(
      m.chat,
      {
        contacts: {
          displayName: "LAZACK_28",
          contacts: [{ vcard }],
        },
      },
      { quoted: m }
    );
  };
  
  handler.help = ["owner"];
  handler.tags = ["main"];
  handler.command = ["owner", "creator", "creador", "dueño"];
  
  export default handler;
  
