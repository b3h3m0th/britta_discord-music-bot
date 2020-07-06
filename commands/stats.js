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

const checkYouTubeStatus = () => {
  var status;
  var opts = {
    maxResults: 1,
    key: YOUTUBE_API,
    type: "video",
  };
  try {
    ytSearch(
      "https://www.youtube.com/watch?v=C_ijc7A5oAc",
      opts,
      async function (err, results) {
        if (err) {
          console.log(err);
          status = "❌ disconnected";
          return status;
        }

        if (!results) {
          status = "❌ disconnected";
          return status;
        }
      }
    );

    status = "✔️ connected";
    return status;
  } catch (error) {
    console.log(error);
    status = "❌ disconnected";
    return status;
  }
};

const checkSpotifyStatus = () => {
  var status;

  try {
    var spotifyApi = new SpotifyWebApi({
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      redirectUri: SPOTIFY_REDIRECT_URI,
    });

    spotifyApi.setAccessToken(SPOTIFY_ACCESS_TOKEN);
    spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
      function (data) {
        console.log("Artist albums", data.body);
      },
      function (err) {
        console.error(err);
        status = "❌ disconnected";
        return status;
      }
    );
  } catch (error) {
    console.log(error);
    status = "❌ disconnected";
    return status;
  }

  status = "✔️ connected";
  return status;
};

module.exports = {
  name: "stats",
  description: "Shows Brittas statistics",
  execute(message, args) {
    let serverCount = message.client.guilds.cache.size;
    let channelCount = message.client.channels.cache.size;
    let userCount = message.client.users.cache.size;
    message.channel.send({
      embed: {
        color: 3447003,
        author: {
          name: message.client.user.username,
          icon_url: message.client.user.avatarURL,
        },
        title: "📈 Britta stats",
        description: "some statistics about the Britta discord music bot",
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
          icon_url: message.client.user.avatarURL,
          text: "© Britta",
        },
      },
    });
  },
};
