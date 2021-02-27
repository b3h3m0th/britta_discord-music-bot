const Command = require("../structures/Command");
import { CommandOptions } from "../types/Command";
import { BrittaEmbed } from "../util/embed";
const config = require("../config");
const {
  commands: { categories },
} = require("../config");

module.exports = class Statistics extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "statistics",
      description: "Showns statistics about the bot",
      categories: [categories.info],
      aliases: ["stats", "info"],
      usages: [""],
      examples: [""],
      cooldown: 2,
      voteLocked: false,
    });
  }

  async execute(message) {
    return message.channel.send(
      new BrittaEmbed(message, {
        author: { name: `${config.client.name} Stats` },
        description: `I was born way ${message.client.user.createdAt.toLocaleString()}`,
        fields: [
          {
            name: "Servers",
            value: `${message.client.guilds.cache.size.toLocaleString()} servers`,
            inline: true,
          },
          {
            name: "Users",
            value: `${message.client.users.cache.size} users`,
            inline: true,
          },
        ],
      })
    );
  }
};
