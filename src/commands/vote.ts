const Command = require("../structures/Command");
import { CommandOptions } from "../types/Command";
import { BrittaEmbed } from "../util/embed";
const config = require("../config");
const {
  commands: { categories },
} = require("../config");

module.exports = class Vote extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "vote",
      description: `Vote for ${config.client.name}`,
      categories: [categories.info],
      usages: [""],
      examples: [""],
      cooldown: 2,
      voteLocked: false,
    });
  }

  async execute(message) {
    return message.channel.send(
      new BrittaEmbed(message)
        .setAuthor(
          `Vote for ${config.client.name}`,
          message.client.user.avatarURL()
        )
        .setDescription(
          `📑 [Vote here](${config.client.top_gg_vote_link}) Thank you!`
        )
    );
  }
};
