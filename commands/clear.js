const Discord = require("discord.js");
const client = new Discord.Client();

let clear = (message, queue) => {
  queue = [];
  message.channel.send({
    embed: {
      color: 3447003,
      author: {
        name: "✔️ Cleared the queue",
      },
      timestamp: new Date(),
      footer: {
        text: "© Britta",
      },
    },
  });
};

module.exports = clear;
