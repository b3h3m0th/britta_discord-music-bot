module.exports = {
  name: "prefix",
  description: "Sets a new, custom prefix for the bot",
  category: "info",
  execute(message, args) {
    message.channel.send({
      embed: {
        color: message.client.messageEmbedData.color,
        author: {
          name: "🛠️ This feature is still in progress",
          icon_url: message.client.user.avatarURL(),
        },
        timestamp: new Date(),
        footer: {
          text: "© Britta",
        },
      },
    });
    // console.log(args);
    // if (args.length <= 2) {
    //   var newPrefix = args[1];
    //   message.client.PREFIX = newPrefix;
    //   message.channel.send({
    //     embed: {
    //       color: message.client.messageEmbedData.color,
    //       author: {
    //         name: "✔️ Prefix set to: `" + message.client.PREFIX + "`",
    //       },
    //       timestamp: new Date(),
    //       footer: {
    //         text: "© Britta",
    //       },
    //     },
    //   });
    // } else {
    //   message.channel.send({
    //     embed: {
    //       color: message.client.messageEmbedData.color,
    //       author: {
    //         name: "❗ There is no new prefix in your command",
    //       },
    //       timestamp: new Date(),
    //       footer: {
    //         text: "© Britta",
    //       },
    //     },
    //   });
    // }
  },
};
