/* eslint-disable no-unused-vars */
module.exports = {
  name: "coinflip",
  description: "Flips a coin for you",
  category: "fun",
  execute(message, args) {
    var result;
    var random = Math.random();
    if (random > 0.5) result = "HEADS";
    else result = "TAILS";

    message.channel.send({
      embed: {
        color: message.client.messageEmbedData.color,
        author: {
          icon_url:
            "https://cdn.discordapp.com/attachments/738089927925039206/738092778520707172/animation_500_kd7o8hyq.gif",
          name: `you got: ` + result,
        },
        timestamp: new Date(),
        footer: {
          text: "© Britta",
        },
      },
    });
  },
};
