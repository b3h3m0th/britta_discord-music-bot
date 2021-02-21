const Command = require("../structures/Command");
import { CommandOptions } from "../types/Command";
import { ResponseType } from "../types/Response";
import { BrittaEmbed, ErrorEmbed } from "../util/embed";
const {
  commands: { categories },
} = require("../config");

module.exports = class Remove extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "remove",
      aliases: ["rm"],
      description: "Removes a song from the queue",
      categories: [categories.music],
      usages: ["song_number"],
      examples: ["3", "45"],
      cooldown: 2,
      voteLocked: false,
    });
  }

  async execute(message, args) {
    const player = message.client.manager.players.get(message.guild.id);
    if (!player)
      return message.client.response(message, ResponseType.nothingPlaying);

    if (isNaN(args[0]))
      return message.channel.send(
        new ErrorEmbed(message, {
          description: " ",
          author: {
            name: "❌ Please provide a valid song number to be removed",
          },
        })
      );

    if (!args[1]) {
      if (args[0] == 0)
        return message.channel.send(
          new ErrorEmbed(message, {
            author: {
              name:
                "❌ Cannot remove a song that is playing right now. Use skip instead",
            },
          })
        );

      if (args[0] > player.queue.length)
        return message.channel.send(
          new ErrorEmbed(message, {
            author: {
              name: "❌ That song number could not be found in queue",
            },
            description: " ",
          })
        );

      const { title } = player.queue[args[0] - 1];

      player.queue.splice(args[0] - 1, 1);
      return message.channel.send(
        new BrittaEmbed(message, {
          author: { name: `✔️ Removed ${title} from the queue` },
        })
      );
    } else {
      message.channel.send(
        new ErrorEmbed(message, {
          author: {
            name: "❌ Please provide a song number that should be removed",
          },
          description: " ",
        })
      );
    }
  }
};
