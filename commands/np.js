const Discord = require("discord.js");
const client = new Discord.Client();

let np = (message, queue) => {
  if (queue) {
    message.channel.send("Right now **" + queue[0].title + "** is playing.");
  } else {
    message.channel.send("There is no song playing right now");
  }
  try {
    message.channel.send("Jetzt lauft gad " + queue[0].title);
  } catch (error) {
    message.channel.send("Im Moment lauft kua Liad us da queue");
  }
};

module.exports = np;
