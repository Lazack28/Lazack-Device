export interface IConfig {
    /**name of your bot */
    name: string
    /**prefix of your bot */
    prefix: string
    /**session of the bot */
    session: string
    /**number of the users who's the bot admins of the bot */
    mods: string[]
    /**port number where the server will be started */
    PORT: number
    /** API for google */
    gkey: string
    /** API from BrainShop for chat bot */
    chatBotUrl: string
}
