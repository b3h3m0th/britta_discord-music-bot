const Command = require("../structures/Command");
import { CommandOptions } from "../types/Command";
import { ResponseType } from "../types/Response";
import { BrittaEmbed, ErrorEmbed } from "../util/embed";
import formatDuration from "../util/formatDuration";
const {
  commands: { categories },
} = require("../config");

module.exports = class Forward extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "forward",
      description: "Fast forwards a track (default is 10 seconds)",
      categories: [categories.music],
      usages: ["", "seconds"],
      examples: ["", "45"],
      aliases: ["fastforward", "ff"],
      cooldown: 1,
      voteLocked: true,
    });
  }

  async execute(message, args) {
    const defaultForwardTime = 10;
    const player = message.client.manager.get(message.guild.id);
    if (!player)
      return message.client.response(message, ResponseType.nothingPlaying);

    console.log(player);

    if (args[0] && !isNaN(args[0])) {
      if (player.position + args[0] * 1000 < player.queue.current.duration) {
        player.seek(player.position + args[0] * 1000);
        const parsedDuration = formatDuration(player.position);
        return message.channel.send(
          new BrittaEmbed(message, {
            description: `⏩ Fast-forwarded to \`${parsedDuration}\``,
          })
        );
      } else {
        return message.client.reponse(message, ResponseType.forwardedTooFar);
      }
    } else if (args[0] && isNaN(args[0])) {
      return message.reply(
        new ErrorEmbed(message, {
          description: " ",
          author: { name: "Please provide a valid amount of seconds" },
        })
      );
    }

    if (!args[0]) {
      if (
        player.position + defaultForwardTime * 1000 <
        player.queue.current.duration
      ) {
        player.seek(player.position + defaultForwardTime * 1000);
        const parsedDuration = formatDuration(player.position);
        return message.channel.send(
          new BrittaEmbed(message, {
            description: `⏩ Fast-forwarded to \`${parsedDuration}\``,
          })
        );
      } else {
        return message.client.reponse(message, ResponseType.forwardedTooFar);
      }
    }
  }
};
