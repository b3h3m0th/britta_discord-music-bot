const Command = require("../structures/Command");
import { CommandOptions } from "../types/Command";
import { ResponseType } from "../types/Response";
const {
  commands: { categories },
} = require("../config");

module.exports = class Leave extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "leave",
      description: "Leaves the voice channel",
      categories: [categories.music],
      usages: [""],
      examples: [""],
      cooldown: 3,
      voteLocked: false,
    });
  }

  async execute(message) {
    try {
      const player = message.client.manager.get(message.guild.id);

      if (player) {
        player.destroy();
        player.playingEmbed.delete();
      } else message.member.voice.channel.leave();

      return message.client.response(message, ResponseType.leftVoiceChannel);
    } catch (error) {
      return message.client.response(message, ResponseType.leftVoiceChannel);
    }
  }
};
