const Discord = require("discord.js");
const client = new Discord.Client();

let np = (message, queue) => {
  try {
    message.channel.send("Jetzt lauft gad " + queue[0].title);
  } catch (error) {
    message.channel.send("Im Moment lauft kua Liad us da queue");
  }
};

module.exports = np;
