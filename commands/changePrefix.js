const Discord = require("discord.js");
const client = new Discord.Client();

let setPrefix = (message, args, PREFIX) => {
  if (args.length >= 1) {
    switch (args[1]) {
      case "set":
        if (args.length >= 3) {
          let newPrefix = args[2];
          message.channel.send("Din neua Prefix isch jetzt: " + PREFIX);
          return newPrefix;
        } else {
          message.channel.send(
            "I hob kuan neua Prefix in dina Nochricht finda künna"
          );
          return PREFIX;
        }
        break;

      case "show":
        message.channel.send("Din aktueller Prefix isch " + PREFIX);
        break;

      default:
        message.channel.send(
          "I hilf da do amol: \nAn neua Prefix istella: `+prefix set [neua Prefix]`\nDa aktuelle Prefix zoaga: `+prefix show`"
        );
        return PREFIX;
        break;
    }
  } else {
    message.channel.send(
      "I hilf da do amol: \nAn neua Prefix istella: `+prefix set [neua Prefix]`\nDa aktuelle Prefix zoaga: `+prefix show`"
    );
    return PREFIX;
  }
};

module.exports = setPrefix;
