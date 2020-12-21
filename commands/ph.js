global.fetch = require("node-fetch");
const { MessageAttachment, MessageEmbed } = require("discord.js");
const {
  commands: { categories },
} = require("../config");

module.exports = {
  name: "pornhub",
  cooldown: 4,
  aliases: ["ph"],
  categories: [categories.fun],
  usages: ["word1 word2"],
  examples: ["Porn, Hub", "Git, hub"],
  description: "Print a text in PornHub style",
  execute: async (message, args) => {
    if (!args[0]) {
      return message.channel.send(
        new MessageEmbed()
          .setAuthor(
            "Please provide 2 arguments divided by a `,`",
            message.author.avatarURL()
          )
          .setColor(message.client.config.colors.failed)
      );
    }
    if (!args.join(" ").split("").join(" ").split(" ").includes(",")) {
      return message.channel.send(
        new MessageEmbed()
          .setAuthor(
            "Please provide 2 arguments divided by a ,",
            message.author.avatarURL()
          )
          .setColor(message.client.config.colors.failed)
      );
    }

    let firstArg = args.join(" ").split(",")[0];
    let secArg;
    if (args.join(" ").split(",")[1].startsWith(" ")) {
      secArg = args.join(" ").split(",")[1].slice(1);
    } else {
      secArg = args.join(" ").split(",")[1];
    }

    try {
      let phRes = await message.client.alexclient.image.pornhub({
        text: firstArg,
        text2: secArg,
      });

      return message.channel.send(new MessageAttachment(phRes, "phtext.png"));
    } catch (err) {
      console.log(err);
    }
  },
};
