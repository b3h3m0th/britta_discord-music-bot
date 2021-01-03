const Command = require("../structures/Command");
import { CommandOptions } from "../types/Command";
import { BrittaEmbed } from "../util/embed";
const {
  commands: { categories },
} = require("../config");
const fetch = require("node-fetch");

module.exports = class Chucknorris extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "chucknorris",
      description: "Tells you a Chuck Norris joke",
      categories: [categories.fun],
      usages: [""],
      examples: [""],
      cooldown: 5,
      voteLocked: false,
    });
  }

  async execute(message) {
    try {
      const res = await fetch("https://api.chucknorris.io/jokes/random");
      const joke = await res.json();

      return message.channel.send(
        new BrittaEmbed(message)
          .setTimestamp()
          .setAuthor("Chuck Norris", joke.icon_url)
          .setDescription(joke.value)
      );
    } catch (err) {
      console.log(err);
    }
  }
};
