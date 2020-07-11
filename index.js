const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const fs = require("fs");
const ascii = require("ascii-table");
const request = require("request");

const { http, https } = require("follow-redirects");

url =
  "https://accounts.spotify.com/de/authorize?client_id=72e60c5e4c49409198f6037b3df7ed22&response_type=code&redirect_uri=https:%2F%2Fbuildtheearth-atchli.com%2F&scope=user-read-private%20user-read-email&state=34fFs29kd09";
// request({ url: url, followRedirect: false }, function (err, res, body) {
//   console.log(res.headers);
// });

// https.get(
//   "https://accounts.spotify.com/de/authorize?client_id=72e60c5e4c49409198f6037b3df7ed22&response_type=code&redirect_uri=https:%2F%2Fbuildtheearth-atchli.com%2F&scope=user-read-private%20user-read-email&state=34fFs29kd09",
//   (resp) => {
//     let data = "";

//     resp.on("data", (chunk) => {
//       data += chunk;
//     });

//     resp.on("end", () => {
//       let url = JSON.parse(data);
//       console.log(url);
//     });

//     resp.on("error", () => {
//       let url = JSON.parse(data).hdurl;
//       console.log(url);
//     });
//   }
// );

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
var { PREFIX, TOKEN, YOUTUBE_API } = require("./config/config.json");
client.PREFIX = PREFIX;
client.VERSION = 1.0;
client.inviteLink =
  "https://discord.com/oauth2/authorize?client_id=722497903146565722&scope=bot&permissions=2146955121";
client.messageEmbedData = {
  color: "e97e37",
};
client.developerData = {
  name: "Behemoth",
  tag: "#4026",
  icon_url:
    "https://cdn.discordapp.com/avatars/491539179642028032/ece3770ec792f9919df9e2bf4fbdabd9.png?size=128",
};

client.resources = {
  youtubeIcon:
    "http://pluspng.com/img-png/youtube-play-button-transparent-png-image-42015-800.png",
  spotifyIcon: "http://pluspng.com/img-png/spotify-logo-png-open-2000.png",
};

client.on("ready", () => {
  client.user.setUsername("Britta");
  client.user.setActivity("Britta", { type: "LISTENING" });
  console.log(table.toString());
});

//QUEUE
client.queue = new Map();

//MESSAGE
client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;
  let args = message.content.trim().substring(PREFIX.length).split(" ");
  console.log(args);

  let command = client.commands.get(args[0].toLowerCase());
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
