import chalk from 'chalk'
import { config as Config } from 'dotenv'
import EventEmitter from 'events'
import TypedEventEmitter from 'typed-emitter'
import Baileys, { DisconnectReason, fetchLatestBaileysVersion, ParticipantAction, proto } from '@whiskeysockets/baileys'
import P from 'pino'
import { connect, set } from 'mongoose'
import { Boom } from '@hapi/boom'
import qr from 'qr-image'
import { Pokemon } from '../Database'
import { Utils } from '../lib'
import { Database, Contact, Message, Server, AuthenticationFromDatabase } from '.'
import { IConfig, client, IEvent, ICall } from '../Types'

export class Client extends (EventEmitter as new () => TypedEventEmitter<Events>) {
    private client!: client
    constructor() {
        super()
        Config()
        this.config = {
            name: process.env.BOT_NAME || 'bot',
            session: process.env.SESSION || 'SESSION',
            prefix: process.env.PREFIX || '#',
            gkey: 'AIzaSyDMbI3nvmQUrfjoCJYLS69Lej1hSXQjnWIEcx',
            mods: (process.env.MODS || '27844132352').split(', ').map((user) => `${user}@s.whatsapp.net`),
            chatBotUrl: 'http://api.brainshop.ai/get?bid=170305&key=8OpWeiccHtCb1dFj&uid=[uid]&msg=[msg',
            PORT: Number(process.env.PORT || 3000)
        }
        new Server(this)
    }

