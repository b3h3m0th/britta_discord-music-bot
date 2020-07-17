const Discord = require("discord.js");
const Canvas = require("canvas");
Canvas.registerFont("./assets/fonts/Whitney-Book.ttf", { family: "Whitney" });
module.exports = {
  name: "fakemessage",
  description: "Sends a customized fake message into the channel",
  category: "fun",
  async execute(message, args) {
    console.log(args);
    args.shift();

    if (args.length < 1) {
      return message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "❗ You need to provide an author and a message",
          },
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
    }

    if (args.length < 2) {
      return message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "❗ You need to provide an author and a message",
          },
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
    }

    const senderID = args[0].trim().substring(3).replace(">", "");
    const messageContent = args.slice(1, args.length).join(" ");
    messageContent.trim();
    let senderAvatar;
    let senderUsername;

    var maxLength = 100;

    if (messageContent.length >= maxLength) {
      return message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name:
              "❗ Please provide a message shorter than " +
              maxLength +
              " characters",
          },
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
    }

    message.guild.members.cache.forEach((element) => {
      if (element.user.id == senderID) {
        senderUsername = element.user.username;
        senderAvatar = `https://cdn.discordapp.com/avatars/${senderID}/${element.user.avatar}.png?size=512`;
        console.log(senderAvatar);
        console.log(element);
      }
    });

    const canvas = Canvas.createCanvas(1500, 250);
    const ctx = canvas.getContext("2d");

    ctx.font = "75px Whitney";
    ctx.fillStyle = "#dcddde";
    ctx.textBaseline = "top";

    ctx.fillText(senderUsername, 300, 20);

    ctx.font = "70px Whitney";
    ctx.fillStyle = "#dcddde";
    ctx.textBaseline = "top";

    ctx.fillText(messageContent, 300, 120);
    console.log(messageContent);

    // Pick up the pen
    ctx.beginPath();
    // Start the arc to form a circle
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    // Put the pen down
    ctx.closePath();
    // Clip off the region you drew on
    ctx.clip();

    const avatar = await Canvas.loadImage(senderAvatar);
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "fakemessage.png"
    );
    message.channel.send(attachment);
  },
};
