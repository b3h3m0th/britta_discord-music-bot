const Command = require("../structures/Command");
import { CommandOptions } from "../types/Command";
import { BrittaEmbed } from "../util/embed";
const {
  commands: { categories },
} = require("../config");

module.exports = class Premium extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "premium",
      description: "Displays the Britta Premium purchase link",
      categories: [categories.info],
      usages: [""],
      examples: [""],
      cooldown: 2,
      voteLocked: false,
    });
  }

  async execute(message) {
    return message.channel.send(
      new BrittaEmbed(message, {
        author: { name: "🔒 Buy Britta Premium" },
        description: `Get the following Bonus features for as little as 5€ [here](${message.client.config.client.donate_link})\n\n- **Bypass** all **vote locked** commands\n- Access to **Premium audio filters** (earrape, nightcore, vaporwave, ...)\n- **Britta Premium role** on the Britta Discord server`,
      })
    );
  }
};
