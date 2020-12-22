const { MessageEmbed } = require("discord.js");
const config = require("../config");
const {
  commands: { categories },
} = require("../config");
const { hasVoted } = require("../util/authorizationUtil");

module.exports = {
  name: "vote",
  categories: [categories.fun],
  usages: [""],
  examples: [""],
  description: `Vote for ${config.client.name}`,
  execute: async (message) => {
    hasVoted(message.author);
    return message.channel.send(
      new MessageEmbed()
        .setAuthor(`Vote for ${config.client.name}`, message.author.avatarURL())
        .setDescription(`📑 ${config.client.top_gg_vote_link}`)
        .setColor(config.colors.primary)
    );
  },
};
