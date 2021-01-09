const Command = require("../structures/Command");
import { CommandOptions } from "../types/Command";
import { BrittaEmbed, ErrorEmbed } from "../util/embed";
const {
  commands: { categories },
} = require("../config");
const config = require("../config");

module.exports = class Clone extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "clone",
      description: "Prints a fakemessage",
      categories: [categories.fun],
      aliases: ["cl"],
      usages: ["@user message"],
      examples: [
        `@${config.dev.behemoth.name}#${config.dev.behemoth.discriminator} I'm Brittas creator`,
      ],
      cooldown: 2,
      voteLocked: false,
    });
  }

  async execute(message, args) {
    if (args.length < 2)
      return message.channel.send(
        new ErrorEmbed(message, {
          author: { name: "Please provide a text and an author" },
          description: " ",
        })
      );

    try {
      args.shift();
      const messageContent = args.join(" ");
      const user = message.mentions.members.first();
      if (!user)
        return message.channel.send(
          new BrittaEmbed(message)
            .setAuthor(
              `Please provide a valid author`,
              message.author.avatarURL()
            )
            .setColor(message.client.config.colors.failed)
        );

      const webhook = await message.channel.createWebhook(
        `${user.nickname || user.user.username}`,
        {
          avatar: user.user.avatarURL(),
        }
      );

      await webhook.send(messageContent, {
        username: user.nickname || user.username,
        avatarURL: user.user.avatarURL(),
      });
      webhook.delete();
      message.delete({ timeout: 2000 });
    } catch (err) {
      console.log(err);
    }
  }
};
