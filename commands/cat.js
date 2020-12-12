global.fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const config = require("../config");
const {
  commands: { categories },
} = require("../config");

module.exports = {
  name: "cat",
  cooldown: 3,
  categories: [categories.fun],
  usages: [""],
  examples: [""],
  aliases: ["pussy"],
  description: "Sends a cat image",
  execute: async (message) => {
    try {
      let catRes = await message.client.alexclient.image.cats();
      return message.channel.send(
        new MessageEmbed()
          .setTimestamp()
          .setAuthor("😺 Here's a cute cat for Anika")
          .setImage(catRes.file)
          .setColor(config.colors.primary)
      );
    } catch (err) {
      console.log(err);
    }
  },
};
