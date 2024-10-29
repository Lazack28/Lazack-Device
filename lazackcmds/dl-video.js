import _0x3ff4d8 from "axios";
import _0x143e77 from "yt-search";
import "fs";
const handler = async (_0x3344f7, {
  conn: _0xc5a0ab,
  command: _0x30cb53,
  args: _0x499273,
  usedPrefix: _0x323a4c
}) => {
  if (!_0x499273[0] && _0x3344f7.quoted && _0x3344f7.quoted.text) {
    _0x499273[0] = _0x3344f7.quoted.text;
  }
  if (!_0x499273[0] && !_0x3344f7.quoted) {
    throw  "*" + _0x323a4c + _0x30cb53 + "* You must provide a valid URL.";
  }
  try {
    _0x3344f7.react("⏳");
    const _0x1b996a = _0x499273[0];
    let _0x2f3d7b;
    if (_0x1b996a.includes("youtube.com") || _0x1b996a.includes("youtu.be")) {
      const _0x466c91 = {
        url: _0x1b996a
      };
      _0x2f3d7b = [_0x466c91];
    } else {
      _0x2f3d7b = await search(_0x1b996a);
    }
    switch (_0x30cb53) {
      case "v360":
        await handleResolution(_0x3344f7, _0xc5a0ab, _0x2f3d7b[0].url, "360p");
        break;
      case "v480":
        await handleResolution(_0x3344f7, _0xc5a0ab, _0x2f3d7b[0].url, "480p");
        break;
      case "v720":
        await handleResolution(_0x3344f7, _0xc5a0ab, _0x2f3d7b[0].url, "720p");
        break;
      case "v1080":
        await handleResolution(_0x3344f7, _0xc5a0ab, _0x2f3d7b[0].url, "1080p");
        break;
      default:
        throw "Command " + _0x30cb53 + " is not supported.";
    }
  } catch (_0x5b75db) {
    console.log(_0x5b75db);
    const _0x475013 = {
      text: "An error occurred. Please try again later."
    };
    await _0xc5a0ab.sendMessage(_0x3344f7.chat, _0x475013, {
      "quoted": _0x3344f7
    });
  }
};
const handleResolution = async (_0x59c67f, _0x2ed950, _0x90bf12, _0x12fd32) => {
  try {
    _0x59c67f.react("⏳");
    console.log("Fetching video from URL: " + _0x90bf12 + " with resolution: " + _0x12fd32);
    const _0x4d0170 = "https://api.yanzbotz.live/api/downloader/ytmp4?url=" + _0x90bf12 + "&apiKey=" + "PrincelovesYanz";
    console.log("Requesting: " + _0x4d0170);
    const _0x41e930 = await _0x3ff4d8.get(_0x4d0170);
    console.log("API Response:", _0x41e930.data);
    if (_0x41e930.data && _0x41e930.data.result && _0x41e930.data.result.downloadLinks) {
      const _0x2a6f46 = _0x41e930.data.result.downloadLinks.find(_0x3e66f7 => _0x3e66f7.quality.includes(_0x12fd32)).url;
      const _0x5d444b = _0x41e930.data.result.title || "Downloaded Video";
      const _0x545dae = await getBuffer(_0x2a6f46);
      const _0x3a5500 = _0x545dae.byteLength;
      const _0x392864 = _0x3a5500 / 1024;
      const _0x509351 = _0x392864 / 1024;
      const _0x154393 = _0x509351.toFixed(2);
      console.log("Downloaded video size: " + _0x154393 + " MB");
      if (_0x154393 >= 400) {
        const _0x1f443b = {
          text: '' + _0x2a6f46
        };
        await _0x2ed950.sendMessage(_0x59c67f.chat, _0x1f443b, {
          "quoted": _0x59c67f
        });
      } else {
        if (_0x154393 >= 100 && _0x154393 <= 400) {
          const _0x26cdc6 = {
            document: _0x545dae,
            mimetype: "video/mp4",
            fileName: _0x5d444b + ".mp4"
          };
          await _0x2ed950.sendMessage(_0x59c67f.chat, _0x26cdc6, {
            "quoted": _0x59c67f
          });
        } else {
          _0x59c67f.react("✅");
          const _0x2ea032 = {
            video: _0x545dae,
            mimetype: "video/mp4",
            fileName: _0x5d444b + ".mp4",
            caption: '' + _0x5d444b
          };
          await _0x2ed950.sendMessage(_0x59c67f.chat, _0x2ea032, {
            "quoted": _0x59c67f
          });
        }
      }
    } else {
      throw new Error("Invalid API response or missing download URL");
    }
  } catch (_0x277ff3) {
    console.error("Error in handleResolution:", _0x277ff3.response ? _0x277ff3.response.data : _0x277ff3.message);
    const _0x317b8a = {
      text: "Failed to download the video. Please try again later."
    };
    await _0x2ed950.sendMessage(_0x59c67f.chat, _0x317b8a, {
      "quoted": _0x59c67f
    });
  }
};
handler.help = ["video"].map(_0x4964eb => _0x4964eb + " < query >");
handler.tags = ["downloader"];
handler.command = ["v360", "v480", "v720", "v1080"];
export default handler;
async function search(_0x56aec0, _0x5c1228 = {}) {
  const _0x123943 = {
    "query": _0x56aec0,
    "hl": "es",
    "gl": "ES",
    ..._0x5c1228
  };
  const _0x3f050d = await _0x143e77.search(_0x123943);
  return _0x3f050d.videos;
}
const getBuffer = async (_0x110a4e, _0x27e2b2) => {
  if (_0x27e2b2) {
    _0x27e2b2;
  } else {
    ({});
  }
  const _0x21f520 = {
    DNT: 0x1,
    "Upgrade-Insecure-Requests": 0x1
  };
  const _0x4f5c2c = await _0x3ff4d8({
    "method": "get",
    "url": _0x110a4e,
    "headers": _0x21f520,
    ..._0x27e2b2,
    "responseType": "arraybuffer"
  });
  return _0x4f5c2c.data;
};