const Command = require("../structures/Command");
import { CommandOptions } from "../types/Command";
import { ResponseType } from "../types/Response";
import { BrittaEmbed } from "../util/embed";
const {
  commands: { categories },
} = require("../config");

module.exports = class Pause extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "pause",
      description: "Pauses the song",
      categories: [categories.music],
      aliases: ["stop"],
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

    player.pause(player.playing);

    return message.channel.send(
      new BrittaEmbed(message, {
        author: null,
        description: ` ${
          player.playing
            ? "▶️ Music is now playing again"
            : "⏸️ Music is now paused"
        }`,
      })
    );
  }
};
