import "node-fetch";
import _0x24c236 from "yt-search";
import _0x44bde from "axios";
import _0x2e2362 from "../lib/ytmp33.js";
let enviando = false;
const handler = async (_0x37f0a2, {
  text: _0x4c076e,
  conn: _0x17c77a,
  args: _0x30d56e,
  usedPrefix: _0x441600,
  command: _0x334b30
}) => {
  if (!_0x30d56e[0]) {
    throw "Please provide a YouTube URL or index.";
  }
  if (enviando) {
    return;
  }
  enviando = true;
  let _0x453670 = '';
  if (_0x30d56e[0].includes("youtube.com") || _0x30d56e[0].includes("youtu.be")) {
    _0x453670 = _0x30d56e[0];
  } else {
    const _0x4ff49f = parseInt(_0x30d56e[0]) - 1;
    if (_0x4ff49f >= 0) {
      const _0x47c967 = global.videoList?.["find"](_0x416b42 => _0x416b42.from === _0x37f0a2.sender);
      if (_0x47c967 && _0x4ff49f < _0x47c967.urls.length) {
        _0x453670 = _0x47c967.urls[_0x4ff49f];
      } else {
        enviando = false;
        throw "Invalid index or no URLs found. You have " + (_0x47c967?.["urls"]["length"] || 0) + " URLs.";
      }
    } else {
      enviando = false;
      throw "Invalid index.";
    }
  }
  let _0x21e238 = global.wait;
  const _0x659d3e = {
    text: _0x21e238
  };
  const {
    key: _0x2029ef
  } = await _0x17c77a.sendMessage(_0x37f0a2.chat, _0x659d3e, {
    "quoted": _0x37f0a2
  });
  try {
    const {
      status: _0x35324c,
      resultados: _0x435322,
      error: _0x34e0f0
    } = await _0x2e2362(_0x453670);
    if (!_0x35324c) {
      throw new Error(_0x34e0f0);
    }
    const _0x67bc29 = await getBuffer(_0x435322.descargar);
    const _0x472be5 = (_0x67bc29.byteLength / 1024 / 1024).toFixed(2);
    const _0x504070 = _0x435322.titulo;
    const _0x5e3000 = {
      document: _0x67bc29,
      caption: "Title: " + _0x504070 + "\nSize: " + _0x472be5 + " MB",
      fileName: _0x504070 + ".mp3",
      mimetype: "audio/mpeg"
    };
    await _0x17c77a.sendMessage(_0x37f0a2.chat, _0x5e3000, {
      "quoted": _0x37f0a2
    });
    const _0x3dbc0e = {
      text: "Download completed successfully.",
      edit: _0x2029ef
    };
    await _0x17c77a.sendMessage(_0x37f0a2.chat, _0x3dbc0e, {
      "quoted": _0x37f0a2
    });
  } catch (_0xf71a1) {
    try {
      const _0xf0c817 = await _0x24c236(_0x453670);
      const _0x4e9a3f = global.MyApiRestBaseUrl + "/api/v1/ytmp3?url=" + _0xf0c817.all[0].url + "&apikey=" + global.MyApiRestApikey;
      const _0x27731c = await getBuffer(_0x4e9a3f);
      const _0x2f8c44 = (_0x27731c.byteLength / 1024 / 1024).toFixed(2);
      const _0x53e38b = _0xf0c817.all[0].title;
      const _0x390e46 = {
        document: _0x27731c,
        caption: "Title: " + _0x53e38b + "\nSize: " + _0x2f8c44 + " MB",
        fileName: _0x53e38b + ".mp3",
        mimetype: "audio/mpeg"
      };
      await _0x17c77a.sendMessage(_0x37f0a2.chat, _0x390e46, {
        "quoted": _0x37f0a2
      });
      const _0x3001a2 = {
        text: "Download completed successfully.",
        edit: _0x2029ef
      };
      await _0x17c77a.sendMessage(_0x37f0a2.chat, _0x3001a2, {
        "quoted": _0x37f0a2
      });
    } catch (_0x536f34) {
      try {
        const _0x35bdcf = await _0x24c236(_0x453670);
        const _0x13be47 = global.MyApiRestBaseUrl + "/api/v2/ytmp3?url=" + _0x35bdcf.all[0].url + "&apikey=" + global.MyApiRestApikey;
        const _0x3d2def = await getBuffer(_0x13be47);
        const _0x54eb27 = (_0x3d2def.byteLength / 1024 / 1024).toFixed(2);
        const _0x199fd4 = _0x35bdcf.all[0].title;
        const _0x2d8992 = {
          document: _0x3d2def,
          caption: "Title: " + _0x199fd4 + "\nSize: " + _0x54eb27 + " MB",
          fileName: _0x199fd4 + ".mp3",
          mimetype: "audio/mpeg"
        };
        await _0x17c77a.sendMessage(_0x37f0a2.chat, _0x2d8992, {
          "quoted": _0x37f0a2
        });
        const _0x44f1dc = {
          text: "Download completed successfully.",
          edit: _0x2029ef
        };
        await _0x17c77a.sendMessage(_0x37f0a2.chat, _0x44f1dc, {
          "quoted": _0x37f0a2
        });
      } catch (_0x255579) {
        const _0x2e5d83 = {
          text: "An error occurred. Please try again later.",
          edit: _0x2029ef
        };
        await _0x17c77a.sendMessage(_0x37f0a2.chat, _0x2e5d83, {
          "quoted": _0x37f0a2
        });
      }
    }
  } finally {
    enviando = false;
  }
};
handler.command = /^(ytadoc)$/i;
export default handler;
const getBuffer = async (_0x16bd3a, _0x56b373) => {
  try {
    const _0x1ddf15 = {
      DNT: 0x1,
      "Upgrade-Insecure-Request": 0x1
    };
    const _0x31b222 = {
      "method": "get",
      "url": _0x16bd3a,
      "headers": _0x1ddf15,
      "responseType": "arraybuffer",
      ..._0x56b373
    };
    const _0x3118a6 = await _0x44bde(_0x31b222);
    return _0x3118a6.data;
  } catch (_0xd59547) {
    console.error("Error fetching buffer: " + _0xd59547);
  }
};