/* eslint-disable no-unused-vars */

module.exports = {
  name: "ping",
  description: "Shows the bot Latency and API Latency",
  category: "info",
  async execute(message, args) {
    let ping;
    let APIping = Date.now() - message.createdTimestamp + " ms";
    let MongoDBPing = await getMongoDBPing();
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
            title: "🏓  Pong",
            description:
              message.author.username + " wants to know Brittas ping",
            fields: [
              {
                name: ":robot:  Bot Latency",
                value: "`" + ping + "`",
              },
              {
                name: ":satellite:  API Latency",
                value: "`" + APIping + "`",
              },
              {
                name: "<:mongoDB:735183229669212201>  MongoDB",
                value: "`" + MongoDBPing + "`",
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

const getMongoDBPing = async () => {
  const start = Date.now();
  try {
    await Guild.findOne(
      { connection_query: "successful" },
      async (err, data) => {
        if (err) {
          return console.log(err);
        }
        if (data.connection_query == "successful") {
          console.log(data);
        } else {
          console.log("error to log data")
        }
      }
    );
  } catch (error) {
    return "disconnected";
  }

  const end = Date.now();
  return (end - start).toString() + " ms";
};
