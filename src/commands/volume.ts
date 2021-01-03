const Command = require("../structures/Command");
import { CommandOptions } from "../types/Command";
import { ResponseType } from "../types/Response";
import { BrittaEmbed, ErrorEmbed } from "../util/embed";
const {
  commands: { categories },
} = require("../config");

module.exports = class Volume extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "volume",
      description: "Sets a new, or shows the current volume",
      categories: [categories.music],
      aliases: ["v"],
      usages: ["", "new_volume"],
      examples: ["", "90"],
      cooldown: 5,
      voteLocked: false,
    });
  }

  async execute(message, args) {
    const player = message.client.manager.get(message.guild.id);

    if (!player)
      return message.client.response(message, ResponseType.nothingPlaying);

    if (!args[0]) {
      return message.channel.send(
        new BrittaEmbed(message, {
          author: null,
          description: `🔉 Currrent volume: \` ${player.volume}% \``,
        })
      );
    } else {
      if (isNaN(args[0]) || parseInt(args[0]) < 0 || parseInt(args[0]) > 100) {
        return message.channel.send(
          new ErrorEmbed(message, {
            author: null,
            description: "Please provide a valid value ` (0-100) `",
          })
        );
      } else {
        player.setVolume(args[0]);
        return message.channel.send(
          new BrittaEmbed(message, {
            author: null,
            description: `${
              parseInt(args[0]) >= player.volume ? "🔊" : "🔈"
            } Volume set to \` ${args[0]}% \``,
          })
        );
      }
    }
  }
};
