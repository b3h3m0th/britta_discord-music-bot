const fs = require("fs");
const commands = fs.readdirSync("./src/commands/");

module.exports = (client: any) => {
  try {
    commands
      .filter((file) => file.endsWith(".ts"))
      .forEach((command) => {
        const cmd = require(`../commands/${command.split(".")[0]}`);
        client.commands.set(cmd.name.toLowerCase(), new cmd(client));
      });
  } catch (err) {
    client.log(err);
  }
};
export {};
