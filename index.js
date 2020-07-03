const Discord = require("discord.js");
const ytdl = require("ytdl-core");

const client = new Discord.Client();

//Britta requirements
const britta = require("./commands/britta");
const gibarua = require("./commands/gibarua");
const help = require("./commands/help");
const add = require("./commands/add");
const play = require("./commands/play");
const setPrefix = require("./commands/changePrefix");
const skip = require("./commands/skip");
const np = require("./commands/np");
const showQueue = require("./commands/queue");
const playnow = require("./commands/playnow");
const ping = require("./commands/ping");
const join = require("./commands/join");

//dev
const joinVirtualUser = require("./dev/joinVirtualUser");

//components

//Britta data
let { PREFIX, TOKEN, YOUTUBE_API } = require("./config/config.json");
var VERSION = 1.0;
const inviteLink =
  "https://discord.com/oauth2/authorize?client_id=722497903146565722&scope=bot&permissions=2146955121";

client.on("ready", () => {
  console.log(
    "Sodele i bin jetzt parat mit minara version " + VERSION.toString()
  );
  client.user.setUsername("Britta");
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

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;
  let args = message.content.substring(PREFIX.length).split(" ");
  console.log(args);

  //COMMANDS
  switch (args[0]) {
    case "playnow":
      let playnow = () => {
        var opts = {
          maxResults: 1,
          key: YOUTUBE_API,
          type: "video",
        };

        try {
          if (args.length < 2) {
            message.channel.send("Couldn't find a song request");
            return;
          }

          //check validation
          if (message.channel.type !== "text") return;
          voiceChannel = message.member.voice.channel;
          if (!voiceChannel) {
            return message.channel.send("You are not in a voice channel");
          }

          if (
            args[1].includes("https://youtube.com/watch") ||
            args[1].includes("https://www.youtube.com/watch") ||
            args[1].includes("http://youtube.com/watch") ||
            args[1].includes("http://www.youtube.com/watch") ||
            args[1].includes("https://youtu.be/") ||
            args[1].includes("https://www.youtu.be/") ||
            args[1].includes("http://www.youtu.be/") ||
            args[1].includes("http://youtu.be/")
          ) {
            try {
              let songRequest = args[1];
              voiceChannel.join().then((connection) => {
                stream = ytdl(songRequest, {
                  filter: "audioonly",
                });
                dispatcher = connection.play(stream);
                dispatcher.on("end", () => {
                  message.channel.send("finished");
                  queue.shift();
                  if (queue.length > 0) {
                    play();
                  } else return;
                });
              });

              message.channel.send("I spiel jetzt den song us da URL ab");
            } catch (error) {
              message.channel.send("Sorry aba der link isch am arsch");
            }
          } else if (args[1].includes("https://open.spotify.com/track/")) {
            voiceChannel.join().then((connection) => {
              stream = ytdl(args[1], {
                filter: "audioonly",
              });
              dispatcher = connection.play(stream);
              dispatcher.on("end", () => {
                message.channel.send("finished");
                queue.shift();
                if (queue.length > 0) {
                  play();
                } else return;
              });
            });
          } else {
            args.shift();
            console.log(args);
            let songRequest = args.join(" ");
            console.log(songRequest);
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
                });

                message.channel.send({
                  embed: {
                    color: 3447003,
                    author: {
                      name: client.user.username,
                      icon_url:
                        "https://images-ext-1.discordapp.net/external/9_3dcPqCXGMU3WFySOvtVYjIKsZnN6zcyg7oVTn8Zlw/%3Fv%3D1/https/cdn.discordapp.com/emojis/673357192203599904.gif",
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
          }
        } catch (error) {
          message.channel.send(
            "Es hot an Fehler gea, aba i woas ned was genau passiert isch."
          );
          console.log("Error: " + error);
        }
      };

      playnow();

      break;

    case "add":
      voiceChannel = message.member.voice.channel;
      add(client, message, args, queue, voiceChannel, dispatcher);
      break;

    case "play":
      voiceChannel = message.member.voice.channel;

      console.log(queue);
      if (queue.length <= 0) {
        message.channel.send({
          embed: {
            color: 3447003,
            author: {
              name: "❗ There are no songs in queue",
            },
            timestamp: new Date(),
            footer: {
              text: "© Britta",
            },
          },
        });
        return;
      } else {
        play(queue, voiceChannel, message, dispatcher);
        message.channel.send({
          embed: {
            color: 3447003,
            author: {
              name: "🎵 Playing songs from your queue",
            },
            timestamp: new Date(),
            footer: {
              text: "© Britta",
            },
          },
        });
      }

      break;
    case "help":
      help(message, client);
      break;

    case "skip":
      skip(client, queue, message, voiceChannel);
      break;
    case "stop":
      voiceChannel = message.member.voice.channel;
      voiceChannel.join().then((connection) => {
        stream = ytdl(currentPlaynow_link, {
          filter: "audioonly",
        });
        dispatcher = connection.play(stream);
        dispatcher.end();
      });
      message.channel.send({
        embed: {
          color: 3447003,
          author: {
            name: "⏹️ Song paused by " + message.author.username,
          },
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
      break;

    case "resume":
      voiceChannel = message.member.voice.channel;
      voiceChannel.join().then((connection) => {
        stream = ytdl(currentPlaynow_link, {
          filter: "audioonly",
        });
        dispatcher = connection.play(stream);
        console.log(dispatcher);
        dispatcher.resume();
      });
      message.channel.send({
        embed: {
          color: 3447003,
          author: {
            name: "▶️ Song resumed by " + message.author.username,
          },
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
      break;

    case "np":
      np(message, queue, client);
      break;

    case "leave":
      if (message.member.voice.channel) {
        message.member.voice.channel.leave();
        message.channel.send({
          embed: {
            color: 3447003,
            author: {
              name: "⭕ Bye, i left your voice channel",
            },
            timestamp: new Date(),
            footer: {
              text: "© Britta",
            },
          },
        });
      } else {
        message.channel.send({
          embed: {
            color: 3447003,
            author: {
              name: "❗ You are not in a voice channel",
            },
            timestamp: new Date(),
            footer: {
              text: "© Britta",
            },
          },
        });
      }
      break;

    case "clear":
      queue = [];
      message.channel.send({
        embed: {
          color: 3447003,
          author: {
            name: "✔️ Cleared the queue",
          },
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
      break;

    case "queue":
      showQueue(message, queue, client);
      break;

    case "join":
      join(message);
      break;

    case "britta":
      britta(message, message.channel, client);
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

    case "ping":
      ping(client, message);
      break;

    default:
      message.channel.send({
        embed: {
          color: 3447003,
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
      break;
  }
});

client.login(TOKEN);
