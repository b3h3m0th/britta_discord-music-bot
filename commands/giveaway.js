const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "giveaway",
  description: "Creates a giveaway for your server",
  category: "moderation",
  async execute(message, args) {
    args.shift();

    var selectedBannedRoles = args.join(" ");
    console.log(selectedBannedRoles);
    var bannedRoles = selectedBannedRoles
      .substring(
        selectedBannedRoles.lastIndexOf("[") + 1,
        selectedBannedRoles.lastIndexOf("]")
      )
      .split(", ");

    args = args.join(" ");
    args = args.replace(
      args.substring(
        selectedBannedRoles.lastIndexOf("[") + 1,
        selectedBannedRoles.lastIndexOf("]")
      ),
      ""
    );
    args = args.replace("[]", "");
    args = args.replace("  ", "");

    args = args.split(" ");
    console.log(args);
    console.log(bannedRoles);

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
                "giveaway <time (m/h/d)> <[bannedRoleID1, bannedRoleID2, ...] <image> <winnersCount> <prize>",
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
                "giveaway <time (m/h/d)> <[bannedRoleID1, bannedRoleID2, ...] <image> <winnersCount> <prize>",
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
                "giveaway <time (m/h/d)> <[bannedRoleID1, bannedRoleID2, ...] <image> <winnersCount> <prize>",
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
                "giveaway <time (m/h/d)> <[bannedRoleID1, bannedRoleID2, ...] <image> <winnersCount> <prize>",
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
                "giveaway <time (m/h/d)> <[bannedRoleID1, bannedRoleID2, ...] <image> <winnersCount> <prize>",
            },
          ],
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
    let winnersCount = args.slice(3, 4).join(" ");
    if (isNaN(winnersCount) && winnersCount >= 1)
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
                "giveaway <time (m/h/d)> <[bannedRoleID1, bannedRoleID2, ...] <image> <winnersCount> <prize>",
            },
          ],
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
    let prize = args.slice(4).join(" ");
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
                "giveaway <time (m/h/d)> <[bannedRoleID1, bannedRoleID2, ...] <image> <winnersCount> <prize>",
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
          name: `✔️ Giveaway created`,
        },
        description: `New giveaway has been created in ${channel} by ${message.author}`,
        timestamp: new Date(),
        footer: {
          text: "© Britta",
        },
      },
    });

    let end = new Date(Date.now() + ms(args[0]));
    let reactionsCount;
    let Embed = new MessageEmbed()
      .setTitle(prize + " Giveaway!")
      .setDescription(
        "Click on 🎉 below to participate." +
          "\n \n There will be **" +
          winnersCount +
          (winnersCount > 1 ? " winners.**" : " winner.**") +
          "\n \nThe giveaway ends on \n**" +
          end.toLocaleString() +
          "**"
      )
      .setImage(image)
      .setColor(message.client.messageEmbedData.color);
    let m = await channel.send(Embed);

    m.react("🎉");
    setTimeout(() => {
      reactionsCount = m.reactions.cache.get("🎉").count - 1;
      if (m.reactions.cache.get("🎉").count <= winnersCount) {
        message.channel.send(`Reactions: ${m.reactions.cache.get("🎉").count}`);
        return message.channel.send({
          embed: {
            color: message.client.messageEmbedData.color,
            author: {
              name:
                "❗ Couldn't pick a winner since not enough people participated",
            },
            timestamp: new Date(),
            footer: {
              text: "© Britta",
            },
          },
        });
      }

      var bans = [];
      // var bannedRoles = [
      //   "696795635948585062",
      //   "696796020952137818",
      //   "701852831958827058",
      //   "729007383573037097",
      //   "704038326000156753",
      //   "701823925503393922",
      //   "707560935472234566",
      //   "728720369434886155",
      // ];

      message.guild.members.cache.forEach((m) => {
        bannedRoles.forEach((role) => {
          if (m._roles.includes(role)) {
            bans.push(m.user);
          }
        });
      });

      console.log(bans);

      let winners = [];

      for (let i = 0; i < winnersCount; i++) {
        let winner = m.reactions.cache
          .get("🎉")
          .users.cache.filter((u) => !u.bot)
          .random();
        if (winners.includes(winner) || bans.includes(winner)) {
          winners.pop();
          i++;
        } else {
          winners.push(winner);
        }
      }

      console.log("winners: " + winners);

      if (bans.length >= m.reactions.cache.get("🎉").count - 1) {
        return message.channel.send({
          embed: {
            color: message.client.messageEmbedData.color,
            author: {
              name:
                "❗ Couldn't pick a winner since not enough people participated",
            },
            timestamp: new Date(),
            footer: {
              text: "© Britta",
            },
          },
        });
      }

      let formattedWinners = winners.join("\n");

      channel.send(
        `
:tada:**The ${prize} giveaway has ended!**

` +
          (reactionsCount > 1
            ? "*(" + reactionsCount + " valid entries)* \n \n"
            : "*(" + reactionsCount + " valid entry)* \n \n") +
          (winnersCount > 1
            ? "🎉  The **winners** of the giveaway are: \n" + formattedWinners
            : "🎉  The **winner** of the giveaway is: \n" + formattedWinners)
      );
    }, ms(args[0]));
  },
};
