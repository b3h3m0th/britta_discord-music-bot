const Command = require("../structures/Command");
import { CommandOptions } from "../types/Command";
import { BrittaEmbed } from "../util/embed";
const {
  commands: { categories },
} = require("../config");

module.exports = class Coinflip extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "coinflip",
      description: "Tosses a coin for you",
      categories: [categories.fun],
      usages: [""],
      examples: [""],
      cooldown: 3,
      voteLocked: false,
    });
  }

  async execute(message) {
    let result;
    let random = Math.random();
    if (random > 0.5) result = "HEADS";
    else result = "TAILS";

    message.channel.send(
      new BrittaEmbed(message)
        .setColor(message.client.config.colors.primary)
        .setAuthor(`${result}`, message.client.config.resources.coinflip)
    );
  }
};
