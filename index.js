const Discord = require("discord.js");
const ytdl = require("ytdl-core");

const client = new Discord.Client();

//Britta data
const { PREFIX, TOKEN, YOUTUBE_API } = require("./config/config.json");
var VERSION = 1.0;

client.on("ready", () => {
  console.log(
    "Sodele i bin jetzt parat mit minara version " + VERSION.toString()
  );
});

//YOUTUBE
var ytSearch = require("youtube-search");
console.log(YOUTUBE_API);

var opts = {
  maxResults: 1,
  key: YOUTUBE_API,
  type: "video",
};

//QUEUE
let queue = [];
let dispatcher;

client.on("message", (message) => {
  if (message.author.bot) return;
  let args = message.content.substring(PREFIX.length).split(" ");
  console.log(args);

  //COMMANDS
  switch (args[0]) {
    case "version":
      message.channel.send(
        "Habe die ehre, min nama isch britta und i lof uf da version " +
          VERSION.toString()
      );
    case "play":
      play = () => {
        try {
          let songRequest = args[1];

          if (message.channel.type !== "text") return;
          const voiceChannel = message.member.voice.channel;
          if (!voiceChannel) {
            return message.reply("Du seckel hoksch ned in anam Voicechat");
          }

          ytSearch(songRequest, opts, function (err, results) {
            if (err) return console.log(err);

            let songRequest_data = results[0];
            queue.push(songRequest_data);
            let songRequest_link = results[0].link;
            let songRequest_title = results[0].title;
            let songRequest_description = results[0].description;
            console.log(results[0].link);

            voiceChannel.join().then((connection) => {
              const stream = ytdl(queue[0].link, {
                filter: "audioonly",
              });
              dispatcher = connection.play(stream);

              dispatcher.on("end", () => {
                voiceChannel.leave();
                queue.shift();
                //queue shift
              });
            });

            message.channel.send({
              embed: {
                color: 3447003,
                author: {
                  name: "Obacht! d'" + client.user.username + " hot sWort",
                  icon_url: client.user.avatarURL,
                },
                title: songRequest_title,
                url: songRequest_link,
                description: songRequest_description,
                fields: [
                  {
                    name: "Brittas social media:",
                    value: "[brittas website](https://britta.com)",
                  },
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: "© Britta",
                },
              },
            });
          });
        } catch (error) {
          message.channel.send(
            "Es hot an Fehler gea, aba i woas ned was genau passiert isch."
          );
        }
      };

      play();

      break;
    case "help":
      message.channel.send(
        "Uansch musch wissa. Vo da Britta krigsch kua Hilfe"
      );
      break;

    case "skip":
      if (queue[1]) {
        queue.shift();
        console.log(queue[0]);
        message.channel.send(
          "Der song gfallt ma ned. i hob dean übersprunga, bürschle"
        );
        play();
        queue.shift();
      } else {
        message.channel.send("Es lauft grad kua Liad, des ma skippen kann");
      }
      break;
    case "stop":
      dispatcher.pause();
      message.channel.send("Sodele, da song isch jetzt auf Pause.");
      break;

    case "resume":
      dispatcher.resume();
      message.channel.send("Sodele, da song läuft jetzt witta.");
      break;

    case "np":
      try {
        message.channel.send("Jetzt lauft gad " + queue[0].title);
      } catch (error) {
        message.channel.send("Im Moment lauft kua Liad.");
      }
      break;

    case "leave":
      message.member.voice.channel.leave();
      message.channel.send("Tschö mit Ö!");
      break;

    case "clear":
      message.channel.send(
        "Dine Liste isch jetzt widda leer wia a leeres array"
      );
      queue = [];
      break;

    case "queue":
      let output = "";
      queue.forEach((element) => {
        output += element.title.toString() + "\n";
      });
      if (!output) {
        message.channel.send("Im Moment sind kua Liader in da queue");
      } else {
        message.channel.send("Des isch dine liste: \n" + output);
      }
      break;

    case "join":
      message.member.voice.channel.join();

    case "britta":
      message.channel.send(
        "Habedeehre i bin dBritta und i los suppa musik lofa. I segs da jetzt isch party hard"
      );
      break;

    case "gibarua":
      message.channel.send("Na.");
      break;

    case "geilesau":
      message.channel.send("Du Schlingel");
      break;

    case "winsi":
      message.channel.send(
        "Es fehlt ein Satzzeichen in deiner Vernetzung von Wortkonstrukten! \n Knockout!"
      );
    default:
      message.channel.send("Dean Befehlt kennt 'dBritta neda. Sorry.");
      break;
  }
});

client.login(TOKEN);
