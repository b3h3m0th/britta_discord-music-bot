const Discord = require("discord.js");
const client = new Discord.Client();

let clear = (message, queue) => {
  message.channel.send("Dine Liste isch jetzt widda leer wia a leeres array");
  queue = [];
};

module.exports = clear;
