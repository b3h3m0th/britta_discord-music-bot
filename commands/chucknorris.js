const { MessageEmbed } = require("discord.js");
const config = require("../config");
const {
  commands: { categories },
} = require("../config");
global.fetch = require("node-fetch");

module.exports = {
  name: "chucknorris",
  categories: [categories.fun],
  usages: [""],
  examples: [""],
  description: "Tells you a Chuck Norris joke",
  execute: async (message) => {
    const res = await global.fetch("https://api.chucknorris.io/jokes/random");
    const joke = await res.json();

    return message.channel.send(
      new MessageEmbed()
        .setTimestamp()
        .setAuthor("Chuck Norris", joke.icon_url)
        .setDescription(joke.value)
        .setColor(config.colors.primary)
    );
  },
};
