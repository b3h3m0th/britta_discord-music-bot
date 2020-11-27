/* eslint-disable no-unused-vars */
const fs = require("fs");
const { getAllGuildPrefixes, getGuildPrefix } = require("../util/prefixUtil");
const { MessageEmbed } = require("discord.js");
const path = require("path");

module.exports = {
  name: "prefix",
  description: "Sets a new, custom prefix for the bot",
  async execute(message, args) {
    let prefixes = getAllGuildPrefixes();
    console.log(args);

    if (args.length) {
      prefixes[message.guild.id] = {
        prefix: args[0],
      };

      fs.writeFileSync("./data/prefixes.json", JSON.stringify(prefixes));

      message.channel.send(
        new MessageEmbed()
          .setColor(message.client.config.colors.primary)
          .setAuthor(`💬 ${message.author.username} set the prefix to `)
          .setDescription("`" + getGuildPrefix(message.guild.id) + "`")
          .setTimestamp()
      );
    } else {
      message.channel.send(
        new MessageEmbed()
          .setColor(message.client.config.colors.primary)
          .setAuthor(`💬 The current prefix is:`)
          .setDescription("`" + getGuildPrefix(message.guild.id) + "`")
          .setTimestamp()
      );
    }
  },
};
