module.exports = {
  name: "say",
  description: "Britta says what you tell her to say",
  category: "fun",
  async execute(message, args) {
    console.log(args);
    if (args.length <= 1) {
      return message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "❗ I cannot say nothing",
          },
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
    }
    args.shift();
    const messageToSend = args.join(" ");
    message.channel.send(messageToSend);
  },
};
