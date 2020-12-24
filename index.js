/* eslint-disable no-undef */
/**
 * Module Imports
 */
const { Client, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");
const config = require("./config.js");
const { getGuildPrefix } = require("./util/prefixUtil");
const { getIntroEmbed } = require("./util/embedUtil");
const flipnoteClient = require("alexflipnote.js");
const alexclient = new flipnoteClient(config.api.alexflipnote_token);

/**
 * Language
 */
const thisLang = "english";
const language = require(`./languages/${thisLang}`);

const client = new Client({ disableMentions: "everyone" });

client.login(config.client.token);
client.commands = new Collection();
client.queue = new Map();
client.config = config;
client.alexclient = alexclient;
const cooldowns = new Collection();

/**
 * Client Events
 */
client.on("ready", () => {
  console.log(`${client.user.tag} is online!`);
  setInterval(() => {
    let statusArray = [
      {
        type: "PLAYING",
        name: "with {users} users",
      },
      {
        type: "LISTENING",
        name: "{prefix}help",
      },
      {
        type: "WATCHING",
        name: "{servers} servers",
      },
    ];

    const status = statusArray[Math.floor(Math.random() * statusArray.length)];
    client.user.setActivity(
      status.name
        .replace("{users}", client.users.cache.size)
        .replace("{servers}", client.guilds.cache.size)
        .replace("{prefix}", config.client.prefix),
      { type: status.type }
    );
  }, 15000);
});

client.on("warn", (info) => console.log(info));
client.on("error", console.error);

/**
 * Import all commands
 */
const commandFiles = fs
  .readdirSync(path.join(__dirname, "commands"))
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(path.join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.webhookID) return;

  //PREFIX
  client.prefix = getGuildPrefix(message.guild.id);

  // BOT MENTİON
  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
    return message.channel.send(getIntroEmbed(message));
  }

  if (message.content.startsWith(client.prefix)) {
    const args = message.content.slice(client.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) return;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(
          language("warning")
            .cooldown.replace("{timeLeft}", timeLeft.toFixed(1))
            .replace("{command.name}", command.name)
        );
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply(language("error").command_error).catch(console.error);
    }
  }
});
