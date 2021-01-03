const Command = require("../structures/Command");
import createPlayer from "../player/createPlayer";
import { CommandOptions } from "../types/Command";
import { BotPermission } from "../types/Permission";
import { ResponseType } from "../types/Response";
import checkBotPermissions from "../util/checkBotPermissions";
const {
  commands: { categories },
} = require("../config");

module.exports = class Join extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "join",
      description: "Joins the voice channel",
      categories: [categories.music],
      usages: [""],
      examples: [""],
      cooldown: 5,
      voteLocked: false,
      permissions: [BotPermission.CONNECT],
    });
  }

  async execute(message) {
    if (!message.member.voice.channel)
      return message.client.response(message, ResponseType.noVoiceChannel);

    if (checkBotPermissions(message, this.permissions)) return;

    await createPlayer(message);
    return message.client.response(message, ResponseType.joinedVoiceChannel);
  }
};
