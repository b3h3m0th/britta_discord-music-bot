const Discord = require("discord.js");
const client = new Discord.Client();

let ping = (client, message) => {
  let ping = (Date.now() - message.createdTimestamp) * -1 + " ms";

  message.channel.send({
    embed: {
      color: 3447003,
      author: {
        name: "Britta",
        icon_url: client.user.avatarURL,
      },
      title: "🏓Pong",
      description: "you pinged me",
      fields: [
        {
          name: "Ping",
          value: ping,
        },
      ],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "© Britta",
      },
    },
  });
};

module.exports = ping;
