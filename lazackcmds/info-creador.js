import PhoneNumber from 'awesome-phonenumber';

/**
 * Contact information handler for bot owner/creator
 * @param {Object} m - The message object
 * @param {Object} conn - The connection object
 */
let handler = async (m, { conn }) => {
    try {
        // React to the message
        await m.react('👋').catch(() => {});

        // Determine who to get info for
        const who = m.mentionedJid?.[0] || (m.fromMe ? conn.user.jid : m.sender);
        const [ownerNumber, botNumber] = await Promise.all([
            formatContact(suittag, conn),
            formatContact(conn.user.jid.split('@')[0], conn)
        ]);

        await sendContactArray(conn, m.chat, [
            createContactCard(
                ownerNumber,
                '👑 Owner',
                botname,
                '❀ No Spam Please',
                email,
                '📍 Dodoma',
                md,
                ownerNumber.bio
            ),
            createContactCard(
                botNumber,
                '🤖 Bot Account',
                packname,
                dev,
                email,
                'Unknown Location 🗺️',
                channel,
                botNumber.bio
            )
        ], m);

    } catch (error) {
        console.error('Contact handler error:', error);
        await conn.reply(m.chat, '❌ Failed to load contact information', m);
    }
};

/**
 * Formats contact information including profile picture and bio
 */
async function formatContact(number, conn) {
    number = String(number); // Ensure string
    const jid = `${number.replace(/[^0-9]/g, '')}@s.whatsapp.net`;

    // Get contact name safely
    let name = 'Unknown';
    try {
        const result = conn.getName(jid);
        name = result instanceof Promise ? await result : result;
    } catch {}

    // Get bio safely
    let bio = 'football and coding';
    try {
        const bioResult = await conn.fetchStatus(jid);
        bio = bioResult?.status?.toString() || bio;
    } catch {}

    // Get profile picture safely
    let pp = 'https://lazackorganisation.my.id/mtaju.jpg';
    try {
        pp = await conn.profilePictureUrl(jid);
    } catch {}

    return { number, name, bio, pp };
}

/**
 * Creates a contact card object
 */
function createContactCard(contact, role, org, label, email, region, website, bio) {
    return [
        contact.number,
        role,
        org,
        label,
        email,
        region,
        website,
        bio
    ];
}

/**
 * Sends an array of contacts as vCards
 */
async function sendContactArray(conn, jid, data, quoted, options = {}) {
    if (!Array.isArray(data[0])) data = [data];

    const contacts = data.map(([number, name, org, label, email, region, website, bio]) => {
        number = String(number).replace(/[^0-9]/g, '');
        const vcard = generateVCard(number, name, org, label, email, region, website, bio);
        return { vcard, displayName: name };
    });

    return conn.sendMessage(jid, {
        contacts: {
            displayName: contacts.length > 1 ? 'Contacts' : contacts[0]?.displayName || 'Contact',
            contacts
        }
    }, { quoted, ...options });
}

/**
 * Generates a vCard string
 */
function generateVCard(number, name, org, label, email, region, website, bio) {
    return `
BEGIN:VCARD
VERSION:3.0
N:;${escapeVCardField(name)};;;
FN:${escapeVCardField(name)}
item.ORG:${escapeVCardField(org)}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:${escapeVCardField(label)}
item2.EMAIL;type=INTERNET:${escapeVCardField(email)}
item2.X-ABLabel:Email
item3.ADR:;;${escapeVCardField(region)};;;;
item3.X-ABADR:ac
item3.X-ABLabel:Region
item4.URL:${escapeVCardField(website)}
item4.X-ABLabel:Website
item5.NOTE:${escapeVCardField(bio)}
item5.X-ABLabel:Biography
END:VCARD`.trim();
}

/**
 * Escapes special characters in vCard fields
 */
function escapeVCardField(text) {
    return (text || '').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

// Command metadata
handler.help = ["creator", "owner", "contact"];
handler.tags = ["info", "contact"];
handler.command = ['owner', 'creator', 'contact', 'developer'];

export default handler;
