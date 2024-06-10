import { prop, getModelForClass } from '@typegoose/typegoose'
import { Document } from 'mongoose'

export class Contact {
    @prop({ type: String, required: true, unique: true })
    public ID!: string

    @prop({ type: () => contact, required: true, default: [] })
    public data!: contact[]
}

class contact {
    @prop({ type: String, required: true })
    public id!: string

    @prop({ type: String })
    public notify?: string

    @prop({ type: String })
    public name?: string

    @prop({ type: String })
    public verifiedName?: string

    @prop({ type: String })
    public status?: string

    @prop({ type: String })
    public imgUrl?: string
}

export type TContactModel = Contact & Document

export const contactSchema = getModelForClass(Contact)
