const chalk = require("chalk");

module.exports = {
  logMessage: async (message) => {
    let timeStamp = new Date();
    console.log(
      chalk.gray("[" + timeStamp.toLocaleTimeString() + "]: ") +
        chalk.gray(
          message.author.username + "#" + message.author.discriminator
        ) +
        chalk.gray(" (" + message.guild.name + "): ") +
        chalk.bold(message.content)
    );
  },
};
