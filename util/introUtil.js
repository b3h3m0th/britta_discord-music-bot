const { MessageEmbed } = require("discord.js");
const config = require("../config");

module.exports = {
  getIntroEmbed: (message) => {
    return new MessageEmbed()
      .setAuthor(
        `${message.client.config.client.name}`,
        message.client.user.avatarURL()
      )
      .setTitle(`👋🏻 Hello I'm ${message.client.config.client.name}`)
      .setDescription("I am your personal music bot")
      .setColor(`${message.client.config.colors.primary}`)
      .setTimestamp()
      .addField("Prefix:", "`" + message.client.prefix + "`", false)
      .addFields(
        {
          name: "🛠️ Developer",
          value: `${config.dev.behemoth.name}#${config.dev.behemoth.discriminator}`,
          inline: false,
        },
        {
          name: "❓ Support Server",
          value: `${config.support.server.invite_link}`,
          inline: false,
        },
        {
          name: `📑 Vote for ${config.client.name}`,
          value: `${config.client.top_gg_vote_link}`,
          inline: false,
        }
      );
  },
};
