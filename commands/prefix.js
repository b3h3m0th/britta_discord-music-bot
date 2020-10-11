/* eslint-disable no-unused-vars */
const Guild = require("../utils/mongoDB/models/guild");
const mongoose = require("mongoose");
const getGuildPrefix = require("../utils/mongoDB/queries/getGuildPrefix");

module.exports = {
  name: "prefix",
  description: "Sets a new, custom prefix for the bot",
  category: "info",
  async execute(message, args) {
    var currentPrefix = getGuildPrefix(message);
    if (args.length >= 2) {
      if (
        message.member.hasPermission("MOVE_MEMBERS") ||
        message.client.admins.filter(
          (admin) => admin.id == message.member.user.id
        ).length == 1
      ) {
        var newPrefix = args[1].trim();
        await Guild.updateOne(
          { guildID: message.guild.id },
          { guildName: message.guild.name },
          { prefix: newPrefix }
        );

        if (
          message.client.admins.filter(
            (admin) => admin.id == message.member.user.id
          ).length == 1
        ) {
          message.channel.send({
            embed: {
              color: message.client.messageEmbedData.color,
              author: {
                name:
                  "✔️ Prefix set to: " +
                  newPrefix +
                  " by " +
                  message.member.user.username +
                  " (" +
                  message.client.NAME +
                  " Developer)",
              },
              timestamp: new Date(),
              footer: {
                text: "© Britta",
              },
            },
          });
        } else {
          message.channel.send({
            embed: {
              color: message.client.messageEmbedData.color,
              author: {
                name: "✔️ Prefix set to: `" + newPrefix + "`",
              },
              timestamp: new Date(),
              footer: {
                text: "© Britta",
              },
            },
          });
        }
      } else {
        message.channel.send({
          embed: {
            color: message.client.messageEmbedData.color,
            author: {
              name: "❗ You don't have permissions to set a new prefix",
              icon_url: message.author.avatarURL(),
            },
            timestamp: new Date(),
            footer: {
              text: "© Britta",
            },
          },
        });
      }
    } else {
      message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "💬 The current prefix is:",
          },
          description: "`" + currentPrefix + "`",
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
    }
  },
};
