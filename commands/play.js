const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require("ytdl-core");

let play = (queue, voiceChannel, message) => {
  if (!voiceChannel) {
    message.channel.send({
      embed: {
        color: 3447003,
        author: {
          name: "❗ You are in no voice channel",
        },
        timestamp: new Date(),
        footer: {
          text: "© Britta",
        },
      },
    });
    return;
  } else {
    try {
      voiceChannel.join().then((connection) => {
        stream = ytdl(queue[0].link, {
          filter: "audioonly",
        });
        dispatcher = connection.play(stream);

        dispatcher.on("end", () => {
          queue.shift();
          if (queue.length > 0) {
            play(queue, voiceChannel, message);
          } else return;
        });
      });
    } catch (error) {
      message.channel.send({
        embed: {
          color: 3447003,
          author: {
            name: "⚠️ There was an error playing your song",
            icon_url: client.user.avatarURL,
          },
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Britta",
          },
        },
      });
    }
  }
};

module.exports = play;
