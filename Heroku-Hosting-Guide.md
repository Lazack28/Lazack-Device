## Heroku Deploy Guide

### ⚠ Requirements

 - A cluster URI of the [MongoDB](https://www.mongodb.com/). You can get it by following the steps given [here](https://github.com/LuckyYam/WhatsApp-bot/blob/master/MongoDB-Guide.md)

### Pre-requisite

1. [Hitman47](https://github.com/Dkhitman3/Hitman47) - Go there
2. Scroll down a bit and you will see the "Deploy To Heroku" button in purple color (sorry if you are color blind)
3. Click on it and login or sign up for Heroku
4. Enter the following fields
    | KEY | VALUE |
    | --- | ----------- |
    | NAME | NAME_OF_THE_BOT |
    | PREFIX | PREFIX_OF_THE_BOT |
    | CHAT_BOT_URL | API_KEY_FROM_BRAINSHOP 
    | SESSION | BOT_SESSION |
    | MODS | BOT_ADMINS_NUMBER (should be seperated by a comma and a space) |
    | MONGO_URI | YOUR_CLUSTER_URI |
 - `PREFIX`: Prefix of the bot
 - `BOT_NAME`: Name of the bot
 - `CHAT_BOT_URL`: Your API key from Brainshop 
 - `MONGO_URI`: A secret String for MongoDB connection. (Required)
 - `MODS`: Number of the users who should be the admins of the bot (should be in international format without "+" and multiple numbers should be separated by a comma  and a space). Example - 1234567890, 198765443218 (you shouldn't add "@s.whatsapp.net" at the end of each numbers)
 - `SESSION`: Session of the bot
5. Wait for the building to finish, you should always keep an eye on log messages, you can find log messages in the Dashboard -> More -> View logs.<br>
6. After it builds, click on the "View" or "Open App".<br>
7. Authenticate By Providing Your SESSION_ID and a QR Code Will Show Up.<br>
8. Open WhatsApp on your phone -> Click on the 3 Dots on the top Right -> Click on WhatsApp Web -> Click on "Link a Device" and scan the QR from the previous step.<br>
9. Your heroku app can fall asleep so for keeping it awaken add your app to ([Kaffeine](https://kaffeine.herokuapp.com/))<br>. It pings your Heroku app every 30 minutes so it will never go to sleep.<br>
