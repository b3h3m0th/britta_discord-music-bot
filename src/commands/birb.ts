const Command = require("../structures/Command");
import { CommandOptions } from "../types/Command";
import { BrittaEmbed, ErrorEmbed } from "../util/embed";
const {
  commands: { categories },
} = require("../config");

module.exports = class Birb extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "birb",
      description: "Shows a cute birb picture",
      categories: [categories.fun],
      usages: [""],
      examples: [""],
      cooldown: 2,
      voteLocked: false,
    });
  }

  async execute(message) {
    try {
      const birbRes = await message.client.alexclient.image.birb();
      return message.channel.send(
        new BrittaEmbed(message, {
          timestamp: new Date(),
          author: { name: "🐦 Here's a birb for you" },
          image: { url: birbRes.file },
        })
      );
    } catch (err) {
      console.log(err);
      return message.channel.send(new ErrorEmbed(message));
    }
  }
};
