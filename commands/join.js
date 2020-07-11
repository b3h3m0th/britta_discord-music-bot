module.exports = {
  name: "join",
  description: "Joins your voice channel",
  category: "music",
  execute(message, args) {
    if (message.member.voice.channel) {
      message.member.voice.channel.join().then((connection) => {
        connection.play("./assets/audios/britta_join.mp3", {
          volume: 1,
        });
        message.channel.send({
          embed: {
            color: message.client.messageEmbedData.color,
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
  },
};
