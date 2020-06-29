const Discord = require("discord.js");
const ytdl = require("ytdl-core");

const client = new Discord.Client();
const guild = new Discord.Guild(client, {
  name: "michi",
});

//Britta requirements
const britta = require("./commands/britta");
const gibarua = require("./commands/gibarua");
const help = require("./commands/help");
const add = require("./commands/add");
const play = require("./commands/play");
const operators = require("./commands/operators");
const setPrefix = require("./commands/changePrefix");
const skip = require("./commands/skip");
const clear = require("./commands/clear");
const np = require("./commands/np");
const showQueue = require("./commands/queue");

//Britta data
let { PREFIX, TOKEN, YOUTUBE_API } = require("./config/config.json");
var VERSION = 1.0;
const inviteLink =
  "https://discord.com/oauth2/authorize?client_id=722497903146565722&scope=bot&permissions=0";

client.on("ready", () => {
  console.log(
    "Sodele i bin jetzt parat mit minara version " + VERSION.toString()
  );
  client.user.setUsername("Britta usam Bregenzerwald");
  client.user.setActivity("Britta", { type: "LISTENING" });
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

//internals
let dispatcher;
let stream;
let voiceChannel;
let currentPlaynow_link;

//FILTERS
const filters = require("./filters/filtersConfig");
const earrape = require("./filters/earrape");
const setVolume = require("./commands/setVolume");

let earrapeOn = filters.earrape;

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.content.substring(0, 1) !== PREFIX) return;
  let args = message.content.substring(PREFIX.length).split(" ");
  console.log(args);

  //COMMANDS
  switch (args[0]) {
    case "version":
      message.channel.send(
        "Habe die ehre, min nama isch britta und i lof uf da version " +
          VERSION.toString()
      );
    case "playnow":
      playnow = () => {
        try {
          let songRequest = args[1];

          if (message.channel.type !== "text") return;
          voiceChannel = message.member.voice.channel;
          if (!voiceChannel) {
            return message.channel.send(
              "Du seckel hoksch ned in anam Voicechat"
            );
          }

          ytSearch(songRequest, opts, function (err, results) {
            try {
              if (err) return console.log(err);

              if (!results) return;

              let songRequest_data = results[0];
              console.log(results);
              console.log(results[0].thumbnails.high);
              let songRequest_link = results[0].link;
              currentPlaynow_link = results[0].link;
              let songRequest_title = results[0].title;
              let songRequest_description = results[0].description;
              let songRequest_thumbnail = results[0].thumbnails.high.url;
              console.log(songRequest_thumbnail);
              console.log(results[0].link);

              voiceChannel.join().then((connection) => {
                stream = ytdl(results[0].link, {
                  filter: "audioonly",
                });
                dispatcher = connection.play(stream);

                dispatcher.on("end", () => {
                  //play();
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
                  thumbnail: {
                    url: songRequest_thumbnail,
                  },
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
            } catch (error) {
              message.channel.send("Sorry des Liad hobi ned finda künna");
            }
          });
        } catch (error) {
          message.channel.send(
            "Es hot an Fehler gea, aba i woas ned was genau passiert isch."
          );
        }
      };

      playnow();
      break;

    case "add":
      add(client, message, args[1], queue);
      console.log(queue);
      break;

    case "play":
      console.log(queue);
      if (queue.length <= 0) {
        message.channel.send(
          "Du musch ersch songs zur queue hinzufügen. Sus kann i nix abspiela"
        );
      } else {
        message.channel.send("I spiel jetzt dine queue ab");
        voiceChannel = message.member.voice.channel;

        play(queue, voiceChannel);
      }

      break;
    case "help":
      help();
      break;

    case "skip":
      skip(queue, message, voiceChannel);
      break;
    case "stop":
      operators.stop(message, currentPlaynow_link, voiceChannel);
      break;

    case "resume":
      operators.resume(message, currentPlaynow_link, voiceChannel);
      break;

    case "np":
      np(message, queue);
      break;

    case "leave":
      if (message.member.voice.channel) {
        message.member.voice.channel.leave();
        message.channel.send("Tschau Pfuite!");
      } else {
        message.channel.send("I bin ned mol gejoined du Sack");
      }
      break;

    case "clear":
      clear(message, queue);
      break;

    case "queue":
      showQueue(message, queue, client);
      break;

    case "join":
      if (message.member.voice.channel) {
        message.member.voice.channel.join().then((connection) => {
          connection.play("assets/audios/britta_join.mp3", {
            volume: 5,
          });
        });
      } else {
        message.channel.send("Du befindesch di ned in uanam Sprachkanal");
      }

    case "britta":
      britta(message, guild);
      break;

    case "gibarua":
      gibarua(message);
      break;

    case "prefix":
      PREFIX = setPrefix(message, args, PREFIX);
      break;

    case "setVolume":
      setVolume(message, args, dispatcher);
      break;

    case "earrape":
      earrapeOn = earrape(message, earrapeOn, dispatcher);
      break;

    default:
      message.channel.send("Des Kommando kennt dBritta neda, sorry");
      break;
  }
});

client.login(TOKEN);
