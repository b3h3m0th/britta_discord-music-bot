const Command = require("../structures/Command");
import { CommandOptions } from "../types/Command";
import { ResponseType } from "../types/Response";
import { BrittaEmbed } from "../util/embed";
const {
  commands: { categories },
} = require("../config");

module.exports = class Loop extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "loop",
      description: "Loops the current song or the queue",
      categories: [categories.music],
      usages: ["song/queue"],
      examples: ["song", "queue"],
      cooldown: 2,
      voteLocked: false,
    });
  }

  async execute(message, args) {
    const player = message.client.manager.get(message.guild.id);
    if (!player)
      return message.client.response(message, ResponseType.nothingPlaying);

    if (args[0] && args[0].toLowerCase() === "queue") {
      if (player.queueRepeat) {
        player.setQueueRepeat(false);
        return message.channel.send(
          new BrittaEmbed(message, {
            author: null,
            description: "🔁 **Queue** loop is now **off**",
          })
        );
      } else {
        player.setQueueRepeat(true);
        return message.channel.send(
          new BrittaEmbed(message, {
            author: null,
            description: "🔁 **Queue** loop is now **on**",
          })
        );
      }
    } else {
      if (!player.trackRepeat) {
        player.setTrackRepeat(true);
        return message.channel.send(
          new BrittaEmbed(message, {
            author: null,
            description: "🔂 **Song** loop is now **on**",
          })
        );
      } else {
        player.setTrackRepeat(false);
        return message.channel.send(
          new BrittaEmbed(message, {
            author: null,
            description: "🔂 **Song** loop is now **off**",
          })
        );
      }
    }
  }
};
