import { prop, getModelForClass } from '@typegoose/typegoose'
import { Document } from 'mongoose'

export class GroupSchema {
    @prop({ type: String, unique: true, required: true })
    public jid!: string

    @prop({ type: Boolean, required: true, default: false })
    public events!: boolean

    @prop({ type: Boolean, required: true, default: false })
    public wild!: boolean

    @prop({ type: String, required: true, default: 'all' })
    public bot!: string

    @prop({ type: Boolean, required: true, default: false })
    public chara!: boolean

    @prop({ type: Boolean, required: true, default: false })
    public mods!: boolean

}

export type TGroupModel = GroupSchema & Document

export const groupSchema = getModelForClass(GroupSchema)
