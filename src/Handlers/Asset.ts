import { readdirSync, readFileSync } from 'fs-extra'
import { join } from 'path'
import chalk from 'chalk'
import { Client } from '../Structures'

export class AssetHandler {
    constructor(private client: Client) {}

    public loadAssets = (): void => {
        this.client.log('Loading Assets...')
        const folders = readdirSync(join(...this.path))
        for (const folder of folders) {
            this.path.push(folder)
            const assets = readdirSync(join(...this.path))
            for (const asset of assets) {
                this.path.push(asset)
                const buffer = readFileSync(join(...this.path))
                this.client.assets.set(asset.split('.')[0], buffer)
                this.client.log(`Loaded: ${chalk.redBright(asset.split('.')[0])} from ${chalk.blueBright(folder)}`)
                this.path.splice(this.path.indexOf(asset), 1)
            }
            this.path.splice(this.path.indexOf(folder), 1)
        }
        return this.client.log(`Successfully loaded ${chalk.cyanBright(this.client.assets.size)} assets`)
    }

    private path = [__dirname, '..', '..', 'assets']
}
                    
