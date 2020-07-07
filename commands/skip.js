module.exports = {
  name: "skip",
  description: "Skips a song of the queue",
  execute(message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!message.member.voice.channel) {
      return message.channel.send({
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
    }

    if (!serverQueue) {
      return message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "❗ There is nothing playing that can be skipped",
          },
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
    }
    serverQueue.connection.dispatcher.end(() => {
      message.channel
        .send({
          embed: {
            color: message.client.messageEmbedData.color,
            author: {
              name: "⏭️ Skipping a song",
              icon_url: message.client.user.avatarURL,
            },
            timestamp: new Date(),
            footer: {
              icon_url: message.client.user.avatarURL,
              text: "© Britta",
            },
          },
        })
        .then((m) => {
          ping = m.createdTimestamp - message.createdTimestamp + " ms";
          m.edit({
            embed: {
              color: 3447003,
              author: {
                name: "✔️ Skipped a song",
                icon_url: message.client.user.avatarURL,
              },
              timestamp: new Date(),
              footer: {
                icon_url: message.client.user.avatarURL,
                text: "© Britta",
              },
            },
          });
        });
    });
  },
};
