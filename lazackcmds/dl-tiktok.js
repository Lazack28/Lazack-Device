const TikTok = async _0x2d5f72 => {
  try {
    const _0x12bd84 = await fetch("https://api.yanzbotz.live/api/downloader/tiktok?url=" + encodeURIComponent(_0x2d5f72) + "&apiKey=PrincelovesYanz");
    const _0x2bb533 = await _0x12bd84.json();
    return _0x2bb533.result;
  } catch (_0x3c3043) {
    console.error("Error", _0x3c3043);
    throw _0x3c3043;
  }
};
let handler = async (_0x21d369, {
  conn: _0x4506e4,
  args: _0x195d8c,
  usedPrefix: _0x275bcf,
  command: _0x319ecc
}) => {
  const _0x23ff37 = _0x195d8c[0];
  if (!_0x23ff37) {
    return _0x21d369.reply("*🟢Example*\n *.tiktok* past your link");
  }
  _0x21d369.react("⏳");
  try {
    let _0x463b35 = await TikTok(_0x23ff37);
    let _0x5143fd = _0x463b35.type;
    let _0x2c113b = "╭━━⊱𝗧𝗜𝗞𝗧𝗢𝗞 𝗗𝗟 \n";
    _0x2c113b += "🎗️ *" + mssg.type + ":* " + _0x5143fd + "\n";
    _0x2c113b += "🎗️ *" + mssg.name + ":* " + _0x463b35.name + "\n";
    _0x2c113b += "🎗️ *" + mssg.username + ":* " + _0x463b35.username + "\n";
    _0x2c113b += "🎗️ *" + mssg.views + ":* " + _0x463b35.views + "\n";
    _0x2c113b += "🎗️ *" + mssg.likes + ":* " + _0x463b35.likes + "\n";
    _0x2c113b += "🎗️ *" + mssg.comments + ":* " + _0x463b35.comments + "\n";
    _0x2c113b += "🎗️ *" + mssg.favorite + ":* " + _0x463b35.favorite + "\n";
    _0x2c113b += "🎗️ *" + mssg.shares + ":* " + _0x463b35.shares + "\n";
    _0x2c113b += "🎗️ *" + mssg.desc + ":* " + _0x463b35.description + "\n╰━━━━━━━━━━━━━━━━━";
    _0x4506e4.sendMessage(_0x21d369.chat, {
      "text": "📥 *" + mssg.media + ":* " + _0x5143fd
    }, {
      "quoted": _0x21d369
    });
    if (_0x5143fd === "image") {
      let _0xf17107 = _0x463b35.image;
      const _0x40a033 = {
        "text": _0x2c113b
      };
      _0x4506e4.sendMessage(_0x21d369.chat, _0x40a033, {
        "quoted": _0x21d369
      });
      for (let _0x22f40a = 0; _0x22f40a < _0xf17107.length; _0x22f40a++) {
        const _0xb431c8 = {
          url: _0xf17107[_0x22f40a]
        };
        await _0x4506e4.sendMessage(_0x21d369.chat, {
          "image": _0xb431c8,
          "caption": "*🎗️image:* " + (_0x22f40a + 1)
        }, {
          "quoted": _0x21d369
        });
        const _0x289ae7 = {
          "mimetype": "audio/mp4"
        };
        _0x4506e4.sendFile(_0x21d369.chat, _0x463b35.sound, "tiktok.mp3", '', _0x21d369, null, _0x289ae7);
      }
    }
    if (_0x5143fd === "video") {
      let _0x30fff4 = _0x463b35.video["no-watermark"];
      const _0x5e160b = {
        "url": _0x30fff4
      };
      const _0x253ad3 = {
        "video": _0x5e160b,
        "caption": _0x2c113b
      };
      await _0x4506e4.sendMessage(_0x21d369.chat, _0x253ad3, {
        "quoted": _0x21d369
      });
    }
  } catch (_0x4e3bf5) {
    _0x21d369.reply('' + mssg.error);
  }
  _0x21d369.react("✅");
};
handler.help = ["tiktok"];
handler.tags = ["tools"];
handler.command = /^(tiktok|tt|tiktokdl|tiktokslide|tiktoknowm|tiktokvid|ttdl)$/i;
export default handler;