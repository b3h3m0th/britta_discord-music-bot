const Discord = require("discord.js");
const client = new Discord.Client();

let help = (message) => {
  message.channel.send("Uansch musch wissa. Vo da Britta krigsch kua Hilfe");
};

module.exports = help;
