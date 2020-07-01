const Discord = require("discord.js");
const client = new Discord.Client();

let britta = async (message, channel, client) => {
  if (!channel) return;

  const emoji = message.guild.emojis.cache.find(
    (emoji) => emoji.name === "Britta"
  );
  if (emoji) {
    message.react(emoji);
  }

  let role = message.guild.roles.cache.find((role) => role.name === "Britta");
  if (!role) {
    role = message.guild.roles.create({
      name: "Britta",
      color: "#fff",
      permissions: [],
    });
    client.guild = message.guild;
    client.guild.roles.add(role);
  }

  message.channel.send({
    embed: {
      color: 3447003,
      author: {
        name: "Britta",
        icon_url: client.user.avatarURL,
      },
      title: "👋🏻 Hello I'm Britta",
      description: "I am your personal music bot",
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "© Britta",
      },
    },
  });
};

module.exports = britta;
