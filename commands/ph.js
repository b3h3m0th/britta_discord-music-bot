const Discord = require("discord.js");

module.exports = {
  name: "pornhub",
  cooldown: "4",
  aliases: ["ph"],
  description: "Print a text in Pornhub style",
  execute: async (message, args) => {
    if (!args[0]) {
      return message.channel.send("No arguments");
    }
    if (!args.join(" ").split("").join(" ").split(" ").includes(",")) {
      return message.channel.send("There are no (,)");
    }
    let firstArg = args.join(" ").split(",")[0];
    let secArg;
    if (args.join(" ").split(",")[1].startsWith(" ")) {
      secArg = args.join(" ").split(",")[1].slice(1);
    } else {
      secArg = args.join(" ").split(",")[1];
    }
    let phAttachment = new Discord.MessageAttachment(
      `https://api.alexflipnote.dev/pornhub?text=${firstArg
        .split(" ")
        .join("%20")}&text2=${secArg.split(" ").join("%20")}`,
      "PHText.png"
    );

    let phEmbed = new Discord.MessageEmbed()
      .setColor("#2f3136")
      .setImage(
        `https://api.alexflipnote.dev/pornhub?text=${firstArg
          .split(" ")
          .join("%20")}&text2=${secArg.split(" ").join("%20")}`,
        "PHText.png"
      );
    return message.channel.send(phEmbed);
  },
};
