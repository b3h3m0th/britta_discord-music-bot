const { MessageEmbed } = require("discord.js");
const {
  commands: { categories },
} = require("../config");

module.exports = {
  name: "help",
  aliases: ["h"],
  categories: [categories.info],
  description: "Display all commands and descriptions",
  execute(message) {
    let { categories } = message.client.config.commands;
    console.log(categories);
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setAuthor(
        `${message.client.config.client.name} command list`,
        message.client.user.avatarURL()
      )
      .setDescription("This is a brief overview of all of Brittas commands.")
      .setColor(`${message.client.config.colors.primary}`)
      .setTimestamp();

    for (let cat of Object.keys(categories)) {
      let cmdsOfCat = message.client.commands
        .filter((cmd) => cmd.categories.includes(categories[cat]))
        .array();
      console.log(cmdsOfCat);

      helpEmbed.addField(
        `**${categories[cat]}**`,
        cmdsOfCat.map((cmd) => "`" + cmd.name + "`").join(", ")
      );
    }

    // categories.forEach((cat) => {
    //   helpEmbed.addField(
    //     `**${cat.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
    //     `${cmd.description}`,
    //     false
    //   );
    // });

    return message.channel.send(helpEmbed).catch(console.error);
  },
};
