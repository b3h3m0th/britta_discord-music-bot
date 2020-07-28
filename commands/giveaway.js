const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "giveaway",
  description: "Creates a giveaway for your server",
  category: "moderation",
  async execute(message, args) {
    args.shift();

    if (
      message.client.admins.filter(
        (admin) => admin.id == message.member.user.id
      ).length != 1
    ) {
      return message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "❗ You have no permissions to start a giveaway",
          },
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
    }

    if (!args[0])
      return message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "❗ Please use this syntax in order to create a giveaway:",
          },
          fields: [
            {
              name: "Create a giveaway",
              value:
                message.client.PREFIX +
                "giveaway <time (m/h/d)> <image> <prize>",
            },
          ],
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
    if (
      !args[0].endsWith("d") &&
      !args[0].endsWith("h") &&
      !args[0].endsWith("m")
    )
      return message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "❗ Please use a valid time format",
          },
          fields: [
            {
              name: "Create a giveaway",
              value:
                message.client.PREFIX +
                "giveaway <time (m/h/d)> <image> <prize>",
            },
          ],
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
    if (isNaN(args[0][0]))
      return message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "❗ Please use a valid time format",
          },
          fields: [
            {
              name: "Create a giveaway",
              value:
                message.client.PREFIX +
                "giveaway <time (m/h/d)> <image> <prize>",
            },
          ],
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
    let channel = message.mentions.channels.first();
    if (!channel)
      return message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "❗ Please provide a valid channel",
          },
          fields: [
            {
              name: "Create a giveaway",
              value:
                message.client.PREFIX +
                "giveaway <time (m/h/d)> <image> <prize>",
            },
          ],
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
    let image = args.slice(2, 3).join(" ");
    if (!image)
      return message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "❗ Please choose an image for the giveaway",
          },
          fields: [
            {
              name: "Create a giveaway",
              value:
                message.client.PREFIX +
                "giveaway <time (m/h/d)> <image> <prize>",
            },
          ],
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
    let prize = args.slice(3).join(" ");
    if (!prize)
      return message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "❗ Please choose a prize for the giveaway",
          },
          fields: [
            {
              name: "Create a giveaway",
              value:
                message.client.PREFIX +
                "giveaway <time (m/h/d)> <image> <prize>",
            },
          ],
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
    message.channel.send({
      embed: {
        color: message.client.messageEmbedData.color,
        author: {
          name: "✔️ Giveaway created in " + channel + " by " + message.author,
        },
        timestamp: new Date(),
        footer: {
          text: "© Britta",
        },
      },
    });
    let end = new Date(Date.now() + ms(args[0]));
    let Embed = new MessageEmbed()
      .setTitle(prize + " Giveaway!")
      .setDescription(
        "Click on 🎉 below to participate." +
          "\n \nThe giveaway ends on \n**" +
          end.toUTCString() +
          "**"
      )
      .setImage(image)
      .setColor(message.client.messageEmbedData.color);
    let m = await channel.send(Embed);
    m.react("🎉");
    setTimeout(() => {
      if (m.reactions.cache.get("🎉").count <= 1) {
        message.channel.send(`Reactions: ${m.reactions.cache.get("🎉").count}`);
        return message.channel.send({
          embed: {
            color: message.client.messageEmbedData.color,
            author: {
              name: "❗ Couldn't find a winner since nobody participated",
            },
            timestamp: new Date(),
            footer: {
              text: "© Britta",
            },
          },
        });
      }

      let winner = m.reactions.cache
        .get("🎉")
        .users.cache.filter((u) => !u.bot)
        .random();
      channel.send(
        `The winner of the giveaway for **${prize}** is... ${winner}`
      );
    }, ms(args[0]));
  },
};
