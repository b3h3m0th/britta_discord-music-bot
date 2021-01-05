const Command = require("../structures/Command");
import { CommandOptions } from "../types/Command";
import { ResponseType } from "../types/Response";
import { BrittaEmbed, ErrorEmbed } from "../util/embed";
const {
  commands: { categories },
} = require("../config");

module.exports = class Skipto extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "skipto",
      description: "Skip multiple songs in the queue",
      categories: [categories.music],
      aliases: ["s"],
      usages: ["song_number"],
      examples: ["3"],
      cooldown: 2,
      voteLocked: false,
    });
  }

  async execute(message, args) {
    if (isNaN(args[0]))
      return message.channel.send(
        new ErrorEmbed(message, {
          author: { name: "Please provide a valid number" },
          description: null,
        })
      );
    if (args[0] === 0)
      return message.channel.send(
        new ErrorEmbed(message, {
          author: { name: "Cannot skip to the currently playing song" },
          description: " ",
        })
      );

    const player = message.client.manager.get(message.guild.id);
    if (!player)
      return message.client.response(message, ResponseType.nothingPlaying);

    if (
      args[0] > player.queue.length ||
      (args[0] && !player.queue[args[0] - 1])
    )
      return message.channel.send(
        new ErrorEmbed(message, {
          author: { name: "That song could not be found" },
          description: " ",
        })
      );
    const { title } = player.queue[args[0] - 1];
    if (args[0] == 1) player.stop();
    player.queue.splice(0, args[0] - 1);
    player.stop();

    return message.channel.send(
      new BrittaEmbed(message, {
        author: null,
        description: `⏭️ Skipped to **${title}**`,
      })
    );
  }
};
