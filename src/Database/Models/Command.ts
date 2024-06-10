import { prop, getModelForClass } from '@typegoose/typegoose'
import { Document } from 'mongoose'

export class DisabledCommandsSchema {
    @prop({ type: String, required: true, unique: true })
    public title!: string

    @prop({ type: () => DisabledCommand, required: true, default: [] })
    public disabledCommands!: DisabledCommand[]
}

class DisabledCommand {
    @prop({ type: String, required: true })
    public command!: string

    @prop({ type: String, required: true })
    public reason!: string

    @prop({ type: String, required: true })
    public disabledBy!: string

    @prop({ type: String, required: true })
    public time!: string
}

export type TCommandModel = DisabledCommandsSchema & Document

export const disabledCommandsSchema = getModelForClass(DisabledCommandsSchema)
