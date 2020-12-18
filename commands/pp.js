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
      const max = 40;
      const limit = 5;
      const ppSize = Math.floor(Math.random() * (max - min + 1)) + min;
      const username = user.nickname ? user.nickname : user.user.username;
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
      const result =
        ppSize < limit
          ? `${username} doesn't have a pp :(`
          : `${username} has a **${ppSize} inch PP**. ${
              elipses[Math.floor(Math.random() * elipses.length)]
            }!`;

      if (user) {
        message.channel.send(
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
      console.log(err);
    }
  },
};
