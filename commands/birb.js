global.fetch = require("node-fetch");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const config = require("../config");
const {
  commands: { categories },
} = require("../config");

module.exports = {
  name: "birb",
  cooldown: 3,
  categories: [categories.fun],
  usages: [""],
  examples: [""],
  description: "Returns a picture of a birb",
  execute: async (message) => {
    try {
      let birbRes = await message.client.alexclient.image.birb();
      console.log(birbRes);
      return message.channel.send(
        new MessageEmbed()
          .setTimestamp()
          .setAuthor("🐦 Here's a birb for you")
          .setImage(birbRes.file)
          .setColor(config.colors.primary)
      );
    } catch (err) {
      console.log(err);
    }
  },
};
