const { zokou } = require("../framework/zokou");

zokou({
    nomCom: "mention",
    categorie: "mods"
}, async (message, match) => {
   let msg;
   const { mention } = await getData(message.user.id);    
    if (match === 'get' && message.sudo.includes(message.sender)) {
        return await message.send(mention.message);
    } else if (match && message.sudo.includes(message.sender)) {
        if (match === "off") {
            msg = await setData(message.user.id, mention.message, "false", "mention");
        } else if (match === "on") {
            msg = await setData(message.user.id, mention.message, "true", "mention");
        } else {
            msg = await setData(message.user.id, match, "true", "mention");
        }
        
        if (msg) {
            return await message.send('_Mention Updated_');
        } else {
            return await message.send('_Error in updating_');
        }
    }
    return await message.send("_You can check the format of mention https://github.com/Lazack28/Lazack-md/wiki_");
});

zokou({
    nomCom: "autoreaction",
    categorie: "mods"
}, async (message, match) => {
    if (match === "off") {
    await setData(message.user.id, "disactie", "false", "autoreaction");
    await message.send("_*autoreaction disabled*_");
    } else if (match === "on") {
    await setData(message.user.id, "actie", "true", "autoreaction");
    await message.send("_*autoreaction enabled*_");
    } else if (!match) {
    if (message.isGroup) {
      await message.send("\nChoose one to update autoreaction\n",
                { values: [
                    { displayText: "on", id: "autoreaction on" },
                    { displayText: "off", id: "autoreaction off" }
                ],
                withPrefix: true,
                participates: [message.sender]
            }, "poll");
    } else {
        await message.reply("_*autoreaction on/off*_");
    }}
});
