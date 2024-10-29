import _0x54a563 from "axios";
import _0x4ab9c5 from "yt-search";
import "fs";
const handler = async (_0x138596, {
  conn: _0x64e632,
  command: _0x20c5c5,
  args: _0x162ab5,
  usedPrefix: _0x3b4ade
}) => {
  if (!_0x162ab5[0] && _0x138596.quoted && _0x138596.quoted.text) {
    _0x162ab5[0] = _0x138596.quoted.text;
  }
  if (!_0x162ab5[0] && !_0x138596.quoted) {
    throw example + " *" + _0x3b4ade + _0x20c5c5 + "* You must provide a valid URL.";
  }
  try {
    _0x138596.react("⏳");
    const _0x3f88b4 = _0x162ab5[0];
    let _0x131867;
    if (_0x3f88b4.includes("youtube.com") || _0x3f88b4.includes("youtu.be")) {
      const _0x23f67b = {
        url: _0x3f88b4
      };
      _0x131867 = [_0x23f67b];
    } else {
      _0x131867 = await search(_0x3f88b4);
    }
    await handleAudio(_0x138596, _0x64e632, _0x131867[0].url);
  } catch (_0x5e90d3) {
    console.log(_0x5e90d3);
    const _0x220bbd = {
      "text": "An error occurred. Please try again later."
    };
    await _0x64e632.sendMessage(_0x138596.chat, _0x220bbd, {
      "quoted": _0x138596
    });
  }
};
const handleAudio = async (_0x3c9543, _0x31c5c0, _0x12fe24) => {
  try {
    _0x3c9543.react("⏳");
    console.log("Fetching audio from URL: " + _0x12fe24);
    const _0xfa2979 = "https://api.yanzbotz.live/api/downloader/ytmp3?url=" + _0x12fe24 + "&apiKey=" + "PrincelovesYanz";
    console.log("Requesting: " + _0xfa2979);
    const _0x5f6e86 = await _0x54a563.get(_0xfa2979);
    console.log("API Response:", _0x5f6e86.data);
    if (_0x5f6e86.data && _0x5f6e86.data.result && _0x5f6e86.data.result.downloadLinks) {
      const _0x7e0b23 = _0x5f6e86.data.result.downloadLinks[0].url;
      const _0x54f199 = _0x5f6e86.data.result.title || "Downloaded Audio";
      const _0x73f5d = await getBuffer(_0x7e0b23);
      const _0x5d690b = _0x73f5d.byteLength;
      const _0x5bee88 = _0x5d690b / 1024;
      const _0x5d3857 = _0x5bee88 / 1024;
      const _0x384fa0 = _0x5d3857.toFixed(2);
      console.log("Downloaded audio size: " + _0x384fa0 + " MB");
      if (_0x384fa0 >= 400) {
        const _0x2db923 = {
          "text": '' + _0x7e0b23
        };
        await _0x31c5c0.sendMessage(_0x3c9543.chat, _0x2db923, {
          "quoted": _0x3c9543
        });
      } else {
        if (_0x384fa0 >= 100 && _0x384fa0 <= 400) {
          const _0x4b2ad1 = {
            document: _0x73f5d,
            mimetype: "audio/mpeg",
            "fileName": _0x54f199 + ".mp3"
          };
          await _0x31c5c0.sendMessage(_0x3c9543.chat, _0x4b2ad1, {
            "quoted": _0x3c9543
          });
        } else {
          _0x3c9543.react("✅");
          const _0x4cba79 = {
            audio: _0x73f5d,
            mimetype: "audio/mpeg",
            "fileName": _0x54f199 + ".mp3",
            "caption": '' + _0x54f199
          };
          await _0x31c5c0.sendMessage(_0x3c9543.chat, _0x4cba79, {
            "quoted": _0x3c9543
          });
        }
      }
    } else {
      throw new Error("Invalid API response or missing download URL");
    }
  } catch (_0x596478) {
    console.error("Error in handleAudio:", _0x596478.response ? _0x596478.response.data : _0x596478.message);
    const _0x2d2fd5 = {
      "text": "Failed to download the audio. Please try again later."
    };
    await _0x31c5c0.sendMessage(_0x3c9543.chat, _0x2d2fd5, {
      "quoted": _0x3c9543
    });
  }
};
handler.help = ["song"].map(_0x5b112e => _0x5b112e + " < query >");
handler.tags = ["downloader"];
handler.command = ["song"];
export default handler;
async function search(_0x25b8ea, _0x2eddb9 = {}) {
  const _0x577040 = {
    "query": _0x25b8ea,
    "hl": "es",
    "gl": "ES",
    ..._0x2eddb9
  };
  const _0x21316f = await _0x4ab9c5.search(_0x577040);
  return _0x21316f.videos;
}
const getBuffer = async (_0x1a875f, _0x4de5dd) => {
  if (_0x4de5dd) {
    _0x4de5dd;
  } else {
    ({});
  }
  const _0x4337e6 = {
    DNT: 0x1,
    "Upgrade-Insecure-Requests": 0x1
  };
  const _0xf11c72 = await _0x54a563({
    "method": "get",
    "url": _0x1a875f,
    "headers": _0x4337e6,
    ..._0x4de5dd,
    "responseType": "arraybuffer"
  });
  return _0xf11c72.data;
};