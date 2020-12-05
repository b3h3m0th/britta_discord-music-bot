const { MessageEmbed } = require("discord.js");
const {
  commands: { categories },
} = require("../config");

module.exports = {
  name: "clone",
  cooldown: 4,
  aliases: ["cl"],
  categories: [categories.fun],
  description: "Prints a fakemessage",
  execute: async (message, args) => {
    if (!args.length)
      return message.channel.send(
        new MessageEmbed()
          .setAuthor(
            `Please provide a text and an author`,
            message.author.avatarURL()
          )
          .setColor(message.client.config.colors.failed)
      );

    try {
      args.shift();
      const messageContent = args.join(" ");
      const user = message.mentions.members.first();
      if (!user)
        return message.channel.send(
          new MessageEmbed()
            .setAuthor(
              `Please provide a valid author`,
              message.author.avatarURL()
            )
            .setColor(message.client.config.colors.failed)
        );

      const webhook = await message.channel.createWebhook(
        `${user.nickname || user.user.username}`,
        {
          avatar: user.user.avatarURL(),
        }
      );

      await webhook.send(messageContent, {
        username: user.nickname || user.username,
        avatarURL: user.user.avatarURL(),
      });
      webhook.delete();
      message.delete({ timeout: 2000 });
    } catch (err) {
      console.log(err);
    }
  },
};
