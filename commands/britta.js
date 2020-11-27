/* eslint-disable no-unused-vars */
const alexa = require("alexa-bot-api");
const chatbot = new alexa("aw2plm");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "britta",
  aliases: ["b"],
  description:
    "Britta will introduce herself. If you provide arguments after the Britta-command Britta she will start having a conversation with you",
  execute(message, args) {
    let role = message.guild.roles.cache.find((role) => role.name === "Britta");
    const prefix = message.client.config.client.prefix;

    if (!role) {
      role = message.guild.roles.create({
        name: "Britta",
        color: "#fff",
        permissions: [],
      });
      message.client.guild = message.guild;
      message.client.guild.roles.add(role);
    }

    if (args.length >= 2) {
      args.shift();
      var userMessage = args.join(" ");
      chatbot
        .getReply(userMessage)
        .then((reply) => message.channel.send(reply));
    } else {
      message.channel.send(
        new MessageEmbed()
          .setAuthor(
            `${message.client.config.client.name}`,
            message.client.user.avatarURL()
          )
          .setTitle(`👋🏻 Hello I'm ${message.client.config.client.name}`)
          .setDescription("I am your personal music bot")
          .setColor(`${message.client.config.colors.primary}`)
          .setTimestamp()
          .addField("Prefix:", "`" + prefix + "`")
      );
    }
  },
};
