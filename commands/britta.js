const alexa = require("alexa-bot-api");
const { replace } = require("ffmpeg-static");
const chatbot = new alexa("aw2plm");
const mongoose = require("mongoose");
const getGuildPrefix = require("../utils/mongoDB/queries/getGuildPrefix");

module.exports = {
  name: "britta",
  description:
    "Britta will introduce herself. If you provide arguments after the Britta-command Britta she will start having a conversation with you",
  category: "info",
  execute(message, args) {
    let role = message.guild.roles.cache.find((role) => role.name === "Britta");
    const prefix = getGuildPrefix(message);

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
      message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "Britta",
            icon_url: message.client.user.avatarURL(),
          },
          title: "👋🏻 Hello I'm Britta",
          description: "I am your personal music bot",
          fields: [
            {
              name: "PREFIX:",
              value: "`" + prefix + "`",
            },
          ],
          timestamp: new Date(),
          footer: {
            icon_url: message.client.user.avatarURL,
            text: "© Britta",
          },
        },
      });
    }
  },
};
