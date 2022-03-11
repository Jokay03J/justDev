//import module
const { Client, Intents, Collection } = require('discord.js');
require("dotenv").config(".env")
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require("colors")
const fs = require("fs")
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection()
const commands = []
//commands file variable
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
//event file variables
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
console.log("========COMMANDS=======".white);
//register all commands data for handling commands
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
  console.log(`${command.data.name} (/)`.yellow);
}
console.log("=========EVENT=========".white);
//event handling
for (const file of eventFiles) {
  //event file data
  const event = require(`./events/${file}`);
  //check if event is once
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args,client));
	} else {
    console.log(`${event.name}`.yellow);
		client.on(event.name, (...args) => event.execute(...args,client));
	}
}

//define REST type with token
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
//set commands in application with REST
rest.put(Routes.applicationGuildCommands(process.env.APPLICATIONID, process.env.GUILDID), { body: commands })
  .then(() => console.log('tout les commands ont bien été charger'.green))
  .catch(console.error);

// Login to Discord with your client's token
client.login(process.env.TOKEN);