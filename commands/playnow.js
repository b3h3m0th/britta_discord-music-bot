const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require("ytdl-core");

let playnow = (client, voiceChannel, args, message) => {
  try {
    let songRequest = args[1];

    //check validation
    if (message.channel.type !== "text") return;
    voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.channel.send("Du seckel hoksch ned in anam Voicechat");
    }

    if (songRequest.includes("https://")) {
      try {
        voiceChannel.join().then((connection) => {
          stream = ytdl(songRequest, {
            filter: "audioonly",
          });
          dispatcher = connection.play(stream);

          dispatcher.on("end", () => {
            //play();
            //queue shift
          });
        });

        message.channel.send("I spiel jetzt den song us da URL ab");
      } catch (error) {
        message.channel.send("Sorry aba der link isch am arsch");
      }
    } else {
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
    }
  } catch (error) {
    message.channel.send(
      "Es hot an Fehler gea, aba i woas ned was genau passiert isch."
    );
  }
};

module.exports = playnow;
