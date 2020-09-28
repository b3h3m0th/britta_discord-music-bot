/* eslint-disable no-unused-vars */
module.exports = {
  name: "pause",
  description: "Pauses the music player",
  category: "music",
  execute(message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "⏸️ Song paused by " + message.author.username,
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
          name: "❗ There is nothing playing that can be paused",
        },
        timestamp: new Date(),
        footer: {
          text: "© Britta",
        },
      },
    });
  },
};
