const Discord = require("discord.js");

let queue = (message, queue, client) => {
  let output = "";
  queue.forEach((element, index) => {
    output += index + 1 + ". " + element + "\n";
  });
  if (!output) {
    message.channel.send("Im Moment sind kua Liader in da queue");
  } else {
    message.channel.send({
      embed: {
        color: 3447003,
        author: {
          name: "Obacht! d'" + client.user.username + " hot sWort",
          icon_url: client.user.avatarURL,
        },
        title: "Des isch dine Song Liste: ",
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
