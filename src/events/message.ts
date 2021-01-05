import Event from "../structures/Event";
import { BrittaIntroEmbed, ErrorEmbed } from "../util/embed";
const path = require("path");
const Guild = require("../models/guild");
const User = require("../models/user");
const Discord = require("discord.js");

module.exports = class Message extends Event {
  constructor(client: any) {
    super(client, path.basename(__filename).split(".")[0].toLowerCase());
  }

  async run(message) {
    if (message.author.bot || !message.guild || message.webhookID) return;

    //BOT MENTION
    if (message.content.match(new RegExp(`^<@!?${this.client.user.id}>( |)$`)))
      message.channel.send(new BrittaIntroEmbed(message));

    User.findOne({ id: message.author.id }, async (err, user) => {
      if (err) return this.client.log(err);
      if (!user) {
        const newUser = new User({
          id: message.author.id,
          username: message.author.username,
          discriminator: message.author.tag.split("#")[1],
          premium: false,
        });
        await newUser.save().catch((e) => this.client.log(e));
      }
    });

    Guild.findOne({ id: message.guild.id }, async (err, guild) => {
      if (err) return this.client.log(err);
      if (!guild) {
        const newGuild = new Guild({
          id: message.guild.id,
          name: message.guild.name,
          prefix: this.client.config.client.prefix,
          premium: false,
        });
        await newGuild.save().catch((e) => this.client.log(e));
        this.client.prefix = newGuild.prefix;
      } else {
        this.client.prefix = guild.prefix;
      }

      //CHECK IF IN DEVELOPMENT
      if (this.client.config.client.name !== "Britta") this.client.prefix = "-";

      if (message.content.toLowerCase().startsWith(this.client.prefix)) {
        const args = message.content
          .slice(this.client.prefix.length)
          .trim()
          .split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command =
          this.client.commands.get(commandName) ||
          this.client.commands.find(
            (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
          );

        if (!command) return;

        if (!this.client.cooldowns.has(command.name)) {
          this.client.cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = this.client.cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 1) * 1000;

        if (timestamps.has(message.author.id)) {
          const expirationTime =
            timestamps.get(message.author.id) + cooldownAmount;

          if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(
              `Please wait ${timeLeft} more seconds before using this command again.`
            );
          }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        try {
          command.execute(message, args).catch((err) => {
            console.log(err);
            message.channel.send(new ErrorEmbed(message));
          });
        } catch (err) {
          this.client.log(err);
        }
      }
    });
  }
};
