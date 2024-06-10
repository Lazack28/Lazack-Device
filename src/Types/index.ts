import Baileys, { GroupMetadata, ParticipantAction } from '@whiskeysockets/baileys'

export * from './Config'
export * from './Command'
export * from './Pokemon'
export * from './Message'

export interface IContact {
    jid: string
    username: string
    isMod: boolean
}

export interface ISender extends IContact {
    isAdmin: boolean
}

export interface ICall {
    content: {
        attrs: {
            'call-creator': string
        }
        tag: string
    }[]
}

export interface IEvent {
    jid: string
    participants: string[]
    action: ParticipantAction
}

export interface YT_Search {
    type: string
    videoId: string
    url: string
    title: string
    description: string
    image: string
    thumbnail: string
    seconds: number
    timestamp: string
    duration: {
        seconds: number
        timestamp: string
    }
    ago: string
    views: number
    author: {
        name: string
        url: string
    }
}

export enum GroupFeatures {
    'events' = 'By enabling this feature, the bot will welcome new members, gives farewell to the members who left the group or were removed and reacts when a member is promoted or demoted',
    //'wild' = 'By enabling this feature, it will send wild pokemon',
   // 'chara' = '🍁By enabling this feature, the commands for Chara will start working in your group🍁',
    'mods' = 'By enabling this feature, it enables the bot to remove the member (except for admins) which sent an invite link of other groups. This will work if and only if the bots an admin'
 }

export interface IGroup extends GroupMetadata {
    admins?: string[]
}

export type client = ReturnType<typeof Baileys>