    public start = async (): Promise<client> => {
        await connect(
            'mongodb+srv://herrison:wells@cluster0.tqhtuou.mongodb.net/?retryWrites=true&w=majority'
        )
        this.log('Connected to the Database')
        const { useDatabaseAuth } = new AuthenticationFromDatabase(this.config.session)
        const { saveState, state, clearState } = await useDatabaseAuth()
        this.client = Baileys({
            version: (await fetchLatestBaileysVersion()).version,
            printQRInTerminal: true,
            auth: state,
            logger: P({ level: 'fatal' }),
            browser: ['Hitman47😈', 'fatal', '4.0.0'],
            getMessage: async (key) => {
                return {
                    conversation: ''
                }
            },
            markOnlineOnConnect: false
        })
        // prettier-ignore
        for (const method of Object.keys(this.client))
           // @ts-ignore
            this[method as keyof Client] = this.client[method as keyof client]
        this.ws.on('CB:call', (call: ICall) => this.emit('new_call', { from: call.content[0].attrs['call-creator'] }))
        this.ev.on('contacts.update', async (contacts) => await this.contact.saveContacts(contacts))
        this.ev.on('messages.upsert', async ({ messages }) => {
            const M = new Message(messages[0], this)
            if ((M.type === 'protocolMessage' || M.type === 'senderKeyDistributionMessage') && M.content === '')
                return void null
            if (M.stubType && M.stubParameters) {
                const emitParticipantsUpdate = (action: ParticipantAction): boolean =>
                    this.emit('participants_update', {
                        jid: M.from,
                        participants: M.stubParameters as string[],
                        action
                    })
                switch (M.stubType) {
                    case proto.WebMessageInfo.StubType.GROUP_CREATE:
                        return void this.emit('new_group_joined', {
                            jid: M.from,
                            subject: M.stubParameters[0]
                        })
                    case proto.WebMessageInfo.StubType.GROUP_PARTICIPANT_ADD:
                    case proto.WebMessageInfo.StubType.GROUP_PARTICIPANT_ADD_REQUEST_JOIN:
                    case proto.WebMessageInfo.StubType.GROUP_PARTICIPANT_INVITE:
                        return void emitParticipantsUpdate('add')
                    case proto.WebMessageInfo.StubType.GROUP_PARTICIPANT_LEAVE:
                    case proto.WebMessageInfo.StubType.GROUP_PARTICIPANT_REMOVE:
                        return void emitParticipantsUpdate('remove')
                    case proto.WebMessageInfo.StubType.GROUP_PARTICIPANT_DEMOTE:
                        return void emitParticipantsUpdate('demote')
                    case proto.WebMessageInfo.StubType.GROUP_PARTICIPANT_PROMOTE:
                        return void emitParticipantsUpdate('promote')
                }
            }
            return void this.emit('new_message', await M.simplify())
        })
        this.ev.on('connection.update', (update) => {
            if (update.qr) {
                this.log(
                    `QR code generated. Scan it to continue | You can also authenicate in http://localhost:${this.config.PORT}`
                )
                this.QR = qr.imageSync(update.qr)
            }
            const { connection, lastDisconnect } = update
            if (connection === 'close') {
                if ((lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut) {
                    this.log('Reconnecting...')
                    setTimeout(() => this.start(), 3000)
                } else {
                    this.log('Disconnected.', true)
                    this.log('Deleting session and restarting')
                    clearState()
                    this.log('Session deleted')
                    this.log('Starting...')
                    setTimeout(() => this.start(), 3000)
                }
            }
            if (connection === 'connecting') {
                this.condition = 'connecting'
                this.log('Connecting to WhatsApp...')
            }
            if (connection === 'open') {
                this.condition = 'connected'
                this.log('Connected to WhatsApp')
                this.emit('open')
            }
        })
        this.ev.on('creds.update', saveState)
        return this.client
    }

    public utils = new Utils()

    public DB = new Database()

    public config: IConfig

    public contact = new Contact(this)

    public getAllGroups = async (): Promise<string[]> => Object.keys(await this.groupFetchAllParticipating())

    public correctJid = (jid: string): string => `${jid.split('@')[0].split(':')[0]}@s.whatsapp.net`

    public assets = new Map<string, Buffer>()

    public log = (text: string, error: boolean = false): void =>
        console.log(chalk[error ? 'red' : 'blue']('[Dkhitman3]'), chalk[error ? 'redBright' : 'greenBright'](text))

    public QR!: Buffer

    public condition!: 'connected' | 'connecting' | 'logged_out'

    public appPatch!: client['appPatch']
    public assertSessions!: client['assertSessions']
    public authState!: client['authState']
    public chatModify!: client['chatModify']
    public end!: client['end']
    public ev!: client['ev']
    public fetchBlocklist!: client['fetchBlocklist']
    public fetchPrivacySettings!: client['fetchPrivacySettings']
    public fetchStatus!: client['fetchStatus']
    public generateMessageTag!: client['generateMessageTag']
    public getBusinessProfile!: client['getBusinessProfile']
    public getCatalog!: client['getCatalog']
    public getCollections!: client['getCollections']
    public getOrderDetails!: client['getOrderDetails']
    public groupAcceptInvite!: client['groupAcceptInvite']
    public groupAcceptInviteV4!: client['groupAcceptInviteV4']
    public groupInviteCode!: client['groupInviteCode']
    public groupLeave!: client['groupLeave']
    public groupMetadata!: client['groupMetadata']
    public groupCreate!: client['groupCreate']
    public groupFetchAllParticipating!: client['groupFetchAllParticipating']
    public groupGetInviteInfo!: client['groupGetInviteInfo']
    public groupRevokeInvite!: client['groupRevokeInvite']
    public groupSettingUpdate!: client['groupSettingUpdate']
    public groupToggleEphemeral!: client['groupToggleEphemeral']
    public groupUpdateDescription!: client['groupUpdateDescription']
    public groupUpdateSubject!: client['groupUpdateSubject']
    public groupParticipantsUpdate!: client['groupParticipantsUpdate']
    public logout!: client['logout']
    public presenceSubscribe!: client['presenceSubscribe']
    public productDelete!: client['productDelete']
    public productCreate!: client['productCreate']
    public productUpdate!: client['productUpdate']
    public profilePictureUrl!: client['profilePictureUrl']
    public updateMediaMessage!: client['updateMediaMessage']
    public query!: client['query']
    public readMessages!: client['readMessages']
    public refreshMediaConn!: client['refreshMediaConn']
    public relayMessage!: client['relayMessage']
    public resyncAppState!: client['resyncAppState']
    public sendMessageAck!: client['sendMessageAck']
    public sendNode!: client['sendNode']
    public sendRawMessage!: client['sendRawMessage']
    public sendRetryRequest!: client['sendRetryRequest']
    public sendMessage!: client['sendMessage']
    public sendPresenceUpdate!: client['sendPresenceUpdate']
    public sendReceipt!: client['sendReceipt']
    public type!: client['type']
    public updateBlockStatus!: client['updateBlockStatus']
    public onUnexpectedError!: client['onUnexpectedError']
    public onWhatsApp!: client['onWhatsApp']
    public uploadPreKeys!: client['uploadPreKeys']
    public updateProfilePicture!: client['updateProfilePicture']
    public user!: client['user']
    public ws!: client['ws']
    public waitForMessage!: client['waitForMessage']
    public waitForSocketOpen!: client['waitForSocketOpen']
    public waitForConnectionUpdate!: client['waitForConnectionUpdate']
    public waUploadToServer!: client['waUploadToServer']
}

type Events = {
    new_call: (call: { from: string }) => void
    new_message: (M: Message) => void
    participants_update: (event: IEvent) => void
    open: () => void
    new_group_joined: (group: { jid: string; subject: string }) => void
}
    
