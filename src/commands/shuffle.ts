const Command = require("../structures/Command");
import { CommandOptions } from "../types/Command";
import { ResponseType } from "../types/Response";
import { BrittaEmbed } from "../util/embed";
const {
  commands: { categories },
} = require("../config");

module.exports = class Shuffle extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "shuffle",
      description: "Shuffles the music queue",
      categories: [categories.music],
      usages: [""],
      examples: [""],
      cooldown: 2,
      voteLocked: false,
    });
  }

  async execute(message) {
    const player = message.client.manager.get(message.guild.id);
    if (!player)
      return message.client.response(message, ResponseType.nothingPlaying);

    player.queue.shuffle();
    return message.channel.send(
      new BrittaEmbed(message, {
        author: null,
        description: `🔀 ${message.author} shuffled the queue`,
      })
    );
  }
};
