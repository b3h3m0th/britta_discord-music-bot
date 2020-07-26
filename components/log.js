const chalk = require("chalk");

module.exports = {
  logMessage: async (message) => {
    console.log(chalk.gray(message));
  },
};
