import { proto, MessageType, MediaType, AnyMessageContent, downloadContentFromMessage } from '@whiskeysockets/baileys'
import { Client } from '.'
import { ISender, DownloadableMessage, IGroup } from '../Types'

export class Message {
    constructor(private M: proto.IWebMessageInfo, private client: Client) {
        this.message = this.M
        this.from = M.key.remoteJid || ''
        this.chat = this.from.endsWith('@s.whatsapp.net') ? 'dm' : 'group'
        const { jid, username, isMod } = this.client.contact.getContact(
            this.chat === 'dm' && this.M.key.fromMe
                ? this.client.correctJid(this.client.user?.id || '')
                : this.chat === 'group'
                ? this.client.correctJid(M.key.participant || '')
                : this.client.correctJid(this.from)
        )
        this.sender = {
            jid,
            username,
            isMod,
            isAdmin: false
        }
        this.type = (Object.keys(M.message || {})[0] as MessageType) || 'conversation'
        if (this.M.pushName) this.sender.username = this.M.pushName
        const supportedMediaType = ['videoMessage', 'imageMessage']
        this.hasSupportedMediaMessage =
            this.type === 'buttonsMessage'
                ? supportedMediaType.includes(Object.keys(M.message?.buttonsMessage || {})[0])
                : supportedMediaType.includes(this.type)
        const getContent = (): string => {
            if (M.message?.buttonsResponseMessage) return M.message?.buttonsResponseMessage?.selectedButtonId || ''
            if (M.message?.listResponseMessage)
                return M.message?.listResponseMessage?.singleSelectReply?.selectedRowId || ''
            return M.message?.conversation
                ? M.message.conversation
                : this.hasSupportedMediaMessage
                ? supportedMediaType
                      .map((type) => M.message?.[type as 'imageMessage']?.caption)
                      .filter((caption) => caption)[0] || ''
                : M.message?.extendedTextMessage?.text
                ? M.message?.extendedTextMessage.text
                : ''
        }
        this.content = getContent()
        this.urls = this.client.utils.extractUrls(this.content)
        const mentions = (M.message?.[this.type as 'extendedTextMessage']?.contextInfo?.mentionedJid || []).filter(
            (x) => x !== null && x !== undefined
        )
        for (const mentioned of mentions) this.mentioned.push(mentioned)
        let text = this.content
        for (const mentioned of this.mentioned) text = text.replace(mentioned.split('@')[0], '')
        this.numbers = this.client.utils.extractNumbers(text)
        if (M.message?.[this.type as 'extendedTextMessage']?.contextInfo?.quotedMessage) {
            const { quotedMessage, participant, stanzaId } =
                M.message?.[this.type as 'extendedTextMessage']?.contextInfo || {}
            if (quotedMessage && participant && stanzaId) {
                const Type = Object.keys(quotedMessage)[0] as MessageType
                const getQuotedContent = (): string => {
                    if (quotedMessage?.buttonsResponseMessage)
                        return quotedMessage?.buttonsResponseMessage?.selectedDisplayText || ''
                    if (quotedMessage?.listResponseMessage)
                        return quotedMessage?.listResponseMessage?.singleSelectReply?.selectedRowId || ''
                    return quotedMessage?.conversation
                        ? quotedMessage.conversation
                        : supportedMediaType.includes(Type)
                        ? supportedMediaType
                              .map((type) => quotedMessage?.[type as 'imageMessage']?.caption)
                              .filter((caption) => caption)[0] || ''
                        : quotedMessage?.extendedTextMessage?.text
                        ? quotedMessage?.extendedTextMessage.text
                        : ''
                }
                const { username, jid, isMod } = this.client.contact.getContact(this.client.correctJid(participant))
                this.quoted = {
                    sender: {
                        jid,
                        username,
                        isMod,
                        isAdmin: false
                    } || {
                        username: 'User',
                        jid: this.client.correctJid(participant),
                        isMod: this.client.config.mods.includes(this.client.correctJid(participant)),
                        isAdmin: false
                    },
                    content: getQuotedContent(),
                    message: quotedMessage,
                    type: Type,
                    hasSupportedMediaMessage:
                        Type !== 'buttonsMessage'
                            ? supportedMediaType.includes(Type)
                            : supportedMediaType.includes(Object.keys(quotedMessage?.buttonsMessage || {})[1]),
                    key: {
                        remoteJid: this.from,
                        fromMe:
                            this.client.correctJid(participant) === this.client.correctJid(this.client.user?.id || ''),
                        id: stanzaId,
                        participant
                    }
                }
            }
        }
        this.emojis = this.client.utils.extractEmojis(this.content)
    }

