/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const ytdl = require("ytdl-core");

module.exports = {
  name: "shuffle",
  description: "Shuffles the song queue",
  category: "music",
  execute(message, args) {
    if (!message.member.voice.channel) {
      message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "❗ You are not in a voice channel",
          },
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
      return;
    }

    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue.songs) {
      message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "❗ There is no music playing right now",
          },
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
      return;
    }

    if (serverQueue.songs < 2) {
      message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name:
              "❗ There has to be at least 2 songs in queue in order to shuffle them",
          },
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
      return;
    }

    shuffle(serverQueue.songs);

    message.client.queue.set(serverQueue, message.guild.id);

    const play = async (song) => {
      if (!song) {
        serverQueue.voiceChannel.leave();
        message.client.queue.delete(message.guild.id);
        return;
      }

      const dispatcher = serverQueue.connection
        .play(ytdl(song.link))
        .on("error", (error) => console.error(error));
      dispatcher.setVolumeLogarithmic(queue.volume / 100);
    };

    play(serverQueue.songs[0]);
  },
};

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
