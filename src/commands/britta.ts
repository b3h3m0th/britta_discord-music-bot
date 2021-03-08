const Command = require("../structures/Command");
import { CommandOptions } from "../types/Command";
import { BrittaEmbed, BrittaIntroEmbed, ErrorEmbed } from "../util/embed";
import { getGuildPrefix } from "../util/prefix";
const config = require("../config");
const {
  commands: { categories },
} = require("../config");
const alexa = require("alexa-bot-api");
const chatbot = new alexa("aw2plm");

module.exports = class Britta extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "britta",
      description:
        "Britta will introduce herself. If you provide arguments Britta will start a conversation with you",
      aliases: [""],
      categories: [categories.fun],
      usages: ["message"],
      examples: ["Hello Britta"],
      cooldown: 2,
      voteLocked: false,
    });
  }

  async execute(message, args) {
    if (!args.length)
      return message.channel.send(
        new BrittaIntroEmbed(message, {
          fields: [
            {
              name: "👂 Prefix",
              value: `\`${await getGuildPrefix(message.guild.id)}\``,
              inline: false,
            },
            {
              name: "❓ Support Server",
              value: `${message.client.config.support.server.invite_link}`,
              inline: false,
            },
            {
              name: `📑 Vote for ${message.client.config.client.name}`,
              value: `${message.client.config.client.top_gg_vote_link}`,
              inline: false,
            },
            {
              name: "🛠️ Developer",
              value: `${message.client.config.dev.behemoth.name}#${message.client.config.dev.behemoth.discriminator}`,
              inline: false,
            },
          ],
        })
      );
    else {
      chatbot
        .getReply(args.join(" "))
        .then((reply) => message.channel.send(reply));
    }
  }
};
