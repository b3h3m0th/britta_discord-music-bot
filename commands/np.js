/* eslint-disable no-unused-vars */
module.exports = {
  name: "np",
  description: "Shows the currently playing song",
  category: "music",
  execute(message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) {
      return message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "❗ There is no song of the queue playing right now",
          },
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
    }
    if (serverQueue.songs.length >= 1) {
      message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: serverQueue.songs[0].title,
            icon_url:
              "https://images-ext-1.discordapp.net/external/9_3dcPqCXGMU3WFySOvtVYjIKsZnN6zcyg7oVTn8Zlw/%3Fv%3D1/https/cdn.discordapp.com/emojis/673357192203599904.gif",
          },
          description: "is playing right now",
          timestamp: new Date(),
          footer: {
            icon_url: message.client.user.avatarURL,
            text: "© Britta",
          },
        },
      });
    } else {
      message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "❗ There is no song of the queue playing right now",
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
