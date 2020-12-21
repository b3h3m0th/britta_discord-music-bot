const { MessageEmbed } = require("discord.js");
const config = require("../config");
const {
  commands: { categories },
} = require("../config");
module.exports = {
  name: "join",
  aliases: ["j"],
  usages: [""],
  examples: [""],
  categories: [categories.music],
  description: "Joins the voice channel",
  execute: async (message) => {
    let thisLang = "english";
    const language = require(`../languages/${thisLang}`);

    const { channel } = message.member.voice;
    console.log(message.guild.voice);
    if (channel) {
      await channel.join();
      return message.channel.send(
        new MessageEmbed()
          .setColor(config.colors.primary)
          .setAuthor(
            "✔️ Hey! I joined your channel",
            message.author.avatarURL()
          )
      );
    } else {
      return message.channel
        .send(
          new MessageEmbed()
            .setAuthor(
              language("error").joinvoicechannel,
              message.author.avatarURL()
            )
            .setColor(config.colors.failed)
        )
        .catch(console.error);
    }
  },
};
