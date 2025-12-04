import FormData from "form-data"
import * as Jimp from "jimp"

const handler = async (m, {conn, usedPrefix, command}) => {
  try {    
    await m.react('🕓')
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ""

    // If no image is detected
    if (!mime) 
      return conn.reply(m.chat, `❀ Please send an image or reply to an image using the command.`, m)

    // If file is not supported
    if (!/image\/(jpe?g|png)/.test(mime)) 
      return m.reply(`✧ The file format (${mime}) is not supported, please send or reply to a valid image.`)

    conn.reply(m.chat, `✧ Enhancing the image quality...`, m)  

    // Download image
    let img = await q.download?.()

    // Enhance using remini function
    let pr = await remini(img, "enhance")

    // Send back improved image
    await conn.sendFile(m.chat, pr, 'thumbnail.jpg', "✅ Image enhanced successfully!", m, null)
    await m.react('✅')
  } catch {
    await m.react('✖️')
  }
}

handler.help = ["hd"]
handler.tags = ["tools"]
handler.command = ["remini", "hd", "enhance"]

export default handler

// Function to enhance image quality using Vyro AI
async function remini(imageData, operation) {
  return new Promise(async (resolve, reject) => {
    const availableOperations = ["enhance", "recolor", "dehaze"]
    if (!availableOperations.includes(operation)) {
      operation = availableOperations[0] // Default: enhance
    }
    const baseUrl = "https://inferenceengine.vyro.ai/" + operation + ".vyro"

    const formData = new FormData()
    formData.append("image", Buffer.from(imageData), {filename: "enhance_image_body.jpg", contentType: "image/jpeg"})
    formData.append("model_version", 1, {"Content-Transfer-Encoding": "binary", contentType: "multipart/form-data; charset=utf-8"})

    formData.submit(
      {
        url: baseUrl,
        host: "inferenceengine.vyro.ai",
        path: "/" + operation,
        protocol: "https:",
        headers: {
          "User-Agent": "okhttp/4.9.3",
          Connection: "Keep-Alive",
          "Accept-Encoding": "gzip"
        }
      },
      function (err, res) {
        if (err) reject(err);
        const chunks = [];
        res.on("data", function (chunk) { chunks.push(chunk) });
        res.on("end", function () { resolve(Buffer.concat(chunks)) });
        res.on("error", function (err) { reject(err) });
      },
    )
  })
}
