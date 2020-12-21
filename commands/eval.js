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
  examples: [`console.log("Hello Discord!);`],
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
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png"
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
            "```javascript\n" + `${util.inspect(output, { depth: 0 })}` + "```"
          )
          .addField("Type of output", "```" + `${type}` + "```")
          .addField(
            "Time taken",
            "```" + `${(stop[0] * 1e9 + stop[1]) / 1e6} ms` + "```"
          );

        return message.channel.send(evalEmbed);
      } catch (err) {
        console.log(err);
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
