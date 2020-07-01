const Discord = require("discord.js");
const client = new Discord.Client();

let join = (message) => {
  if (message.member.voice.channel) {
    message.member.voice.channel.join().then((connection) => {
      connection.play("../assets/audios/britta_join.mp3", {
        volume: 5,
      });
      message.channel.send({
        embed: {
          color: 3447003,
          author: {
            name: "✔️ Hey, i joined your voice channel",
          },
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
    });
  } else {
    message.channel.send({
      embed: {
        color: 3447003,
        author: {
          name: "❗ You are not in a voice channel",
        },
        timestamp: new Date(),
        footer: {
          text: "© Britta",
        },
      },
    });
  }
};

module.exports = join;
