module.exports = {
  name: "help",
  description: "shows a list of all of brittas commands",
  execute(message, args) {
    var commands = message.client.commands;
    var embed = {
      embed: {
        color: message.client.messageEmbedData.color,
        author: {
          name: message.client.user.username,
        },
        title: "❔ Command list",
        description: "Shows a list of all of brittas commands",
        fields: [],
        timestamp: new Date(),
        footer: {
          icon_url: message.client.user.avatarURL,
          text: "© Britta",
        },
      },
    };
    commands.forEach((value, key, map) => {
      embed.embed.fields.push({
        name: "`" + value.name + "`",
        value: value.description,
      });
    });
    console.log(embed);
    message.channel.send(embed);
  },
};
