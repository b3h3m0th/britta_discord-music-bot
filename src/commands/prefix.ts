const Command = require("../structures/Command");
import { CommandOptions } from "../types/Command";
import { BrittaEmbed } from "../util/embed";
import { getGuildPrefix, setNewGuildPrefix } from "../util/prefix";
const {
  commands: { categories },
  client,
} = require("../config");

module.exports = class Prefix extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "prefix",
      description: "Shows or edits the current bot prefix of this server",
      aliases: ["setprefix"],
      usages: ["", "new_prefix", "reset"],
      examples: ["", "+"],
      categories: [categories.config],
      cooldown: 5,
      voteLocked: false,
    });
  }

  async execute(message, args) {
    const oldPrefix = await getGuildPrefix(message.guild.id);
    if (!args.length) {
      return message.channel.send(
        new BrittaEmbed(message, {
          author: { name: "💬 The current prefix is:" },
          description: "`" + oldPrefix + "`",
          timestamp: new Date(),
        })
      );
    } else {
      let newPrefix;

      if (args[0] === "reset") {
        newPrefix = client.prefix;
        await setNewGuildPrefix(message.guild.id, newPrefix);
        return message.channel.send(
          new BrittaEmbed(message, {
            author: {
              name: `💬 ${message.author.username} has resetted the prefix to default:`,
            },
            description: "`" + newPrefix + "`",
          })
        );
      } else {
        newPrefix = args.join(" ");
        await setNewGuildPrefix(message.guild.id, newPrefix);
        return message.channel.send(
          new BrittaEmbed(message, {
            author: {
              name: `💬 ${message.author.username} set the prefix to:`,
            },
            description: "`" + newPrefix + "`",
          })
        );
      }
    }
  }
};
