/* eslint-disable no-unused-vars */
const Discord = require("discord.js");
const fs = require("fs");
const ascii = require("ascii-table");

const client = new Discord.Client();

//Britta requirements
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
var table = new ascii("Britta is now ready");
table.setHeading("Command", "Description", "Load status");

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
  if (command.name) {
    table.addRow(command.name, command.description, "✔️");
  } else {
    table.addRow("❌ -> something went wrong", "");
  }
}

table.setAlign(2, ascii.CENTER);

//Britta data
var { PREFIX, TOKEN } = require("./config/config.json");
client.PREFIX = PREFIX;
client.VERSION = 1.0;
client.NAME = "Britta";
client.admins = [
  {
    username: "Behemoth",
    discriminator: "4026",
    id: "491539179642028032",
    icon_url:
      "https://cdn.discordapp.com/avatars/491539179642028032/ece3770ec792f9919df9e2bf4fbdabd9.png?size=128",
  },
  {
    username: "PatPlayz",
    discriminator: "3128",
    id: "348463533287145484",
  },
];
client.inviteLink =
  "https://discord.com/oauth2/authorize?client_id=722497903146565722&scope=bot&permissions=104123392";
client.messageEmbedData = {
  color: "e97e37",
};

client.resources = {
  youtubeIcon:
    "http://pluspng.com/img-png/youtube-play-button-transparent-png-image-42015-800.png",
  spotifyIcon: "http://pluspng.com/img-png/spotify-logo-png-open-2000.png",
};

client.on("ready", () => {
  client.user.setUsername(client.NAME);
  client.user.setActivity(client.NAME, { type: "LISTENING" });
  console.log(table.toString());
});

//QUEUE
client.queue = new Map();

//LOGGING
const { logMessage } = require("./components/log");

//MESSAGE
client.on("message", async (message) => {
  if (message.author.bot) return;

  let prefixes = JSON.parse(
    fs.readFileSync("./commands/prefixes.json", "utf-8")
  );
  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: client.PREFIX,
    };
  }

  let prefix = prefixes[message.guild.id].prefixes;

  if (!message.content.startsWith(prefix)) return;
  let args = message.content.trim().substring(prefix.length).split(" ");

  logMessage(message);

  let command = client.commands.get(args[0].toLowerCase());
  if (command) {
    command.execute(message, args, client);
  } else {
    // message.channel.send({
    //   embed: {
    //     color: message.client.messageEmbedData.color,
    //     author: {
    //       name: "❌ This command doesn't exist",
    //     },
    //     description: "`" + prefix + "help` to see a list of all commands",
    //     timestamp: new Date(),
    //     footer: {
    //       text: "© Britta",
    //     },
    //   },
    // });
  }
});

client.login(TOKEN);
