const Discord = require("discord.js");
const client = new Discord.Client();

let help = (message, client) => {
  message.channel.send({
    embed: {
      color: 3447003,
      author: {
        name: "Britta",
        icon_url: client.user.avatarURL,
      },
      title: "ℹ️ Command list",
      description: "A list of all of brittas commands",
      fields: [
        {
          name: "`+join`",
          value: "joins a voice channel",
        },
        {
          name: "`+add`",
          value: "adds a song to the queue",
        },
        {
          name: "`+play`",
          value: "plays the songs in the queue",
        },
        {
          name: "`+playnow`",
          value: "plays a song without adding it to the queue",
        },
        {
          name: "`+clear`",
          value: "clears the queue",
        },
        {
          name: "`+leave`",
          value: "leaves the voice channel",
        },
        {
          name: "`+np`",
          value: "shows the currently playing song",
        },
        {
          name: "`+skip`",
          value: "skips a song in the queue",
        },
        {
          name: "`+clear`",
          value: "lists all songs in the queue",
        },
        {
          name: "`+ping`",
          value: "pings the bot",
        },
        {
          name: "`+setVolume`",
          value: "changes the volume of the bot (1-100)",
        },
        {
          name: "`+earrape`",
          value: "puts an earrape filter over the song",
        },

        {
          name: "`+britta`",
          value: "mystic command",
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

module.exports = help;
