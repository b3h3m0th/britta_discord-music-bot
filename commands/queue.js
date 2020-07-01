const Discord = require("discord.js");

let queue = (message, queue, client) => {
  let output = "";
  queue.forEach((element, index) => {
    output += index + 1 + ". " + element.title + "\n";
  });
  if (!output) {
    message.channel.send({
      embed: {
        color: 3447003,
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
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url:
            "https://images-ext-1.discordapp.net/external/9_3dcPqCXGMU3WFySOvtVYjIKsZnN6zcyg7oVTn8Zlw/%3Fv%3D1/https/cdn.discordapp.com/emojis/673357192203599904.gif",
        },
        title: "🎧 Your song queue: ",
        description: output,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Britta",
        },
      },
    });
  }
};

module.exports = queue;
