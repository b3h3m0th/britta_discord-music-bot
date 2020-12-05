const {
  commands: { categories },
} = require("../config");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "coinflip",
  description: "Flips a coin for you",
  categories: [categories.fun],
  aliases: ["cf", "flipacoin"],
  execute: (message) => {
    var result;
    var random = Math.random();
    if (random > 0.5) result = "HEADS";
    else result = "TAILS";

    message.channel.send(
      new MessageEmbed()
        .setColor(message.client.config.colors.primary)
        .setAuthor(`${result}`, message.client.config.resources.coinflip)
    );
  },
};