    public simplify = async (): Promise<Message> => {
        if (this.chat === 'dm') return this
        return await this.client
            .groupMetadata(this.from)
            .then((res) => {
                const result: IGroup = res
                result.admins = result.participants
                    .filter((x) => x.admin !== null && x.admin !== undefined)
                    .map((x) => x.id)
                this.groupMetadata = result
                this.sender.isAdmin = result.admins.includes(this.sender.jid)
                if (this.quoted) this.quoted.sender.isAdmin = result.admins.includes(this.quoted.sender.jid)
                return this
            })
            .catch(() => this)
    }

    get stubType(): proto.WebMessageInfo.StubType | null | undefined {
        return this.M.messageStubType
    }

    get stubParameters(): string[] | undefined | null {
        return this.M.messageStubParameters
    }

    public reply = async (
        content: string | Buffer,
        type: 'text' | 'image' | 'video' | 'audio' | 'sticker' | 'document' = 'text',
        gif?: boolean,
        mimetype?: string,
        caption?: string,
        mentions?: string[],
        externalAdReply?: proto.IContextInfo['externalAdReply'],
        thumbnail?: Buffer,
        fileName?: string,
        options: { sections?: proto.Message.ListMessage.ISection[]; buttonText?: string; title?: string } = {}
    ): Promise<ReturnType<typeof this.client.sendMessage>> => {
        if (type === 'text' && Buffer.isBuffer(content)) throw new Error('Cannot send Buffer as a text message')
        return this.client.sendMessage(
            this.from,
            {
                [type]: content,
                gifPlayback: gif,
                caption,
                mimetype,
                mentions,
                fileName,
                jpegThumbnail: thumbnail ? thumbnail.toString('base64') : undefined,
                contextInfo: externalAdReply
                    ? {
                          externalAdReply
                      }
                    : undefined,
                footer: options.sections?.length ? `Bot` : undefined,
                sections: options.sections,
                title: options.title,
                buttonText: options.buttonText
            } as unknown as AnyMessageContent,
            {
                quoted: this.M
            }
        )
    }

    public react = async (
        emoji: string,
        key: proto.IMessageKey = this.M.key
    ): Promise<ReturnType<typeof this.client.sendMessage>> =>
        await this.client.sendMessage(this.from, {
            react: {
                text: emoji,
                key
            }
        })

    public downloadMediaMessage = async (message: proto.IMessage): Promise<Buffer> => {
        let type = Object.keys(message)[0] as MessageType
        let msg = message[type as keyof typeof message]
        if (type === 'buttonsMessage' || type === 'viewOnceMessageV2') {
            if (type === 'viewOnceMessageV2') {
                msg = message.viewOnceMessageV2?.message
                type = Object.keys(msg || {})[0] as MessageType
            } else type = Object.keys(msg || {})[1] as MessageType
            msg = (msg as any)[type]
        }
        const stream = await downloadContentFromMessage(
            msg as DownloadableMessage,
            type.replace('Message', '') as MediaType
        )
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        return buffer
    }

    public from: string
    public sender: ISender
    public content: string
    public numbers: number[]
    public hasSupportedMediaMessage: boolean
    public type: MessageType
    public message: proto.IWebMessageInfo
    public chat: 'dm' | 'group'
    public mentioned: string[] = []
    public quoted?: {
        content: string
        sender: ISender
        type: MessageType
        message: proto.IMessage
        hasSupportedMediaMessage: boolean
        key: proto.IMessageKey
    }
    public emojis: string[]
    public urls: string[]
    public groupMetadata?: IGroup
}
