const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Returns the bot's ping",
  execute: async (message, args) => {
    let ping;
    console.log(message.client.ws);

    message.channel
      .send(
        new MessageEmbed()
          .setColor(message.client.config.colors.primary)
          .setTimestamp()
          .setAuthor("🏓 Pinging...", message.client.user.avatarURL())
      )
      .then((m) => {
        ping = m.createdTimestamp - message.createdTimestamp + " ms";
        m.edit(
          new MessageEmbed()
            .setColor(message.client.config.colors.primary)
            .setTimestamp()
            .setAuthor("🏓 Pong!", message.client.user.avatarURL())
            .setDescription(
              `${message.author.username} wants to know ${message.client.config.client.name}s ping.`
            )
            .addField(":robot:  Bot Latency", "`" + ping + "`")
            .addField(
              ":satellite: API Latency",
              "`" + message.client.ws.ping + " ms`"
            )
        );
      });
  },
};
