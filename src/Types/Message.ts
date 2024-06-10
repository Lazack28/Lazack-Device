import { downloadContentFromMessage } from '@whiskeysockets/baileys'

export interface IArgs {
    context: string
    args: string[]
    flags: string[]
}

export type DownloadableMessage = Parameters<typeof downloadContentFromMessage>[0]
