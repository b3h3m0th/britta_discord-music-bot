const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require("ytdl-core");
const ytSearch = require("youtube-search");

let { PREFIX, TOKEN, YOUTUBE_API } = require("../config/config.json");

let playnow = (client, voiceChannel, args, message) => {
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

module.exports = playnow;
