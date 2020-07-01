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
          icon_url: client.user.avatarURL,
        },
        title: "🎧 Your song queue: ",
        description: output,
        fields: [
          {
            name: "Brittas social media:",
            value: "[brittas website](https://britta.com)",
          },
        ],
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
