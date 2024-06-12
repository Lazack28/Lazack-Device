const { command, isPrivate } = require("../../lib");

command(
  {
    pattern: "button",
    fromMe: true,
    desc: "send a button message",
    usage: "#button",
    type: "message",
  },
  async (message, match, m) => {
    let data = {
      jid: message.jid,
      button: [
        {
          type: "list",
          params: {
            title: "Button 1",
            sections: [
              {
                title: "Button 1",
                rows: [
                  {
                    header: "title",
                    title: "Button 1",
                    description: "Description 1",
                    id: "#menu",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "reply",
          params: {
            display_text: "MENU",
            id: "#menu",
          },
        },
        {
          type: "url",
          params: {
            display_text: "Neeraj-x0",
            url: "https://www.neerajx0.xyz/",
            merchant_url: "https://www.neerajx0.xyz/",
          },
        },
        {
          type: "address",
          params: {
            display_text: "Address",
            id: "message",
          },
        },
        {
          type: "location",
          params: {},
        },
        {
          type: "copy",
          params: {
            display_text: "copy",
            id: "123456789",
            copy_code: "message",
          },
        },
        {
          type: "call",
          params: {
            display_text: "Call",
            phone_number: "123456789",
          },
        },
      ],
      header: {
        title: "X-Asena",
        subtitle: "WhatsApp Bot",
        hasMediaAttachment: false,
      },
      footer: {
        text: "Interactive Native Flow Message",
      },
      body: {
        text: "Interactive Message",
      },
    };
    return await message.sendMessage(message.jid, data, {}, "interactive");
  }
);
