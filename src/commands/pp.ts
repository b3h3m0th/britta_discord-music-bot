const Command = require("../structures/Command");
import { CommandOptions } from "../types/Command";
import { BrittaEmbed } from "../util/embed";
const config = require("../config");
const {
  commands: { categories },
} = require("../config");

module.exports = class PP extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "pp",
      description: "Guesses somebodys pp length",
      categories: [categories.fun],
      usages: ["@user"],
      examples: [
        `@${config.dev.behemoth.name}#${config.dev.behemoth.discriminator}`,
      ],
      cooldown: 2,
      voteLocked: false,
    });
  }

  async execute(message, args) {
    try {
      const user = message.mentions.members.first();
      const min = 2;
      const max = 50;
      const limit = 5;
      const ppSize = Math.floor(Math.random() * (max - min + 1)) + min;
      let elipses = [
        "Holy sh*t",
        "WTF",
        "OMG",
        "No way!",
        "haha",
        "Unbelievable",
        "Insane",
        "How??",
      ];

      if (user) {
        const username = user.nickname ? user.nickname : user.user.username;
        const result =
          ppSize < limit
            ? `${username} doesn't have a PP :(`
            : `${username} has a **${ppSize} inch PP**. ${
                elipses[Math.floor(Math.random() * elipses.length)]
              }!`;

        return message.channel.send(
          new BrittaEmbed(message)
            .setAuthor(
              `${config.client.name} speaking facts`,
              message.client.user.avatarURL()
            )
            .setDescription(result)
        );
      } else {
        const result =
          ppSize < limit
            ? `You don't have a PP :(`
            : `You have a **${ppSize} inch PP**. ${
                elipses[Math.floor(Math.random() * elipses.length)]
              }!`;

        return message.channel.send(
          new BrittaEmbed(message)
            .setAuthor(
              `${config.client.name} speaking facts`,
              message.client.user.avatarURL()
            )
            .setDescription(result)
        );
      }
    } catch (err) {
      return console.log(err);
    }
  }
};
