const { MessageEmbed } = require("discord.js");
const config = require("../config");
const {
  commands: { categories },
} = require("../config");
const { hasVoted } = require("../util/authorizationUtil");

module.exports = {
  name: "votecheck",
  categories: [categories.info],
  usages: [""],
  examples: [""],
  description: `Shows whether you have already voted for ${config.client.name} today`,
  execute: async (message) => {
    const voted = await hasVoted(message.author);
    return message.channel.send(
      new MessageEmbed()
        .setAuthor(
          voted
            ? "✔️ You have already voted today"
            : "❌ You have not voted today",
          message.author.avatarURL()
        )
        .setDescription(
          !voted ? `📑 [Vote here](${config.client.top_gg_vote_link})` : ``
        )
        .setColor(config.colors.primary)
    );
  },
};
