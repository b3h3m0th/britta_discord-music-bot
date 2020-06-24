const Discord = require("discord.js");
const client = new Discord.Client();

const ytdl = require("ytdl-core");

const TOKEN = "NzIyNDk3OTAzMTQ2NTY1NzIy.Xuj_HA.3AxQLUg6iuL2bzVCufWs8lsk7ZY";

//britta data
var VERSION = "1.0";

var servers = {};

//SYNTAX
const PREFIX = "+";

client.on("ready", () => {
  console.log("Sodele i bin jetzt parat mit minara version " + VERSION);
});

client.on("message", (message) => {
  let args = message.content.substring(PREFIX.length).split(" ");

  //COMMANDS
  switch (args[0]) {
    case "version":
      message.channel.send(
        "Habe die ehre, min nama isch britta und i lof uf da verion " + VERSION
      );
    case "play":
      function play(connection, message) {
        var server = servers[message.guild.id];
        servers.dispatcher = connection.play(
          ytdl(server.queue[0], { filter: "audioonly" })
        );
        server.queue.shif();

        server.dispatcher.on("end", function () {
          if (server.queue[0]) {
            play(connection, message);
          } else {
            connection.disconnect();
          }
        });
      }

      if (!args[1]) {
        message.channel.send(
          "He du, du musch ma scho an link überliefara, sunsch kann i din liad ned lofa lo"
        );
        return;
      }

      if (!message.member.voice.channel) {
        message.channel.send("Du seckel hoksch ned in anam Sprachkanal");
        return;
      }

      if (!servers[message.guild.id])
        servers[message.guild.id] = {
          queue: [],
        };

      var server = servers[message.guild.id];

      server.queue.push(args[1]);

      if (!message.member.voice.connection)
        message.member.voice.channel.join().then(function (connection) {
          play(connection, message);
        });
      break;
    case "help":
      message.channel.send(
        "Uansch musch wissa. Vo da Britta krigsch kua Hilfe"
      );
      break;

    case "skip":
      var server = servers[message.guild.id];
      if (server.dispatcher) server.dispatcher.end();
      message.channel.send(
        "Der song gfallt ma ned. i hob dean übersprunga, bürschle"
      );
      break;

    case "stop":
      var server = servers[message.guild.id];
      if (message.member.voice.connection) {
        for (var i = server.queue.length - 1; i >= 0; i--) {
          server.queue.splice(i, 1);
        }

        server.dispatcher.end();
        message.channel.send("I hob dine queue glöscht");
        console.log("stopped the queue");
      }

      if (message.guild.connection) message.guild.voice.connection.disconnect();
      break;

    case "britta":
      message.channel.send(
        "Habedeehre i bin dBritta und i los suppa musik lofa. I segs da jetzt isch party hard"
      );
      break;
    default:
      break;
  }
});

client.login(TOKEN);
