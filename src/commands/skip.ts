const Command = require("../structures/Command");
import { CommandOptions } from "../types/Command";
import { ResponseType } from "../types/Response";
import { BrittaEmbed } from "../util/embed";
const {
  commands: { categories },
} = require("../config");

module.exports = class Skip extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "skip",
      description: "Skips a song",
      categories: [categories.music],
      aliases: ["next", "s"],
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

    if (player.trackRepeat) player.setTrackRepeat(false);
    if (player.queueRepeat) player.setQueueRepeat(false);
    if (player) player.stop();
    return message.channel.send(
      new BrittaEmbed(message, {
        author: null,
        description: `⏭️ ${message.author} skipped a song`,
      })
    );
  }
};
