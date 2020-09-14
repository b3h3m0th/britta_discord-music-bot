const Discord = require("discord.js");
const Canvas = require("canvas");
module.exports = {
  name: "ph",
  description: "Prints out a big image message in the style of porn hub",
  category: "fun",
  execute(message, args) {
    args.shift();

    var maxLength = 20;

    if (args.length < 2) {
      return message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name:
              "❗ You need to provide 2 words in order to style the message",
          },
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
    }
    var prefixTXT = (args[0] += " ");
    var mainTXT = args[1];

    if (prefixTXT.length + mainTXT.length > maxLength) {
      return message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name:
              "❗ Please choose 2 words shorter " + maxLength + " characters",
          },
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
    }

    const canvas = Canvas.createCanvas(1300, 250);
    const ctx = canvas.getContext("2d");

    ctx.font = "bold 150px Arial";
    ctx.fillStyle = "#000";
    ctx.textBaseline = "middle";
    ctx.fillText(prefixTXT, 0, canvas.height / 2);

    var radius = 20;
    var offset = 30;

    var prefixWidth = ctx.measureText(prefixTXT).width;
    var mainWidth = ctx.measureText(mainTXT).width;

    ctx.fillStyle = "#FF9900";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(prefixWidth + mainWidth, offset);
    ctx.arcTo(
      prefixWidth + mainWidth + radius,
      offset,
      prefixWidth + mainWidth + radius,
      canvas.height - offset,
      radius
    );
    ctx.lineTo(prefixWidth + mainWidth + radius, canvas.height - offset * 2);
    ctx.arcTo(
      prefixWidth + mainWidth + radius,
      canvas.height - offset,
      prefixWidth + mainWidth,
      canvas.height - offset,
      radius
    );
    ctx.lineTo(prefixWidth, canvas.height - offset);
    ctx.arcTo(
      prefixWidth - offset,
      canvas.height - offset,
      prefixWidth - offset,
      canvas.height - offset * 2,
      radius
    );

    ctx.lineTo(prefixWidth - offset, offset * 2);
    ctx.arcTo(prefixWidth - offset, offset, prefixWidth, offset, radius);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.fillText(mainTXT, prefixWidth, canvas.height / 2);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer());
    message.channel.send(attachment);
  },
};
