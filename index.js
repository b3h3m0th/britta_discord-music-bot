const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const fs = require("fs");
const ascii = require("ascii-table");

const client = new Discord.Client();

//Britta requirements
client.commands = new Discord.Collection();
var table = new ascii("Britta is now ready");
table.setHeading("Command", "Load status");
// fs.readdirSync("./commands").forEach((dir) => {
//   const commands = fs
//     .readdirSync(`./commands/${dir}/`)
//     .filter((file) => file.endsWith(".js"));
//   for (let file of commands) {
//     let pull = require(`./commands/${file}`);
//     if (pull.name) {
//       table.addRow(file, "✔️"); //❌
//     } else {
//       table.addRow(file, "❌ -> something went wrong");
//       continue;
//     }
//   }
// });
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
  if (command.name) {
    table.addRow(command.name, "✔️");
  } else {
    table.addRow("❌ -> something went wrong", "");
  }
}

table.setAlign(1, ascii.CENTER);

//Britta data
var { PREFIX, TOKEN, YOUTUBE_API } = require("./config/config.json");
client.PREFIX = PREFIX;
client.VERSION = 1.0;
client.inviteLink =
  "https://discord.com/oauth2/authorize?client_id=722497903146565722&scope=bot&permissions=2146955121";
client.messageEmbedData = {
  color: "e97e37",
};

client.on("ready", () => {
  client.user.setUsername("Britta");
  client.user.setActivity("Britta", { type: "LISTENING" });
  console.log(table.toString());
});

//YOUTUBE
var ytSearch = require("youtube-search");

var opts = {
  maxResults: 1,
  key: YOUTUBE_API,
  type: "video",
};

//QUEUE
client.queue = new Map();

//MESSAGE
client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;
  let args = message.content.trim().substring(PREFIX.length).split(" ");
  console.log(args);

  let command = client.commands.get(args[0]);
  console.log(args[0]);
  if (command) {
    command.execute(message, args, client);
  } else {
    message.channel.send({
      embed: {
        color: message.client.messageEmbedData.color,
        author: {
          name: "❌ This command doesn't exist",
        },
        description: "`" + PREFIX + "help` to see a list of all commands",
        timestamp: new Date(),
        footer: {
          text: "© Britta",
        },
      },
    });
  }
});

client.login(TOKEN);
