import _0xa5c984 from "yt-search";
let handler = async (_0x5cc456, {
  conn: _0x2d3324,
  command: _0x1ce9ee,
  text: _0x30a24a,
  usedPrefix: _0x359e44
}) => {
  if (!_0x30a24a) {
    throw "✳️ *" + (_0x359e44 + _0x1ce9ee) + "* 𝙰𝚢𝚊𝚊 𝚑𝚊𝚒 𝚋𝚞𝚕𝚊𝚠𝚊 𝙽𝚊𝚊𝚝...";
  }
  let _0x4f49ee = await _0xa5c984(_0x30a24a);
  let _0x2efa54 = _0x4f49ee.videos[0];
  if (!_0x2efa54) {
    throw "✳️ Video/Audio not found";
  }
  let {
    title: _0xad4e24,
    description: _0x3f71df,
    thumbnail: _0x351f54,
    videoId: _0x39b0bf,
    timestamp: _0x2b9870,
    views: _0x21034f,
    ago: _0x242d6e,
    url: _0x38f915
  } = _0x2efa54;
  _0x5cc456.react("🎧");
  _0x5cc456.react(wait);
  let _0x28b98e = "\n╭━━━⊱⛲*DEVICE PLAY*⛲⊱━━━╮\n┃📌 " + _0x2efa54.title + "\n┃📆 " + _0x2efa54.ago + "\n┃⌚  " + _0x2efa54.timestamp + "\n┃👀 " + _0x2efa54.views.toLocaleString() + "\n╰━━━━━━━━━━━━━━━━━━━━━━━━━╯";
  await _0x2d3324.sendButton2(_0x5cc456.chat, _0x28b98e, "LAZACK MD ", _0x351f54, [["🎵 ᴍᴘ3", _0x359e44 + "song " + _0x30a24a], ["📼 ᴍᴘ4 ", _0x359e44 + "video " + _0x30a24a]], null, _0x5cc456);
};
handler.help = ["play"];
handler.tags = ["dl"];
handler.command = ["play"];
handler.disabled = false;
export default handler;