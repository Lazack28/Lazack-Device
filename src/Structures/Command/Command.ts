import { BaseCommand } from '.'
import { ICommand } from '../../Types'

export const Command = (name: string, config: ICommand['config']): ClassDecorator =>
    (<T extends new (...args: ConstructorParameters<typeof BaseCommand>) => T>(target: T): T =>
        //@ts-ignore
        class extends target {
            name = name
            config = config
        }) as ClassDecorator
