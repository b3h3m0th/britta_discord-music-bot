const {
  PREFIX,
  TOKEN,
  YOUTUBE_API,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_REDIRECT_URI,
} = require("../config/config.json");
var ytSearch = require("youtube-search");
var SpotifyWebApi = require("spotify-web-api-node");
const mongoose = require("mongoose");
const Guild = require("../utils/mongoDB/models/guild");

var spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
  redirectUri: SPOTIFY_REDIRECT_URI,
});

spotifyApi.setAccessToken(SPOTIFY_ACCESS_TOKEN);

function checkYouTubeStatus() {
  var youtubeAPIConnectionStatus = "✔️ connected";

  var opts = {
    maxResults: 1,
    key: YOUTUBE_API,
    type: "video",
  };
  try {
    ytSearch("Guns n Roses Sweet child o mine", opts, function (err, results) {
      if (err) {
        youtubeAPIConnectionStatus = "❌ disconnected";
      }
      if (results == undefined) {
        youtubeAPIConnectionStatus = "❌ disconnected";
      }
      if (results[0].link != "https://www.youtube.com/watch?v=1w7OgIMMRc4") {
        youtubeAPIConnectionStatus = "❌ disconnected";
      } else {
        youtubeAPIConnectionStatus = "✔️ connected";
      }
    });
  } catch (error) {
    console.log("fehler: " + error);
    youtubeAPIConnectionStatus = "❌ disconnected";
  }
  return youtubeAPIConnectionStatus;
}

function checkSpotifyStatus() {
  var spotiyAPIConnectionStatus = "✔️ connected";

  try {
    var spotifyApi = new SpotifyWebApi({
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      redirectUri: SPOTIFY_REDIRECT_URI,
    });

    spotifyApi.setAccessToken(SPOTIFY_ACCESS_TOKEN);
    spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
      function (data) {
        console.log(data.body);
        spotiyAPIConnectionStatus = "✔️ connected";
      },
      function (err) {
        console.log("Spotify not connected " + err);
        spotiyAPIConnectionStatus = "❌ disconnected";
      }
    );
  } catch (error) {
    console.log("Spotify not connected " + error);
    spotiyAPIConnectionStatus = "❌ disconnected";
  }
  return spotiyAPIConnectionStatus;
}

function checkMongoDBStatus(message) {
  var MongoDBConnectionStatus = "❌ disconnected";
  try {
    Guild.findOne({ connection_query: "successful" }, async (err, data) => {
      if (err) {
        MongoDBConnectionStatus = "❌ disconnected";
        return console.log("asdf" + err);
      }
      if (data.connection_query == "successful") {
        console.log(data);
        MongoDBConnectionStatus = "✔️ connected";
      } else {
        MongoDBConnectionStatus = "❌ disconnected";
      }
    });
    MongoDBConnectionStatus = "✔️ connected";
  } catch (error) {
    MongoDBConnectionStatus = "❌ disconnected";
    console.log(error);
  }
  return MongoDBConnectionStatus;
}

module.exports = {
  name: "stats",
  description: "Shows Brittas statistics",
  category: "info",
  execute(message, args) {
    checkYouTubeStatus();
    checkSpotifyStatus();

    let serverCount = message.client.guilds.cache.size;
    let channelCount = message.client.channels.cache.size;
    let userCount = message.client.users.cache.size;
    message.channel.send({
      embed: {
        color: message.client.messageEmbedData.color,
        author: {
          name: message.client.user.username,
          icon_url: message.client.user.avatarURL(),
        },
        title: "📈 Britta stats",
        description: "Statistics about the Britta discord music bot",
        fields: [
          {
            name: "Number of servers",
            value: "`" + serverCount + "`",
          },
          {
            name: "Number of channels",
            value: "`" + channelCount + "`",
          },
          {
            name: "Number of users",
            value: "`" + userCount + "`",
          },
          {
            name: "YouTube API",
            value: "`" + checkYouTubeStatus() + "`",
            inline: true,
          },
          {
            name: "Spotify API",
            value: "`" + checkSpotifyStatus() + "`",
            inline: true,
          },
          {
            name: "MongoDB",
            value: "`" + checkMongoDBStatus() + "`",
            inline: true,
          },
        ],
        footer: {
          text: `Developed by ${message.client.admins[0].username}#${message.client.admins[0].discriminator} | © Britta`,
          icon_url: message.client.admins[0].icon_url,
        },
      },
    });
  },
};
