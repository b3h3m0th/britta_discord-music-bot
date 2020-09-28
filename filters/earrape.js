/* eslint-disable no-unused-vars */
const Discord = require("discord.js");
const client = new Discord.Client();

let earrape = (message, earrapeOn, dispatcher) => {
  if (dispatcher) {
    if (!earrapeOn) {
      dispatcher.setVolume(99999);
      message.channel.send("Alta jetzt gohts ab!");
      return true;
    } else {
      dispatcher.setVolume(1);
      message.channel.send("Jetzt isch widda guat");
      return false;
    }
  } else {
    message.channel.send("Es lauft nix des ma earrapen kann");
  }
};

module.exports = earrape;
