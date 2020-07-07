const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require("ytdl-core");

module.exports = {
  name: "play",
  description: "Plays songs from queue",
  async execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!message.member.voice.channel) {
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
    }

    if (!queue) {
      message.channel.send({
        embed: {
          color: 3447003,
          author: {
            name: "❗ There are no songs in queue",
          },
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
      return;
    }

    if (queue.songs.length <= 0) {
      message.channel.send({
        embed: {
          color: 3447003,
          author: {
            name: "❗ There are no songs in queue",
          },
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
      return;
    }

    const dispatcher = queue.connection
      .play(ytdl(queue.songs[0].link))
      .on("finish", () => {
        queue.songs.shift();
        play(queue.songs[0]);
      })
      .on("error", (error) => console.error(error));
    dispatcher.setVolumeLogarithmic(queue.volume / 5);
    message.channel.send({
      embed: {
        color: 3447003,
        author: {
          name: "🎵 Playing songs from your queue",
        },
        timestamp: new Date(),
        footer: {
          text: "© Britta",
        },
      },
    });
  },
};
