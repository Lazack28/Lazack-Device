import { IContact } from '../Types'
import { Contact as contact } from '@whiskeysockets/baileys'
import { Database, Client } from '.'

export class Contact {
    constructor(private client: Client) {}
    public saveContacts = async (contacts: Partial<contact>[]): Promise<void> => {
        if (!this.contacts.has('contacts')) {
            const data = await this.DB.getContacts()
            this.contacts.set('contacts', data)
        }
        const data = this.contacts.get('contacts') as contact[]
        for (const contact of contacts) {
            if (contact.id) {
                const index = data.findIndex(({ id }) => id === contact.id)
                if (index >= 0) {
                    if (contact.notify !== data[index].notify) data[index].notify = contact.notify
                    continue
                }
                data.push({
                    id: contact.id,
                    notify: contact.notify,
                    status: contact.status,
                    imgUrl: contact.imgUrl,
                    name: contact.name,
                    verifiedName: contact.verifiedName
                })
            }
        }
        this.contacts.set('contacts', data)
        await this.DB.contact.updateOne({ ID: 'contacts' }, { $set: { data } })
    }

    public getContact = (jid: string): IContact => {
        const contact = this.contacts.get('contacts')
        const isMod = this.client.config.mods.includes(jid)
        if (!contact)
            return {
                username: 'User',
                jid,
                isMod
            }
        const index = contact.findIndex(({ id }) => id === jid)
        if (index < 0)
            return {
                username: 'User',
                jid,
                isMod
            }
        const { notify, verifiedName, name } = contact[index]
        return {
            username: notify || verifiedName || name || 'User',
            jid,
            isMod
        }
    }

    private DB = new Database()

    private contacts = new Map<'contacts', contact[]>()
}
