const Command = require("../structures/Command");
import { CommandOptions } from "../types/Command";
import { BrittaEmbed } from "../util/embed";
const {
  commands: { categories },
} = require("../config");

module.exports = class Cat extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "cat",
      description: "Shows a cute birb picture",
      categories: [categories.fun],
      usages: [""],
      examples: [""],
      cooldown: 5,
      voteLocked: false,
    });
  }

  async execute(message) {
    try {
      let catRes = await message.client.alexclient.image.cats();
      return message.channel.send(
        new BrittaEmbed(message)
          .setAuthor("😺 Here's a cute cat for Anika")
          .setImage(catRes.file)
      );
    } catch (err) {
      console.log(err);
    }
  }
};
