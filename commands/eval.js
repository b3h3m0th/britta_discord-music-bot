const util = require("util");
const { MessageEmbed } = require("discord.js");
const config = require("../config");
const {
  commands: { categories },
} = require("../config");
const { isDeveloper } = require("../util/authorizationUtil");

module.exports = {
  name: "eval",
  cooldown: 2,
  categories: [categories.owner],
  usages: ["your_code"],
  examples: [`const myVariable = "Hello Discord"; myVariable;`],
  execute: async (message, args) => {
    if (isDeveloper(message.author)) {
      const input = args.join(" ");
      let output;
      let type;
      let evalEmbed = new MessageEmbed()
        .setTimestamp()
        .setColor(config.colors.primary)
        .setAuthor(
          "JavaScript eval",
          "https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png"
        );

      try {
        const start = process.hrtime();
        output = eval(input);
        if (output instanceof Promise) output = await output;
        const stop = process.hrtime(start);
        type = typeof eval(input);

        evalEmbed
          .addField("Input", "```javascript\n" + `${input}` + "```")
          .addField(
            "Output",
            "```javascript\n" +
              `${util.inspect(output, { depth: 0 }).substring(0, 1000)}` +
              "```"
          )
          .addField("Type of output", "```javascript\n" + `${type}` + "```")
          .addField(
            "Execution time",
            "```" + `${(stop[0] * 1e9 + stop[1]) / 1e6} ms` + "```"
          );

        const evalMessage = await message.channel.send(evalEmbed);
        await evalMessage.react("❌");

        const filter = (reaction, user) => user.id !== message.client.user.id;
        const collector = evalMessage.createReactionCollector(filter, {
          time: 2000,
        });

        collector.on("collect", (reaction, user) => {
          if (reaction.emoji.name === "❌") {
            evalMessage.reactions.removeAll();
            evalMessage.edit(
              new MessageEmbed()
                .setColor(config.colors.primary)
                .setAuthor(
                  "Javascript eval",
                  "https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png"
                )
                .setTimestamp()
                .setDescription(
                  "```\n" +
                    `The output of this eval has been deleted by ${user.username}#${user.discriminator}` +
                    "```"
                )
            );
          }
        });
      } catch (err) {
        evalEmbed
          .addField("Input", "```javascript\n" + `${input}` + "```")
          .addField("Output", "```javascript\n" + `${err}` + "```")
          .addField(
            "Type of output",
            "```javascript\n" + `${typeof err}` + "```"
          );
        const evalMessage = await message.channel.send(evalEmbed);
        await evalMessage.react("❌");

        const filter = (reaction, user) => user.id !== message.client.user.id;
        const collector = evalMessage.createReactionCollector(filter, {
          time: 2000,
        });

        collector.on("collect", (reaction, user) => {
          if (reaction.emoji.name === "❌") {
            evalMessage.reactions.removeAll();
            evalMessage.edit(
              new MessageEmbed()
                .setColor(config.colors.primary)
                .setAuthor(
                  "Javascript eval",
                  "https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png"
                )
                .setTimestamp()
                .setDescription(
                  "```\n" +
                    `The output of this eval has been deleted by ${user.username}#${user.discriminator}` +
                    "```"
                )
            );
          }
        });
      }
    } else {
      return message.channel.send(
        new MessageEmbed()
          .setColor(config.colors.failed)
          .setAuthor(
            "Only the bot developers have access to this command!",
            message.author.avatarURL()
          )
      );
    }
  },
};
