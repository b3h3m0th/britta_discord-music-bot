const Discord = require("discord.js");
const client = new Discord.Client();

let join = (message) => {
  if (message.member.voice.channel) {
    message.member.voice.channel.join().then((connection) => {
      connection.play("../assets/audios/britta_join.mp3", {
        volume: 5,
      });
      message.channel.send("Servus");
    });
  } else {
    message.channel.send("Du befindesch di ned in uanam Sprachkanal");
  }
};

module.exports = join;
