module.exports = {
  name: "britta",
  description: "This is Britta",
  execute(message, args) {
    let role = message.guild.roles.cache.find((role) => role.name === "Britta");
    if (!role) {
      role = message.guild.roles.create({
        name: "Britta",
        color: "#fff",
        permissions: [],
      });
      message.client.guild = message.guild;
      message.client.guild.roles.add(role);
    }

    message.channel.send({
      embed: {
        color: message.client.messageEmbedData.color,
        author: {
          name: "Britta",
          icon_url: message.client.user.avatarURL,
        },
        title: "👋🏻 Hello I'm Britta",
        description: "I am your personal music bot",
        fields: [
          {
            name: "PREFIX:",
            value: "`" + message.client.PREFIX + "`",
          },
        ],
        timestamp: new Date(),
        footer: {
          icon_url: message.client.user.avatarURL,
          text: "© Britta",
        },
      },
    });
  },
};
