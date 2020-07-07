module.exports = {
  name: "clear",
  description: "Clears the song queue",
  execute(message, args) {
    message.client.queue.delete(message.guild.id);
    message.client.queue.connection = null;
    message.channel
      .send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "Clearing the queue...",
          },

          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      })
      .then((m) => {
        ping = m.createdTimestamp - message.createdTimestamp + " ms";
        m.edit({
          embed: {
            color: message.client.messageEmbedData.color,
            author: {
              name: "✔️ Cleared the queue",
            },
            timestamp: new Date(),
            footer: {
              text: "© Britta",
            },
          },
        });
      });
  },
};
