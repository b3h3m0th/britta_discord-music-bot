const Discord = require("discord.js");
const client = new Discord.Client();

let ping = (client, message) => {
  let ping;
  let APIping = Date.now() - message.createdTimestamp + " ms";

  message.channel
    .send({
      embed: {
        color: 3447003,

        title: "🏓Pinging...",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Britta",
        },
      },
    })
    .then((m) => {
      ping = m.createdTimestamp - message.createdTimestamp + " ms";
      m.edit({
        embed: {
          color: 3447003,
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL,
          },
          title: "🏓Pong",
          description: message.author.username + " wants to know Brittas ping",
          fields: [
            {
              name: "BOT Latency",
              value: `${ping}`,
            },
            {
              name: "API Latency",
              value: `${APIping}`,
            },
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Britta",
          },
        },
      });
    });
};

module.exports = ping;
