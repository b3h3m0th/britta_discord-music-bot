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
  usages: ["name"],
  examples: ["Akephalo"],
  description: "Returns a picture of google reCaptcha",
  execute: async (message, args) => {
    try {
      let name = args[0];
      if (name) {
        let capRes = await message.client.alexclient.image.captcha({
          text: `${name}, you are smurfing too hard. Please verify you are human.`,
        });
        return message.channel.send(new MessageAttachment().setFile(capRes));
      } else {
        return message.channel.send(
          new MessageEmbed()
            .setColor(config.colors.failed)
            .setAuthor(
              `Please enter a name as an argument`,
              message.author.avatarURL()
            )
        );
      }
    } catch (err) {
      console.log(err);
    }
  },
};
