import { CommandOptions } from "../types/Command";
import { BrittaEmbed } from "../util/embed";
const Command = require("../structures/Command");
const {
  commands: { categories },
} = require("../config");

module.exports = class Ping extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "ping",
      description: "Shows the bots ping",
      categories: [categories.info],
      usages: [""],
      examples: [""],
      cooldown: 3,
      voteLocked: false,
    });
  }

  execute(message) {
    let ping: string;

    message.channel
      .send(
        new BrittaEmbed(message, {
          author: { name: "🏓 Pinging..." },
        })
      )
      .then((m) => {
        ping = m.createdTimestamp - message.createdTimestamp + " ms";
        m.edit(
          new BrittaEmbed(message, {
            author: { name: "🏓 Pong!" },
            fields: [
              { name: ":robot:  Bot Latency", value: "`" + ping + "`" },
              {
                name: ":satellite:  API Latency",
                value: "`" + message.client.ws.ping + " ms`",
              },
            ],
            timestamp: new Date(),
          })
        );
      });
  }
};
