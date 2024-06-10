import { Contact } from '@whiskeysockets/baileys'
import {
    userSchema,
    groupSchema,
    contactSchema,
    sessionSchema,
    disabledCommandsSchema,
    featureSchema,
    TCommandModel,
    TGroupModel,
    TFeatureModel,
    TSessionModel,
    TUserModel,
    UserSchema,
    GroupSchema
} from '../Database'
import { Utils } from '../lib'

export class Database {
    public getUser = async (jid: string): Promise<TUserModel> =>
        (await this.user.findOne({ jid })) ||
        (await new this.user({ jid, tag: this.utils.generateRandomUniqueTag() }).save())

    public setExp = async (jid: string, experience: number): Promise<void> => {
        experience = experience + Math.floor(Math.random() * 25)
        await this.updateUser(jid, 'experience', 'inc', experience)
    }

    public updateBanStatus = async (jid: string, action: 'ban' | 'unban' = 'ban'): Promise<void> => {
        await this.updateUser(jid, 'banned', 'set', action === 'ban')
    }

    public updateUser = async (
        jid: string,
        field: keyof UserSchema,
        method: 'inc' | 'set',
        update: UserSchema[typeof field]
    ): Promise<void> => {
        await this.getUser(jid)
        await this.user.updateOne({ jid }, { [`$${method}`]: { [field]: update } })
    }

    public getGroup = async (jid: string): Promise<TGroupModel> =>
        (await this.group.findOne({ jid })) || (await new this.group({ jid }).save())

    public updateGroup = async (jid: string, field: keyof GroupSchema, update: boolean | string): Promise<void> => {
        const x = await this.getGroup(jid)
        x[field as 'bot'] = update as string
        await this.group.updateOne({ jid }, { $set: { [field]: update } })
  }

    public setGold = async (jid: string, gold: number, field: 'wallet' | 'bank' = 'wallet'): Promise<void> => {
        await this.updateUser(jid, field, 'inc', gold)
    }

    public getSession = async (sessionId: string): Promise<TSessionModel | null> =>
        await this.session.findOne({ sessionId })

    public saveNewSession = async (sessionId: string): Promise<void> => {
        await new this.session({ sessionId }).save()
    }

    public updateSession = async (sessionId: string, session: string): Promise<void> => {
        await this.session.updateOne({ sessionId }, { $set: { session } })
    }

    public removeSession = async (sessionId: string): Promise<void> => {
        await this.session.deleteOne({ sessionId })
    }

    public getContacts = async (): Promise<Contact[]> => {
        let result = await this.contact.findOne({ ID: 'contacts' })
        if (!result) result = await new this.contact({ ID: 'contacts' }).save()
        return result.data
    }

    public getDisabledCommands = async (): Promise<TCommandModel['disabledCommands']> => {
        let result = await this.disabledCommands.findOne({ title: 'commands' })
        if (!result) result = await new this.disabledCommands({ title: 'commands' }).save()
        return result.disabledCommands
    }

    public updateDisabledCommands = async (update: TCommandModel['disabledCommands']): Promise<void> => {
        await this.getDisabledCommands()
        await this.disabledCommands.updateOne({ title: 'commands' }, { $set: { disabledCommands: update } })
    }

    public getFeature = async (feature: string): Promise<TFeatureModel> =>
        (await this.feature.findOne({ feature })) ||
        (await new this.feature({
            feature
        }).save())

    public updateFeature = async (feature: string, update: boolean): Promise<void> => {
        await this.getFeature(feature)
        await this.feature.updateOne({ feature: feature }, { $set: { state: update } })
    }

    private utils = new Utils()

    public user = userSchema

    public group = groupSchema

    public contact = contactSchema

    public session = sessionSchema

    public disabledCommands = disabledCommandsSchema

    public feature = featureSchema
}

type valueof<T> = T[keyof T]


    
