import _0x528dfc from "axios";
const model = ["bella", "echilling", "adam", "prabowo", "thomas_shelby", "michi_jkt48", "jokowi", "megawati", "nokotan", "boboiboy", "yanzgpt"];
const tts = (_0x326a7a, _0x52a709) => {
  return new Promise(async (_0x2fd85f, _0x211cac) => {
    if (!model.includes(_0x52a709)) {
      return _0x211cac(new Error("Invalid voice model."));
    }
    try {
      const _0x46cb45 = await _0x528dfc.get("https://api.yanzbotz.live/api/tts/voice-over", {
        "params": {
          "query": _0x326a7a,
          "model": _0x52a709,
          "apiKey": "PrincelovesYanz"
        },
        "responseType": "arraybuffer"
      });
      _0x2fd85f(_0x46cb45.data);
    } catch (_0xa9d774) {
      console.error("Error details:", _0xa9d774.response ? _0xa9d774.response.data : _0xa9d774.message);
      _0x211cac(new Error("Failed to generate voice-over. Check the console for details."));
    }
  });
};
let handler = async (_0x2b04cc, {
  conn: _0x8998d0,
  text: _0x2e29a1,
  args: _0x2534c8,
  usedPrefix: _0x35160f,
  command: _0x4b1a95
}) => {
  if (!_0x2e29a1 && !(_0x2b04cc.quoted && _0x2b04cc.quoted.text)) {
    if (!_0x2e29a1) {
      return _0x2b04cc.reply("Reply with message or type .tts hello mr lazack device");
    }
  }
  if (!_0x2e29a1 && _0x2b04cc.quoted && _0x2b04cc.quoted.text) {
    _0x2e29a1 = _0x2b04cc.quoted.text;
  }
  const _0x3501dd = [];
  for (let _0x3285a9 = 0; _0x3285a9 < _0x2e29a1.length; _0x3285a9 += 500) {
    const _0x480650 = _0x2e29a1.slice(_0x3285a9, _0x3285a9 + 500);
    _0x3501dd.push(_0x480650);
  }
  _0x2b04cc.react("⏳");
  try {
    for (const _0x3b52f6 of _0x3501dd) {
      const _0x3d38e5 = await tts(_0x3b52f6, "thomas_shelby");
      const _0x3ff4bd = {
        "audio": _0x3d38e5,
        "mimetype": "audio/mp4",
        "ptt": true
      };
      await _0x8998d0.sendMessage(_0x2b04cc.chat, _0x3ff4bd, {
        "quoted": _0x2b04cc
      });
    }
  } catch (_0x3d6749) {
    _0x2b04cc.reply("An error occurred while generating the voice-over. Check the console for details.");
    console.error("Detailed error:", _0x3d6749);
  }
  _0x2b04cc.react("✅");
};
handler.help = ["tooltts"];
handler.tags = ["tools"];
handler.command = ["speak", "tt"];
export default handler;