const Discord = require("discord.js");
const chalk = require("chalk");
const Topgg = require("@top-gg/sdk");
const config = require("../config");
import createManager from "../player/createManager";
const flipnoteClient = require("alexflipnote.js");

export default class Client extends Discord.Client {
  TOKEN: string;
  config: any;
  commands: any;
  cooldowns: any;
  aliases: any;
  filters: any;
  topggAPI: any;
  alexClient: any;
  response: any;

  constructor(token: string) {
    super({
      disableMentions: "everyone",
    });

    this.TOKEN = token;
    this.config = require("../config");
    this.response = require("../util/resps");
    this.commands = new Discord.Collection();
    this.cooldowns = new Discord.Collection();
    this.aliases = new Discord.Collection();
    this.filters = new Discord.Collection();
    this.topggAPI = new Topgg.Api(config.api.top_gg_token);
    this.alexclient = new flipnoteClient(config.api.alexflipnote_token);
    createManager(this);
  }

  init(token = this.TOKEN) {
    super.login(token);
  }

  log(message: string) {
    console.log(
      chalk.white.bold(`[${new Date().toLocaleString()}]`) +
        chalk.white.bold(" > ") +
        message
    );
  }
}
