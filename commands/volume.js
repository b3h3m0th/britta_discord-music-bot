module.exports = {
  name: "volume",
  description: "Adjusts Brittas volume (1-100%)",
  category: "music",
  execute(message, args) {
    const channel = message.member.voice.channel;
    if (!channel) {
      message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "❗ You need to be in a voice channel to adjust the volume",
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
    try {
      if (!args[1]) {
        message.channel.send({
          embed: {
            color: message.client.messageEmbedData.color,
            author: {
              name: "🔊The current volume is " + serverQueue.volume + "%",
            },
            timestamp: new Date(),
            footer: {
              text: "© Britta",
            },
          },
        });
        return;
      }
    } catch (error) {
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

    try {
      if (Number.isInteger(parseInt(args[1]))) {
        var newVolume = args[1];
        serverQueue.volume = newVolume;
        serverQueue.connection.dispatcher.setVolumeLogarithmic(
          serverQueue.volume / 100
        );
        message.channel.send({
          embed: {
            color: message.client.messageEmbedData.color,
            author: {
              name: "🔊 Volume set to " + serverQueue.volume + "%",
            },
            timestamp: new Date(),
            footer: {
              text: "© Britta",
            },
          },
        });
      } else {
        message.channel.send({
          embed: {
            color: message.client.messageEmbedData.color,
            author: {
              name: "❗ Couldn't find a new volume",
            },
            timestamp: new Date(),
            footer: {
              text: "© Britta",
            },
          },
        });
      }
    } catch (error) {
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
    }
  },
};
