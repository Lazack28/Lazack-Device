import { prop, getModelForClass } from '@typegoose/typegoose'
import { Document } from 'mongoose'

export class SessionsSchema {
    @prop({ type: String, required: true, unique: true })
    public sessionId!: string

    @prop({ type: String })
    public session?: string
}

export type TSessionModel = SessionsSchema & Document

export const sessionSchema = getModelForClass(SessionsSchema)
