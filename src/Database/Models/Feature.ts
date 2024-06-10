import { prop, getModelForClass } from '@typegoose/typegoose'
import { Document } from 'mongoose'

export class FeatureSchema {
    @prop({ type: String, unique: true, required: true })
    public feature!: string

    @prop({ type: Boolean, required: true, default: false })
    public state!: boolean
}

export type TFeatureModel = FeatureSchema & Document

export const featureSchema = getModelForClass(FeatureSchema)
