import { CommandOptions } from "../types/Command";
import { ResponseType } from "../types/Response";
import { BrittaEmbed } from "../util/embed";
const Command = require("../structures/Command");
const {
  commands: { categories },
} = require("../config");

module.exports = class Say extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "clear",
      description: "Clears the music queue",
      categories: [categories.music],
      usages: [""],
      examples: [""],
      cooldown: 2,
      voteLocked: false,
    });
  }

  execute(message) {
    const player = message.client.manager.get(message.guild.id);

    if (!player || !player.queue.current)
      return message.client.response(message, ResponseType.nothingPlaying);

    player.queue.length = [];
    return message.channel.send(
      new BrittaEmbed(message, { author: { name: "✔️ Cleared the queue" } })
    );
  }
};
