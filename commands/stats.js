const { MessageEmbed } = require("discord.js");
const config = require("../config");
const {
  commands: { categories },
} = require("../config");

module.exports = {
  name: "stats",
  aliases: ["statistics"],
  categories: [categories.info],
  usages: ["song_name"],
  examples: [""],
  description: "Display all commands and descriptions",
  execute(message) {
    const client = message.client;
    let totalSeconds = client.uptime / 1000;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let uptime = `${hours} hours ${minutes} min ${seconds} sec`;

    const statsEmbed = new MessageEmbed()
      .setAuthor(
        `${message.client.user.username} Stats`,
        message.client.user.avatarURL()
      )
      .setTimestamp()
      .setColor(client.config.colors.primary)
      .addFields([
        {
          name: "❕ Commands",
          value: "`" + client.commands.array().length + "`",
          inline: true,
        },
        {
          name: "🏘️ Guilds",
          value: "`" + client.guilds.cache.size.toLocaleString() + "`",
          inline: true,
        },
        {
          name: "👥 Users",
          value: "`" + client.users.cache.size.toLocaleString() + "`",
          inline: true,
        },
        {
          name: "💾 Memory Usage",
          value:
            "`" +
            (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) +
            "MB`",
          inline: true,
        },
        {
          name: "⏱️ Uptime",
          value: "`" + uptime + "`",
          inline: true,
        },
        {
          name: "🛠️ Developers",
          value:
            "`" +
            `${config.dev.behemoth.name}#${config.dev.behemoth.discriminator}` +
            "`",
          inline: true,
        },
        {
          name: "\u200B",
          value: `[📑 Vote](${config.client.top_gg_vote_link}) | [❓ Support](${config.client.top_gg_vote_link}) | [📢 Invite](${config.client.invite_link})`,
        },
      ]);

    message.channel.send(statsEmbed);
  },
};
