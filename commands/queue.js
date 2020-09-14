module.exports = {
  name: "queue",
  description: "Shows the songs in queue",
  category: "music",
  execute(message, args) {
    let output = "";
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue) {
      serverQueue.songs.forEach((element, index) => {
        output += index + 1 + ". " + element.title + "\n";
      });
      if (!output) {
        message.channel.send({
          embed: {
            color: message.client.messageEmbedData.color,
            author: {
              name: "❗ There are no songs in queue",
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
              name: message.client.user.username,
              icon_url:
                "https://images-ext-1.discordapp.net/external/9_3dcPqCXGMU3WFySOvtVYjIKsZnN6zcyg7oVTn8Zlw/%3Fv%3D1/https/cdn.discordapp.com/emojis/673357192203599904.gif",
            },
            title: "🎧 Your song queue: ",
            description: output,
            timestamp: new Date(),
            footer: {
              icon_url: message.client.user.avatarURL,
              text: "© Britta",
            },
          },
        });
      }
    } else {
      message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "❗ There are no songs in queue",
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
