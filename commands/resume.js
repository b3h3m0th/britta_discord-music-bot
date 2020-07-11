module.exports = {
  name: "resume",
  description: "Resumes the music player",
  category: "music",
  execute(message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "▶️ Song resumed by " + message.author.username,
          },
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
    }
    message.channel.send({
      embed: {
        color: message.client.messageEmbedData.color,
        author: {
          name: "❗ There is nothing playing that can be resumed",
        },
        timestamp: new Date(),
        footer: {
          text: "© Britta",
        },
      },
    });
  },
};
