/* eslint-disable no-unused-vars */
const alexa = require("alexa-bot-api");
const chatbot = new alexa("aw2plm");
const { MessageEmbed } = require("discord.js");
const { getGuildPrefix } = require("../util/prefixUtil");
const { getIntroEmbed } = require("../util/introUtil");
const {
  commands: { categories },
} = require("../config");

module.exports = {
  name: "britta",
  aliases: ["b"],
  categories: [categories.fun, categories.info],
  usages: ["", "message"],
  examples: ["", "Talk to me :D"],
  description:
    "Britta will introduce herself. If you provide arguments after the Britta-command Britta she will start having a conversation with you",
  execute(message, args) {
    let role = message.guild.roles.cache.find((role) => role.name === "Britta");

    if (!role) {
      role = message.guild.roles.create({
        name: "Britta",
        color: "#fff",
        permissions: [],
      });
      message.client.guild = message.guild;
      message.client.guild.roles.add(role);
    }

    if (args.length >= 1) {
      var userMessage = args.join(" ");
      chatbot
        .getReply(userMessage)
        .then((reply) => message.channel.send(reply));
    } else {
      message.channel.send(getIntroEmbed(message));
    }
  },
};
