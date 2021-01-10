const Command = require("../structures/Command");
const util = require("util");
import { CommandOptions } from "../types/Command";
import { BrittaEmbed } from "../util/embed";
const { isDeveloper } = require("../util/authorization");
const {
  commands: { categories },
} = require("../config");

module.exports = class Eval extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "eval",
      description: "Evaluates JavaScript code",
      categories: [categories.owner],
      usages: ["your_code"],
      examples: [`const myVariable = "Hello Discord"; myVariable;`],
      cooldown: 2,
      voteLocked: false,
    });
  }

  async execute(message, args) {
    if (isDeveloper(message.author)) {
      const input = args.join(" ");
      let output;
      let type;
      let evalEmbed = new BrittaEmbed(message)
        .setTimestamp()
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

        const filter = (reaction: any, user: any) =>
          user.id !== message.client.user.id;
        const collector = evalMessage.createReactionCollector(filter, {
          time: 2000,
        });

        collector.on("collect", (reaction, user) => {
          if (reaction.emoji.name === "❌") {
            evalMessage.reactions.removeAll();
            evalMessage.edit(
              new BrittaEmbed(message)
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
              new BrittaEmbed(message)
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
        new BrittaEmbed(message).setAuthor(
          "Only the bot developers have access to this command!",
          message.author.avatarURL()
        )
      );
    }
  }
};
