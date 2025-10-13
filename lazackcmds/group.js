import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
  try {
    const groupMetadata = await conn.groupMetadata(m.chat);
    const participants = groupMetadata.participants || [];

    if (participants.length < 2) {
      return m.reply('🚫 The group must have at least 2 members.');
    }
    if (participants.length > 1000) {
      return m.reply('🚫 The group has more than 1000 members.');
    }

    // Generate VCF content
    let vcfContent = `BEGIN:VCARD\nVERSION:3.0\nNOTE:Generated for group: ${groupMetadata.subject}\n`;
    for (let participant of participants) {
      let userJid = participant.id || participant.jid || ''; // Use available user ID
      if (!userJid) continue;

      let phoneNumber = userJid.replace(/\D/g, ''); // Extract only digits
      let displayName = participant.notify || phoneNumber; // Use notify name if available

      vcfContent += `
BEGIN:VCARD
VERSION:3.0
FN:${displayName}
TEL;TYPE=CELL:+${phoneNumber}
END:VCARD
`.trim() + '\n';
    }

    // Sanitize the group name
    const sanitizedGroupName = groupMetadata.subject.replace(/[^a-zA-Z0-9_]/g, '_');
    const vcfFilePath = path.join(process.cwd(), `${sanitizedGroupName}.vcf`);

    // Write VCF file
    fs.writeFileSync(vcfFilePath, vcfContent);
    console.log(`✅ VCF file generated: ${vcfFilePath}`);

    // Send the file
    await conn.sendMessage(m.chat, {
      document: fs.readFileSync(vcfFilePath),
      mimetype: 'text/vcard',
      fileName: `LazackDevice.vcf`,
      caption: `📂 Here is the VCF file for *${groupMetadata.subject}* (${participants.length} members).`,
    });

    // Delete the file after sending
    setTimeout(() => fs.unlinkSync(vcfFilePath), 5000);
  } catch (error) {
    console.error('❌ Error in VCF command:', error);
    m.reply('⚠️ An error occurred while generating the VCF file.');
  }
};

handler.help = ['vcf'];
handler.tags = ['tools'];
handler.command = /^(vcf)$/i;
handler.group = true;

export default handler;
