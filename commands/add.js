const Discord = require("discord.js");
const client = new Discord.Client();
const play = require("../commands/play");

var SpotifyWebApi = require("spotify-web-api-node");

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: "72e60c5e4c49409198f6037b3df7ed22",
  clientSecret: "dac25a37ea7441708cec86772fbf35ae",
  redirectUri: "https://google.com",
});

spotifyApi.setAccessToken("dac25a37ea7441708cec86772fbf35ae");

spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
  function (data) {
    console.log("Artist albums", data.body);
  },
  function (err) {
    console.error(err);
  }
);

var ytSearch = require("youtube-search");
const { PREFIX, TOKEN, YOUTUBE_API } = require("../config/config.json");

var opts = {
  maxResults: 1,
  key: YOUTUBE_API,
  type: "video",
};

let add = (client, message, args, queue, voiceChannel) => {
  let songRequest;

  if (args.length < 2) {
    message.channel.send({
      embed: {
        color: 3447003,
        author: {
          name: "❗ Couldn't find a song request",
        },
        timestamp: new Date(),
        footer: {
          text: "© Britta",
        },
      },
    });
    return;
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
    songRequest = args[1];
    try {
      ytSearch(songRequest, opts, function (err, results) {
        if (err) return;

        if (!results) {
          message.channel.send("This song could not be found");
          return;
        }

        let songRequest_data = results[0];
        queue.push(songRequest_data);
        console.log(queue);
        let songRequest_link = results[0].link;
        let songRequest_title = results[0].title;
        let songRequest_description = results[0].description;
        let songRequest_thumbnail = results[0].thumbnails.high.url;
        console.log(results[0].link);
        console.log(results[0]);

        message.channel.send({
          embed: {
            color: 3447003,
            author: {
              name: "Song has been added to queue",
            },
            title: songRequest_title,
            url: songRequest_link,
            description: songRequest_description,
            thumbnail: {
              url: songRequest_thumbnail,
            },
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Britta",
            },
          },
        });
      });
    } catch (error) {
      message.channel.send({
        embed: {
          color: 3447003,
          author: {
            name: "⚠️ There was an error adding your song to queue",
            icon_url: client.user.avatarURL,
          },
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Britta",
          },
        },
      });
    }
  } else if (args[1].includes("https://open.spotify.com/track/")) {
    songRequest = args[1];
    message.channel.send("spotify");
    //https://open.spotify.com/track/6skRokbpxb1OFXqxzpEQVi?si=R4vnoprlT5SaXi7JduBrzA
  } else {
    args.shift();
    songRequest = args.join(" ");
    console.log(songRequest);
    try {
      ytSearch(songRequest, opts, function (err, results) {
        if (err) return;

        if (!results) {
          message.channel.send({
            embed: {
              color: 3447003,
              author: {
                name: "❗ This song couln't be found",
              },
              timestamp: new Date(),
              footer: {
                text: "© Britta",
              },
            },
          });
          return;
        }

        let songRequest_data = results[0];
        queue.push(songRequest_data);
        console.log(queue);
        let songRequest_link = results[0].link;
        let songRequest_title = results[0].title;
        let songRequest_description = results[0].description;
        let songRequest_thumbnail = results[0].thumbnails.high.url;
        console.log(results[0].link);
        console.log(results[0]);

        message.channel.send({
          embed: {
            color: 3447003,
            author: {
              name: "Song has been added to queue",
            },
            title: songRequest_title,
            url: songRequest_link,
            description: songRequest_description,
            thumbnail: {
              url: songRequest_thumbnail,
            },
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Britta",
            },
          },
        });
      });
    } catch (error) {
      message.channel.send({
        embed: {
          color: 3447003,
          author: {
            name: "⚠️ There was an error adding your song to queue",
            icon_url: client.user.avatarURL,
          },
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Britta",
          },
        },
      });
    }
  }

  if (queue.length == 0) {
    play(queue, voiceChannel, message);
    console.log(queue);
  }
};

module.exports = add;
