global.fetch = require("node-fetch");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const config = require("../config");
const {
  commands: { categories },
} = require("../config");

module.exports = {
  name: "captcha",
  cooldown: 3,
  categories: [categories.fun],
  usages: ["@user"],
  examples: [
    `@${config.dev.behemoth.name}#${config.dev.behemoth.discriminator}`,
  ],
  description: "Returns a picture of Google reCaptcha",
  execute: async (message) => {
    try {
      let user = message.mentions.members.first();
      if (user) {
        let capRes = await message.client.alexclient.image.captcha({
          text: `${
            user.nickname ? user.nickname : user.user.username
          }, you are smurfing too hard. Please verify you are human.`,
        });
        return message.channel.send(new MessageAttachment().setFile(capRes));
      } else {
        return message.channel.send(
          new MessageEmbed()
            .setColor(config.colors.failed)
            .setAuthor(
              `Please enter a user as a paramter`,
              message.author.avatarURL()
            )
        );
      }
    } catch (err) {
      console.log(err);
    }
  },
};
