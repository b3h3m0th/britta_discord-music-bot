const Discord = require("discord.js");
const client = new Discord.Client();
const play = require("../commands/play");
const {
  PREFIX,
  TOKEN,
  YOUTUBE_API,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_REDIRECT_URI,
} = require("../config/config.json");
console.log(SPOTIFY_ACCESS_TOKEN);

var SpotifyWebApi = require("spotify-web-api-node");

var spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
  redirectUri: SPOTIFY_REDIRECT_URI,
});

// Spotify Token
//test song: https://open.spotify.com/track/5hdOAZuYJWsAGOxBKUHpvu?si=KHSPjTTqS2mOcVWx2-zKkw
//same song but url from browser: https://open.spotify.com/track/5hdOAZuYJWsAGOxBKUHpvu

spotifyApi.setAccessToken(SPOTIFY_ACCESS_TOKEN);

// spotifyApi.getTrack("5hdOAZuYJWsAGOxBKUHpvu").then(
//   function (data) {
//     console.log("Artist albums", data.body);
//     console.log("2VBypaEI3zx4zCyQm8z50k".length);
//   },
//   function (err) {
//     console.error(err);
//   }
// );

var ytSearch = require("youtube-search");
const { lastIndexOf } = require("ffmpeg-static");

var opts = {
  maxResults: 1,
  key: YOUTUBE_API,
  type: "video",
};

let add = (client, message, args, queue, voiceChannel, dispatcher) => {
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
  } else if (
    args[1].includes("https://open.spotify.com/track/") ||
    args[1].includes("spotify:track:")
  ) {
    songRequest = args[1];
    console.log(songRequest);
    spotifyApi.getTrack(getSpotifyTrackID(songRequest)).then(
      function (data) {
        let track = data.body;
        track_data = track.name + " " + track.artists[0].name;

        try {
          ytSearch(track_data, opts, function (err, results) {
            if (err) {
              console.log(err);
              return;
            }

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
            console.log("results: " + results[0]);
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
      },
      function (err) {
        console.log(err);
        message.channel.send({
          embed: {
            color: 3447003,
            author: {
              name: "❗ There was an error finding your song",
            },
            timestamp: new Date(),
            footer: {
              text: "© Britta",
            },
          },
        });
      }
    );
    //https://open.spotify.com/track/6skRokbpxb1OFXqxzpEQVi?si=R4vnoprlT5SaXi7JduBrzA
    //spotify:track:6skRokbpxb1OFXqxzpEQVi
  } else if (
    args[1].includes("https://open.spotify.com/album/") ||
    args[1].includes("spotify:album:")
  ) {
    //PLAYLISTS
    //https://open.spotify.com/album/2mGohCvbL3klQgXyTj7uNB?si=Aja8MUa9QDytoUNlPjfMRA
    //spotify:album:311FLOGT9CsxDwy86X9nyl
    songRequest = args[1];
    spotifyApi.getAlbumTracks(getSpotifyAlbumID(songRequest)).then(
      function (data) {
        let tracks = data.body.items;
        let tracks_count = data.body.total;
        // console.log(tracks);
        tracks.forEach((item, index) => {
          let track_name = item.name;
          let artist_name = item.artists[0].name;
          let track_data = track_name + " by " + artist_name;
          console.log(track_data);

          try {
            ytSearch(track_data, opts, function (err, results) {
              if (err) return;

              if (!results) {
                message.channel.send({
                  embed: {
                    color: 3447003,
                    author: {
                      name: "❗ A song of that album couln't be found",
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
              console.log("data: " + songRequest_data);
              queue.push(songRequest_data);
              let songRequest_link = results[0].link;
              let songRequest_title = results[0].title;
              let songRequest_description = results[0].description;
              let songRequest_thumbnail = results[0].thumbnails.high.url;
            });
          } catch (error) {
            message.channel.send({
              embed: {
                color: 3447003,
                author: {
                  name:
                    "⚠️ There was an error adding one of the song of you album to queue",
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
        });
        message.channel.send({
          embed: {
            color: 3447003,
            author: {
              name: "✔️ Added " + tracks_count + " songs to the queue",
              icon_url: client.user.avatarURL,
            },
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Britta",
            },
          },
        });
      },
      function (err) {
        console.error(err);
        message.channel.send({
          embed: {
            color: 3447003,
            author: {
              name: "❗ There was an error finding your album",
            },
            timestamp: new Date(),
            footer: {
              text: "© Britta",
            },
          },
        });
      }
    );
  } else {
    args.shift();
    songRequest = args.join(" ");
    console.log(songRequest);
    try {
      ytSearch(songRequest, opts, function (err, results) {
        if (err) {
          console.log(err);
          return;
        }

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

  if (queue.length > 0) {
    play(queue, voiceChannel, message, dispatcher);
    console.log(queue);
  }
};

module.exports = add;

//PRIVATE FUNCTIONS

let getSpotifyTrackID = (uri) => {
  try {
    if (uri.includes("https://")) {
      let url_parameters = uri.split("?");
      let actual_url = url_parameters[0];
      console.log("actual url: " + actual_url);
      url_parts = actual_url.split("/");
      console.log(url_parts);
      console.log(url_parts[url_parts.length - 1]);
      return url_parts[url_parts.length - 1];
    } else {
      let uri_parts = uri.split(":");
      console.log(uri_parts[uri_parts.length - 1]);
      return uri_parts[uri_parts.length - 1];
    }
  } catch (error) {
    message.channel.send({
      embed: {
        color: 3447003,
        author: {
          name: "❗ Please enter a valid Spotify URL of URI",
        },
        timestamp: new Date(),
        footer: {
          text: "© Britta",
        },
      },
    });
  }
};

let getSpotifyAlbumID = (uri) => {
  try {
    if (uri.includes("https://")) {
      let url_parameters = uri.split("?");
      let actual_url = url_parameters[0];
      console.log("actual url: " + actual_url);
      url_parts = actual_url.split("/");
      console.log(url_parts);
      console.log(url_parts[url_parts.length - 1]);
      return url_parts[url_parts.length - 1];
    } else {
      let uri_parts = uri.split(":");
      console.log(uri_parts[uri_parts.length - 1]);
      return uri_parts[uri_parts.length - 1];
    }
  } catch (error) {
    message.channel.send({
      embed: {
        color: 3447003,
        author: {
          name: "❗ Please enter a valid Spotify URL of URI",
        },
        timestamp: new Date(),
        footer: {
          text: "© Britta",
        },
      },
    });
  }
};
