import { prop, getModelForClass } from '@typegoose/typegoose'
import { Document } from 'mongoose'

export class Character {
    @prop({ type: String, unique: true, required: true })
    public mwl!: string

    @prop({ type: () => [String], required: true, default: [] })
    public slugs!: string[]
}

export type TCharacterModel = Character & Document

export const characterSchema = getModelForClass(Character)
