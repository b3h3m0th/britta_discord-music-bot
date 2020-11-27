const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Display all commands and descriptions",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setAuthor(
        `${message.client.config.client.name} loves to help you`,
        message.client.user.avatarURL()
      )
      .setDescription("This is a brief overview of all of Brittas commands.")
      .setColor(`${message.client.config.colors.primary}`)
      .setTimestamp();

    commands.forEach((cmd) => {
      helpEmbed.addField(
        `**${message.client.prefix}${cmd.name} ${
          cmd.aliases ? `(${cmd.aliases})` : ""
        }**`,
        `${cmd.description}`,
        true
      );
    });

    return message.channel.send(helpEmbed).catch(console.error);
  },
};
