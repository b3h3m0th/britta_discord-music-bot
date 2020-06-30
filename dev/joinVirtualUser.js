const Discord = require("discord.js");
const client = new Discord.Client();

let joinVirtualUser = (message, client) => {
  client.emit("guildMemberAdd", message.member);
};

module.exports = joinVirtualUser;
