module.exports = {
  name: "leave",
  description: "Leaves your voice channel",
  execute(message, args) {
    if (message.member.voice.channel) {
      message.member.voice.channel.leave();
      message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "⭕ Bye, i left your voice channel",
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
