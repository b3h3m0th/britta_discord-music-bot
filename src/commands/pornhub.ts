import { CommandOptions } from "../types/Command";
import { ErrorEmbed } from "../util/embed";
const { MessageAttachment } = require("discord.js");
const Command = require("../structures/Command");
const {
  commands: { categories },
} = require("../config");

module.exports = class Pornhub extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "pornhub",
      description: "Prints a custom message in Pornhub style",
      categories: [categories.fun],
      usages: ["word1 word2"],
      examples: ["Porn, Hub"],
      aliases: ["ph"],
      cooldown: 3,
      voteLocked: false,
    });
  }

  async execute(message, args) {
    if (!args[0]) {
      return message.channel.send(
        new ErrorEmbed(message, {
          author: {
            name: "Please provide 2 arguments divided by a " + ",",
          },
          description: " ",
        })
      );
    }
    if (!args.join(" ").split("").join(" ").split(" ").includes(",")) {
      return message.channel.send(
        new ErrorEmbed(message, {
          author: {
            name: "Please provide 2 arguments divided by a " + ",",
          },
          description: " ",
        })
      );
    }

    let firstArg = args.join(" ").split(",")[0];
    let secArg;
    if (args.join(" ").split(",")[1].startsWith(" ")) {
      secArg = args.join(" ").split(",")[1].slice(1);
    } else {
      secArg = args.join(" ").split(",")[1];
    }

    try {
      let phRes = await message.client.alexclient.image.pornhub({
        text: firstArg,
        text2: secArg,
      });

      return message.channel.send(new MessageAttachment(phRes, "phtext.png"));
    } catch (err) {
      console.log(err);
    }
  }
};
