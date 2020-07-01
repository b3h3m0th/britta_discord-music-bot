const Discord = require("discord.js");
const client = new Discord.Client();

let np = (message, queue, client) => {
  if (queue.length >= 1) {
    message.channel.send({
      embed: {
        color: 3447003,
        author: {
          name: queue[0].title,
          icon_url:
            "https://images-ext-1.discordapp.net/external/9_3dcPqCXGMU3WFySOvtVYjIKsZnN6zcyg7oVTn8Zlw/%3Fv%3D1/https/cdn.discordapp.com/emojis/673357192203599904.gif",
        },
        description: "is playing right now",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Britta",
        },
      },
    });
  } else {
    message.channel.send({
      embed: {
        color: 3447003,
        author: {
          name: "❗ There is no song playing right now",
        },
        timestamp: new Date(),
        footer: {
          text: "© Britta",
        },
      },
    });
  }
};

module.exports = np;
