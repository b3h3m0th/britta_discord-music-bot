const Discord = require("discord.js");
const ytdl = require("ytdl-core");

const client = new Discord.Client();

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
  "https://discord.com/oauth2/authorize?client_id=722497903146565722&scope=bot&permissions=0";

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

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.content.substring(0, 1) !== PREFIX) return;
  let args = message.content.substring(PREFIX.length).split(" ");
  console.log(args);

  //COMMANDS
  switch (args[0]) {
    case "playnow":
      playnow(client, voiceChannel, args, message);
      break;

    case "add":
      voiceChannel = message.member.voice.channel;
      add(client, message, args, queue, voiceChannel);
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
        play(queue, voiceChannel, message);
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
      operators.stop(message, currentPlaynow_link, voiceChannel);
      break;

    case "resume":
      currentPlaynow_link = queue[0];
      operators.resume(message, currentPlaynow_link, voiceChannel);
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
      clear(message, queue);
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
