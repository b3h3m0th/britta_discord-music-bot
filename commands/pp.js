const { MessageEmbed } = require("discord.js");
const config = require("../config");
const {
  commands: { categories },
} = require("../config");

module.exports = {
  name: "pp",
  categories: [categories.fun],
  usages: ["@user"],
  examples: [
    `@${config.dev.behemoth.name}#${config.dev.behemoth.discriminator}`,
  ],
  description: "Tells the pp size of somebody",
  execute: async (message, args) => {
    try {
      const user = message.mentions.members.first();
      const min = 2;
      const max = 50;
      const limit = 5;
      const ppSize = Math.floor(Math.random() * (max - min + 1)) + min;
      let elipses = [
        "Holy sh*t",
        "WTF",
        "OMG",
        "No way!",
        "haha",
        "Unbelievable",
        "Insane",
        "How??",
      ];

      if (user) {
        const username = user.nickname ? user.nickname : user.user.username;
        const result =
          ppSize < limit
            ? `${username} doesn't have a PP :(`
            : `${username} has a **${ppSize} inch PP**. ${
                elipses[Math.floor(Math.random() * elipses.length)]
              }!`;

        return message.channel.send(
          new MessageEmbed()
            .setColor(config.colors.primary)
            .setAuthor(
              `${config.client.name} speaking facts:`,
              message.client.user.avatarURL()
            )
            .setDescription(result)
        );
      } else {
        const result =
          ppSize < limit
            ? `You don't have a PP :(`
            : `You have a **${ppSize} inch PP**. ${
                elipses[Math.floor(Math.random() * elipses.length)]
              }!`;

        return message.channel.send(
          new MessageEmbed()
            .setColor(config.colors.primary)
            .setAuthor(
              `${config.client.name} speaking facts:`,
              message.client.user.avatarURL()
            )
            .setDescription(result)
        );
      }
    } catch (err) {
      return console.log(err);
    }
  },
};
