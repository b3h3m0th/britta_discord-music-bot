const Command = require("../structures/Command");
import { CommandOptions } from "../types/Command";
import { BrittaEmbed, BrittaIntroEmbed, ErrorEmbed } from "../util/embed";
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
      return message.channel.send(new BrittaIntroEmbed(message));
    else {
      chatbot
        .getReply(args.join(" "))
        .then((reply) => message.channel.send(reply));
    }
  }
};
