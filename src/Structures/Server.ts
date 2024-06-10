import express from 'express'
import { join } from 'path'
import { Client } from '.'

export class Server {
    constructor(private client: Client) {
        this.app.use('/', express.static(this.path))

        this.app.get('/wa/qr', async (req, res) => {
            const { session } = req.query
            if (!session || !this.client || this.client.config.session !== (req.query.session as string))
                return void res.status(404).setHeader('Content-Type', 'text/plain').send('Invalid Session').end()
            if (!this.client || !this.client.QR)
                return void res
                    .status(404)
                    .setHeader('Content-Type', 'text/plain')
                    .send(
                        this.client.condition === 'connected'
                            ? 'You are already connected to WhatsApp'
                            : 'QR not generated'
                    )
                    .end()
            res.status(200).contentType('image/png').send(this.client.QR)
        })

        this.app.all('*', (req, res) => res.sendStatus(404))

        this.app.listen(client.config.PORT, () => client.log(`Server started on PORT : ${client.config.PORT}`))
    }

    private path = join(__dirname, '..', '..', 'public')

    private app = express()
}
