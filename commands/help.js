module.exports = {
  name: "help",
  description: "Shows a list of all of brittas commands",
  category: "info",
  execute(message, args) {
    var commands = message.client.commands;
    if (args.length <= 1) {
      var embed = {
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: message.client.user.username,
            icon_url: message.client.user.avatarURL(),
          },
          title: "Command list",
          description:
            "This is a brief overview of all of Brittas commands sorted by category. \n If you want to have an alphabetically sorted list of all of Brittas commands including a detailed description to every command you can type `+help -l` ",
          fields: [
            {
              name: "🎵  Music commands",
              value: " ",
            },
            {
              name: "ℹ️  Info",
              value: " ",
            },
            {
              name: "🤪  Fun",
              value: " ",
            },
          ],
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      };

      //music commands
      var musicCommands = message.client.commands.filter(
        (command) => command.category == "music"
      );
      musicCommands.forEach((value, index, map) => {
        embed.embed.fields[0].value += "`" + value.name + "`, ";
      });
      embed.embed.fields[0].value = embed.embed.fields[0].value.slice(0, -2);

      //info commands
      var infoCommands = message.client.commands.filter(
        (command) => command.category == "info"
      );
      infoCommands.forEach((value, index, map) => {
        embed.embed.fields[1].value += "`" + value.name + "`, ";
      });
      embed.embed.fields[1].value = embed.embed.fields[1].value.slice(0, -2);

      //fun commands
      var funCommands = message.client.commands.filter(
        (command) => command.category == "fun"
      );
      funCommands.forEach((value, index, map) => {
        embed.embed.fields[2].value += "`" + value.name + "`, ";
      });
      embed.embed.fields[2].value = embed.embed.fields[2].value.slice(0, -2);

      //send embed
      message.channel.send(embed);
    } else {
      var userHelpFlag = args[1];
      console.log(userHelpFlag);
      if (userHelpFlag == "-l") {
        var embed = {
          embed: {
            color: message.client.messageEmbedData.color,
            author: {
              name: message.client.user.username,
              icon_url: message.client.user.avatarURL(),
            },
            title: "Command list",
            description:
              "This is the alphabetically sorted list of all of Brittas commands with a detailed description to every command.",
            fields: [],
            timestamp: new Date(),
            footer: {
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
        message.channel.send(embed);
      }
    }
  },
};
