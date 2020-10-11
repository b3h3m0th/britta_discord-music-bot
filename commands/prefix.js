/* eslint-disable no-unused-vars */
const { MessageAttachment } = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "prefix",
  description: "Sets a new, custom prefix for the bot",
  category: "info",
  async execute(message, args) {
    let prefixes = JSON.parse(
      fs.readFileSync(__dirname + "/prefixes.json", "utf-8")
    );
    console.log(prefixes);
    if (args.length >= 2) {
      if (
        message.member.hasPermission("MOVE_MEMBERS") ||
        message.client.admins.filter(
          (admin) => admin.id == message.member.user.id
        ).length === 1
      ) {
        prefixes[message.guild.id] = {
          prefixes: args[1],
        };

        fs.writeFile(
          __dirname + "/prefixes.json",
          JSON.stringify(prefixes),
          (err) => {
            if (err) console.log(err);
          }
        );

        message.channel.send({
          embed: {
            color: message.client.messageEmbedData.color,
            author: {
              name: "💬 " + message.author.username + " set the the prefix to ",
            },
            description: "`" + prefixes[message.guild.id].prefixes + "`",
            timestamp: new Date(),
            footer: {
              text: "© Britta",
            },
          },
        });
      }
    } else {
      let prefix;
      if (prefixes[message.guild.id])
        prefix = prefixes[message.guild.id].prefixes;
      else prefix = message.client.PREFIX;
      message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "💬 The current prefix is:",
          },
          description: "`" + prefix + "`",
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
    }
  },
};
