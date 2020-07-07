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

var spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
  redirectUri: SPOTIFY_REDIRECT_URI,
});

spotifyApi.setAccessToken(SPOTIFY_ACCESS_TOKEN);

var youtubeAPIConnectionStatus = "✔️ connected";

function checkYouTubeStatus() {
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

var spotiyAPIConnectionStatus = "✔️ connected";

function checkSpotifyStatus() {
  try {
    var spotifyApi = new SpotifyWebApi({
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      redirectUri: SPOTIFY_REDIRECT_URI,
    });

    spotifyApi.setAccessToken(SPOTIFY_ACCESS_TOKEN);
    spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
      function (data) {},
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

module.exports = {
  name: "stats",
  description: "Shows Brittas statistics",
  execute(message, args) {
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
        ],
        timestamp: new Date(),
        footer: {
          text: "© Britta",
        },
      },
    });
  },
};
