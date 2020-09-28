module.exports = {
  name: "join",
  description: "Joins your voice channel",
  category: "music",
  execute(message, args) {  
    if (message.member.voice.channel) {
      message.member.voice.channel.join().then((connections) => {
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
        if (message.guild.me.voice.channel) { // Checking if the bot is in a VoiceChannel.
          message.guild.me.voice.setSelfDeaf(true); // Using setSelfDeaf to self-deafen the bot.
      };
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
