import { CommandOptions } from "../types/Command";
import { BrittaEmbed } from "../util/embed";
const Command = require("../structures/Command");
const config = require("../config");
const {
  commands: { categories },
} = require("../config");

module.exports = class Say extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "say",
      description: "Makes the bot say a given message",
      categories: [categories.fun],
      usages: ["message"],
      examples: ["Hello Discord!"],
      cooldown: 2,
      voteLocked: false,
    });
  }

  execute(message, args) {
    if (!args.length) {
      return message.channel.send(
        new BrittaEmbed(message, {
          color: config.colors.failed,
          author: { name: "I cannot say something empty." },
        })
      );
    } else {
      return message.channel.send(args.join(" "));
    }
  }
};
