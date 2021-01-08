import Event from "../structures/Event";
const path = require("path");
const chalk = require("chalk");
const mongoConnect = require("../util/mongoConnect");

module.exports = class Ready extends Event {
  constructor(client: any) {
    const eventName = path.basename(__filename).split(".")[0].toLowerCase();
    super(client, eventName);
  }

  async run(...args) {
    this.client.log(
      chalk.yellow.bold(`✔️  ${this.client.user.username} is online!`)
    );

    this.client.user.setActivity(`${this.client.config.client.prefix}help`, {
      type: "LISTENING",
    });

    setInterval(() => {
      this.client.topggAPI.postStats({
        serverCount: this.client.guilds.cache.size,
      });
    }, 1800000);

    mongoConnect(this.client);
  }
};
