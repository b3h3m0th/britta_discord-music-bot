const Command = require("../structures/Command");
import { CommandOptions } from "../types/Command";
import { BrittaEmbed } from "../util/embed";
const config = require("../config");
const {
  commands: { categories },
} = require("../config");

module.exports = class Statistics extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "statistics",
      description: "Showns statistics about the bot",
      categories: [categories.info],
      aliases: ["stats", "info"],
      usages: [""],
      examples: [""],
      cooldown: 2,
      voteLocked: false,
    });
  }

  async execute(message) {
    let totalSeconds = message.client.uptime / 1000;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let uptime = `${hours} hours, ${minutes} minutes and ${seconds} seconds`;

    return message.channel.send(
      new BrittaEmbed(message, {
        author: { name: `${config.client.name} Stats` },
        description: `I was born ${message.client.user.createdAt.toLocaleString()}`,
        fields: [
          {
            name: "🏠 Servers",
            value: `${message.client.guilds.cache.size.toLocaleString()} servers`,
            inline: true,
          },
          {
            name: "👤 Users",
            value: `${message.client.users.cache.size} users`,
            inline: true,
          },
          {
            name: "Uptime",
            value: `\`\`\`${uptime}\`\`\``,
          },
          //   { name: "YouTube API", value: `\`✔️ connected\``, inline: true },
          //   { name: "Spotify", value: `\`✔️ connected\``, inline: true },
          //   { name: "SoundCloud", value: `\`✔️ connected\``, inline: true },
          //   { name: "BandCamp", value: `\`✔️ connected\``, inline: true },
          //   { name: "Twitch", value: `\`✔️️ connected\``, inline: true },
        ],
      })
    );
  }
};
