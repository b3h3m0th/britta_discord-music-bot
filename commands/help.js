const { MessageEmbed } = require("discord.js");
const config = require("../config");
const {
  commands: { categories },
} = require("../config");

module.exports = {
  name: "help",
  aliases: ["h"],
  categories: [categories.info],
  usages: ["", "command"],
  examples: ["", "play"],
  description: "Display all commands and descriptions",
  execute(message, args) {
    let { categories } = message.client.config.commands;

    const sendHelpEmed = () => {
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

        helpEmbed.addField(
          `**${categories[cat]}**`,
          cmdsOfCat.map((cmd) => "`" + cmd.name + "`").join(", ")
        );
      }

      return message.channel.send(helpEmbed).catch(console.error);
    };

    const sendHelpEmbed = (command) => {
      let description = `${command.description}\n\n**Usage**\n`;
      command.usages.forEach((usage) => {
        const fUsage = `${message.client.prefix}${command.name}${
          usage === "" ? "" : " "
        }${usage
          .split(" ")
          .map((u) => {
            return u !== "" ? `<${u}>` : "";
          })
          .join(" ")}`;

        description += "`" + fUsage + "`" + "\n";
      });

      command.examples.forEach((ex, index) => {
        if (index === 0) description += `\n**Example Usage**\n`;
        const fEx = `${message.client.prefix}${command.name}${
          ex === "" ? "" : " "
        }${ex}`;
        description += "`" + fEx + "`\n";
      });

      let helpCommandEmbed = new MessageEmbed()
        .setTimestamp()
        .setColor(config.colors.primary)
        .setAuthor(`${command.name} help`, message.client.user.avatarURL())
        .setDescription(description);

      return message.channel.send(helpCommandEmbed);
    };

    if (!args.length) {
      sendHelpEmed();
    } else {
      const helpCommand =
        message.client.commands.get(args[0]) ||
        message.client.commands.find(
          (cmd) => cmd.aliases && cmd.aliases.includes(args[0])
        );

      if (!helpCommand) return sendHelpEmed();

      sendHelpEmbed(helpCommand);
    }
  },
};
