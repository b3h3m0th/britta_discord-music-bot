const Discord = require("discord.js");
const client = new Discord.Client();
const play = require("./play");

let skip = (queue, message, voiceChannel) => {
  if (queue[1]) {
    queue.shift();
    console.log(queue[0]);
    play(queue, voiceChannel);
    message.channel.send(
      "Der song gfallt ma ned. i hob dean übersprunga, bürschle"
    );
  } else {
    message.channel.send("Es lauft grad kua Liad, des ma skippen kann");
  }
};

module.exports = skip;
