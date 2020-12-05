const { MessageEmbed } = require("discord.js");
const {
  commands: { categories },
} = require("../config");

module.exports = {
  name: "stats",
  aliases: ["statistics"],
  categories: [categories.info],
  description: "Display all commands and descriptions",
  execute(message) {
    const client = message.client;
    let totalSeconds = client.uptime / 1000;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let uptime = `${hours} hours, ${minutes} minutes and ${seconds} seconds`;

    const statsEmbed = new MessageEmbed()
      .setAuthor(
        `${message.client.user.username} stats`,
        message.client.user.avatarURL()
      )
      .setDescription(
        `
    Guild Count: ${client.guilds.cache.size.toLocaleString()}
    Channel Count: ${client.channels.cache.size.toLocaleString()}
    User Count: ${client.users.cache.size}
    Memory Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB
    Uptime: ${uptime}
    Created by: ${client.config.dev.behemoth.name}#${
          client.config.dev.behemoth.discriminator
        }`
      )
      .setTimestamp()
      .setColor(client.config.colors.primary);
    message.channel.send(statsEmbed);
  },
};
