const mongoose = require("mongoose");
const config = require("../config");
const chalk = require("chalk");

module.exports = (client: any) => {
  mongoose.connect(config.database.mongodb_connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.log(chalk.yellow.bold(`✔️  MongoDB connected!`));
};
export {};
