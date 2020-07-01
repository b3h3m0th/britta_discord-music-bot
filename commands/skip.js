const Discord = require("discord.js");
const client = new Discord.Client();
const play = require("./play");

let skip = (client, queue, message, voiceChannel) => {
  if (queue[1]) {
    queue.shift();
    console.log(queue[0]);
    play(queue, voiceChannel, message);
    message.channel
      .send({
        embed: {
          color: 3447003,
          author: {
            name: "⏭️ Skipping a song",
            icon_url: client.user.avatarURL,
          },
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
              name: "✔️ Skipped a song",
              icon_url: client.user.avatarURL,
            },
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Britta",
            },
          },
        });
      });
  } else if (queue.length >= 1) {
    message.channel.send({
      embed: {
        color: 3447003,
        author: {
          name: "❗ The last song in queue cannot be skipped",
        },
        timestamp: new Date(),
        footer: {
          text: "© Britta",
        },
      },
    });
  } else if (queue.length >= 0) {
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
  }
};

module.exports = skip;
