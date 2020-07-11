module.exports = {
  name: "ping",
  description: "Shows the bot Latency and API Latency",
  category: "info",
  execute(message, args) {
    let ping;
    let APIping = (Date.now() - message.createdTimestamp) * -1 + " ms";

    message.channel
      .send({
        embed: {
          color: message.client.messageEmbedData.color,

          title: "🏓 Pinging...",
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
              name: message.client.user.username,
              icon_url: message.member.user.avatarURL(),
            },
            title: "🏓 Pong",
            description:
              message.author.username + " wants to know Brittas ping",
            fields: [
              {
                name: "BOT Latency",
                value: "`" + ping + "`",
              },
              {
                name: "API Latency",
                value: "`" + APIping + "`",
              },
            ],
            timestamp: new Date(),
            footer: {
              icon_url: message.client.user.avatarURL,
              text: "© Britta",
            },
          },
        });
      });
  },
};
