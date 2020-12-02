const Discord = require("discord.js");
global.fetch = require("node-fetch");
const config = require("../config");

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

    try {
      const phImageRes = await fetch(
        `https://api.alexflipnote.dev/pornhub?text=${firstArg
          .split(" ")
          .join("%20")}&text2=${secArg.split(" ").join("%20")}`,
        {
          headers: {
            Authorization: config.api.alexflipnote_token,
            "User-Agent": "AlexFlipnote.js@2.2.0 by HarutoHiroki#4000",
          },
        }
      );

      console.log(phImageRes);

      message.channel.send(
        new Discord.MessageAttachment(phImageRes.body),
        "ph.jpg"
      );
    } catch (err) {
      console.log(err);
    }

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
