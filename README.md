# unari_bot

This is a Telegram bot **unari_bot** that sends the days menu of certain Unicafe restaurants to the user.

The bot is hosted on Heroku and runs on node.js with Telegraf.

There is also an api endpoint that I use to send the menu of my favorite Unicafe to myself every morning. The endpoint uses a different implementation of the bot to send a message to certain conversation without user interaction.

## Interacting with the bot

You can find the bot on Telegram by searching [@unari_bot](https://t.me/unari_bot). The command `/help` will tell you what to do after starting a conversation with it.

## Usage

Clone this repository to yourself. Navigate into the project directory and run

#### `npm install`

Set the environmental variables `BOT_TOKEN` and `CONVERSATION_ID`. You need your own bot and bot token for this, more info on telegram bots [here](https://core.telegram.org/bots). The conversation id can be id of any conversation, group or channel. Again see more info from the Telegram bot docs.

After environmental variables are set, you can run

### `npm start`

or 

### `npm run dev`

to start the server locally on port 3000. `npm run dev` starts the server with nodemon to allow for better development experience.
