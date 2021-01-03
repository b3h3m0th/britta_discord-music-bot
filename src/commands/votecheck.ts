const Command = require("../structures/Command");
import { CommandOptions } from "../types/Command";
import { BrittaEmbed } from "../util/embed";
const config = require("../config");
const {
  commands: { categories },
} = require("../config");
import { hasVoted } from "../util/authorization";

module.exports = class Votecheck extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "votecheck",
      description: `Shows whether you have already voted for ${config.client.name} today`,
      categories: [categories.fun],
      usages: [""],
      examples: [""],
      cooldown: 2,
      voteLocked: false,
    });
  }

  async execute(message) {
    const voted = await hasVoted(message.author, message.client);
    return message.channel.send(
      new BrittaEmbed(message)
        .setAuthor(
          voted
            ? "✔️ You have already voted today"
            : "❌ You have not voted today",
          message.author.avatarURL()
        )
        .setDescription(
          !voted ? `📑 [Vote here](${config.client.top_gg_vote_link})` : ``
        )
    );
  }
};
