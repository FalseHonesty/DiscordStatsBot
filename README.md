# DiscordStatsBot

This bot provides users with statistics for their Discord servers/guilds. 

* First, download the files in the repo, along with NodeJS (if not already installed).
* Next, go to [https://discordapp.com/developers/applications/me](https://discordapp.com/developers/applications/me) and add a new app. Name the app whatever you would like.
* Then create a bot user for the app, and click reveal token. Copy this, but make sure to NOT share it to anyone.
* Go to the folder where the files were downloaded, and open config.json. replace the `"..."` of  `"key"` with the copied token.
* Next go back to the Discord Applications site and copy the App's client ID.
* Go to [https://discordapp.com/oauth2/authorize?client_id=INSERT_CLIENT_ID&scope=bot&permissions=0](https://discordapp.com/oauth2/authorize?client_id=INSERT_CLIENT_ID&scope=bot&permissions=0) but replace the url part `client_id=INSERT_CLIENT_ID` with the copied client ID.
* Next, select the server you wish to add the bot to.
* Turn on Discord Developer Mode in Discord Settings > Appearance > Check Box
* Go to the discord server where you added the bot to and select a channel in which the bot will send stats to (this channel will not contribute to the stats.)
* Right click the channel and click Copy ID.
* Go to the folder where the files were downloaded, and open config.json. replace the `"..."` of `"statsChannel"` with the copied token.
* Then navigate to the folder where you have the repo and open a Terminal/Command Line and type:
```
npm install discord.js jsonfile later quiche --save
```
* Then run `node index.js` in a Terminal/Command Line and your bot will be online!

(Optionally, set up some sort of server that will run index.js with Node)

## Commands

`!dayStats` To display that day's stats so far.
`!weekStats` To display that day's stats so far.
