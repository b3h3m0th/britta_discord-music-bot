const {
  PREFIX,
  TOKEN,
  YOUTUBE_API,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI,
} = require("../config/config.json");
const ytdl = require("ytdl-core");

var SpotifyWebApi = require("spotify-web-api-node");

var spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
  redirectUri: SPOTIFY_REDIRECT_URI,
});

// Spotify Token
//test song: https://open.spotify.com/track/5hdOAZuYJWsAGOxBKUHpvu?si=KHSPjTTqS2mOcVWx2-zKkw
//same song but url from browser: https://open.spotify.com/track/5hdOAZuYJWsAGOxBKUHpvu

// spotifyApi.setAccessToken(SPOTIFY_ACCESS_TOKEN);

//const sAPI = new _spotifyWebApiNode.default({
//  clientId: process.env.SPOTIFY_CLIENT_ID,
//   clientSecret: process.env.SPOTIFY_CLIENT_SECRET
 //  });

var token = 0;

const getToken = () => {
  spotifyApi.clientCredentialsGrant().then(data => {
      console.log('The access token expires in ' + data.body['expires_in']);
              spotifyApi.setAccessToken(data.body['access_token']);
                  setTimeout(() => getToken(), (data.body['expires_in'] - 20) * 1000);
                    }, err => {
                        console.log('Something went wrong when retrieving an access token', err);
                            process.exit(1);
                              });
                              };
getToken();

var ytSearch = require("youtube-search");
const { lastIndexOf } = require("ffmpeg-static");

var opts = {
  maxResults: 1,
  key: YOUTUBE_API,
  type: "video",
};

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
          icon_url: message.client.user.avatarURL(),
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

let getSpotifyPlaylistID = (uri) => {
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
        color: message.client.messageEmbedData.color,
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

module.exports = {
  name: "play",
  description: "plays a song and adds it to the queue",
  category: "music",
  async execute(message, args) {
    if (!message.member.voice.channel) {
      return message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "❗ You need to be in a voice channel",
            icon_url: message.member.user.avatarURL(),
          },
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
    }
    const play = async (song) => {
      const queue = message.client.queue.get(message.guild.id);
      if (!song) {
        queue.voiceChannel.leave();
        message.client.queue.delete(message.guild.id);
        return;
      }

      const dispatcher = queue.connection
        .play(ytdl(song.link))
        .on("finish", () => {
          queue.songs.shift();
          play(queue.songs[0]);
        })
        .on("error", (error) => console.error(error));
      dispatcher.setVolumeLogarithmic(queue.volume / 100);
    };

    const serverQueue = message.client.queue.get(message.guild.id);

    var songRequest;
    var song = {};

    if (args.length < 2) {
      message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "❗ Couldn't find a song request",
            icon_url: message.client.user.avatarURL(),
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
        ytSearch(songRequest, opts, async function (err, results) {
          if (err) {
            console.log(err);
            return;
          }

          if (!results) {
            message.channel.send({
              embed: {
                color: message.client.messageEmbedData.color,
                author: {
                  name: "❗ This song couldn't be found",
                  icon_url: message.client.user.avatarURL(),
                },
                timestamp: new Date(),
                footer: {
                  text: "© Britta",
                },
              },
            });
            return;
          }
          song = {
            link: results[0].link,
            title: results[0].title,
            description: results[0].description,
            thumbnail: results[0].thumbnails.high.url,
          };
          console.log(song);

          if (serverQueue) {
            serverQueue.songs.push(song);
            message.channel.send({
              embed: {
                color: message.client.messageEmbedData.color,
                author: {
                  name: "Song has been added to queue",
                  icon_url: message.client.resources.youtubeIcon,
                },
                title: song.title,
                url: song.link,
                description: song.description,
                thumbnail: {
                  url: song.thumbnail,
                },
                timestamp: new Date(),
                footer: {
                  icon_url: message.client.user.avatarURL,
                  text: "© Britta",
                },
              },
            });
            return;
          } else {
            const queueConstruct = {
              textChannel: message.channel,
              voiceChannel: message.member.voice.channel,
              connection: null,
              songs: [],
              volume: 100,
              playing: true,
            };

            message.client.queue.set(message.guild.id, queueConstruct);
            queueConstruct.songs.push(song);

            try {
              const connection = await message.member.voice.channel.join();
              queueConstruct.connection = connection;
              play(queueConstruct.songs[0]);
            } catch (error) {
              console.error(`I could not join the voice channel: ${error}`);
              message.client.queue.delete(message.guild.id);
              await message.member.voice.channel.leave();
              return message.channel.send({
                embed: {
                  color: message.client.messageEmbedData.color,
                  author: {
                    name: "❗ I could not join your voice channel",
                    icon_url: message.client.user.avatarURL(),
                  },
                  timestamp: new Date(),
                  footer: {
                    text: "© Britta",
                  },
                },
              });
            }
          }
        });
      } catch (error) {
        message.channel.send({
          embed: {
            color: message.client.messageEmbedData.color,
            author: {
              name: "⚠️ There was an error adding your song to queue",
              icon_url: message.client.user.avatarURL(),
            },
            timestamp: new Date(),
            footer: {
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
            ytSearch(track_data, opts, async function (err, results) {
              if (err) {
                console.log(err);
                return;
              }

              if (!results) {
                message.channel.send({
                  embed: {
                    color: message.client.messageEmbedData.color,
                    author: {
                      name: "❗ This song couln't be found",
                      icon_url: message.client.user.avatarURL(),
                    },
                    timestamp: new Date(),
                    footer: {
                      text: "© Britta",
                    },
                  },
                });
                return;
              }

              song = {
                link: results[0].link,
                title: results[0].title,
                description: results[0].description,
                thumbnail: results[0].thumbnails.high.url,
              };
              console.log(song);

              if (serverQueue) {
                serverQueue.songs.push(song);
                message.channel.send({
                  embed: {
                    color: message.client.messageEmbedData.color,
                    author: {
                      name: "Song has been added to queue",
                      icon_url:
                        "http://pluspng.com/img-png/spotify-logo-png-open-2000.png",
                    },
                    title: song.title,
                    url: song.link,
                    description: song.description,
                    thumbnail: {
                      url: song.thumbnail,
                    },
                    timestamp: new Date(),
                    footer: {
                      text: "© Britta",
                    },
                  },
                });
                return;
              } else {
                const queueConstruct = {
                  textChannel: message.channel,
                  voiceChannel: message.member.voice.channel,
                  connection: null,
                  songs: [],
                  volume: 100,
                  playing: true,
                };

                message.client.queue.set(message.guild.id, queueConstruct);
                queueConstruct.songs.push(song);

                try {
                  const connection = await message.member.voice.channel.join();
                  queueConstruct.connection = connection;
                  play(queueConstruct.songs[0]);
                } catch (error) {
                  console.error(`I could not join the voice channel: ${error}`);
                  message.client.queue.delete(message.guild.id);
                  await message.member.voice.channel.leave();
                  return message.channel.send({
                    embed: {
                      color: message.client.messageEmbedData.color,
                      author: {
                        name: "❗ I could not join your voice channel",
                        icon_url: message.client.user.avatarURL(),
                      },
                      timestamp: new Date(),
                      footer: {
                        text: "© Britta",
                      },
                    },
                  });
                }
              }

              message.channel.send({
                embed: {
                  color: message.client.messageEmbedData.color,
                  author: {
                    name: "Song has been added to queue",
                    icon_url: message.client.resources.spotifyIcon,
                  },
                  title: song.title,
                  url: song.link,
                  description: song.description,
                  thumbnail: {
                    url: song.thumbnail,
                  },
                  timestamp: new Date(),
                  footer: {
                    icon_url: message.client.user.avatarURL,
                    text: "© Britta",
                  },
                },
              });
            });
          } catch (error) {
            message.channel.send({
              embed: {
                color: message.client.messageEmbedData.color,
                author: {
                  name: "⚠️ There was an error adding your song to queue",
                  icon_url: message.client.resources.spotifyIcon,
                },
                timestamp: new Date(),
                footer: {
                  icon_url: message.client.user.avatarURL,
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
              color: message.client.messageEmbedData.color,
              author: {
                name: "❗ There was an error finding your song",
                icon_url:
                  "http://pluspng.com/img-png/spotify-logo-png-open-2000.png",
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
              ytSearch(track_data, opts, async function (err, results) {
                if (err) return;

                if (!results) {
                  message.channel.send({
                    embed: {
                      color: message.client.messageEmbedData.color,
                      author: {
                        name: "❗ A song of that album couln't be found",
                        icon_url: message.client.resources.spotifyIcon,
                      },
                      timestamp: new Date(),
                      footer: {
                        text: "© Britta",
                      },
                    },
                  });
                  return;
                }

                song = {
                  link: results[0].link,
                  title: results[0].title,
                  description: results[0].description,
                  thumbnail: results[0].thumbnails.high.url,
                };
                console.log(song);

                if (serverQueue) {
                  serverQueue.songs.push(song);
                  message.channel.send({
                    embed: {
                      color: message.client.messageEmbedData.color,
                      author: {
                        name: "Song has been added to queue",
                        icon_url: message.client.resources.spotifyIcon,
                      },
                      title: song.title,
                      url: song.link,
                      description: song.description,
                      thumbnail: {
                        url: song.thumbnail,
                      },
                      timestamp: new Date(),
                      footer: {
                        text: "© Britta",
                      },
                    },
                  });
                  return;
                } else {
                  const queueConstruct = {
                    textChannel: message.channel,
                    voiceChannel: message.member.voice.channel,
                    connection: null,
                    songs: [],
                    volume: 100,
                    playing: true,
                  };

                  message.client.queue.set(message.guild.id, queueConstruct);
                  queueConstruct.songs.push(song);

                  try {
                    const connection = await message.member.voice.channel.join();
                    queueConstruct.connection = connection;
                    play(queueConstruct.songs[0]);
                  } catch (error) {
                    console.error(
                      `I could not join the voice channel: ${error}`
                    );
                    message.client.queue.delete(message.guild.id);
                    await message.member.voice.channel.leave();
                    return message.channel.send({
                      embed: {
                        color: message.client.messageEmbedData.color,
                        author: {
                          name: "❗ I could not join your voice channel",
                          icon_url: message.client.user.avatarURL(),
                        },
                        timestamp: new Date(),
                        footer: {
                          text: "© Britta",
                        },
                      },
                    });
                  }
                }
              });
            } catch (error) {
              message.channel.send({
                embed: {
                  color: message.client.messageEmbedData.color,
                  author: {
                    name:
                      "⚠️ There was an error adding one of the song of you album to queue",
                    icon_url: message.client.user.avatarURL(),
                  },
                  timestamp: new Date(),
                  footer: {
                    text: "© Britta",
                  },
                },
              });
            }
          });
          message.channel.send({
            embed: {
              color: message.client.messageEmbedData.color,
              author: {
                name: "✔️ Added " + tracks_count + " songs to the queue",
                icon_url: message.client.resources.spotifyIcon,
              },
              timestamp: new Date(),
              footer: {
                icon_url: message.client.user.avatarURL,
                text: "© Britta",
              },
            },
          });
        },
        function (err) {
          console.error(err);
          message.channel.send({
            embed: {
              color: message.client.messageEmbedData.color,
              author: {
                name: "❗ There was an error finding your album",
                icon_url: message.client.resources.spotifyIcon,
              },
              timestamp: new Date(),
              footer: {
                text: "© Britta",
              },
            },
          });
        }
      );
    } else if (
      args[1].includes("https://open.spotify.com/playlist/") ||
      args[1].includes("spotify:playlist:")
    ) {
      songRequest = args[1];
      console.log(songRequest);
      spotifyApi
        .getPlaylistTracks(getSpotifyAlbumID(songRequest))
        .then(function (data) {
          let tracks = data.body.items;
          let tracks_count = data.body.total;
          console.log(tracks);
        });
      //https://open.spotify.com/playlist/1s3lodV2riSx7EjVxHYafc?si=GSNA_gZPRCaZnu3JjZFC5g
      //spotify:playlist:1s3lodV2riSx7EjVxHYafc
    } else {
      args.shift();
      songRequest = args.join(" ");
      console.log(songRequest);
      try {
        ytSearch(songRequest, opts, async function (err, results) {
          if (err) {
            console.log(err);
            return;
          }

          if (!results) {
            message.channel.send({
              embed: {
                color: message.messageEmbedData.client.color,
                author: {
                  name: "❗ This song couldn't be found",
                  icon_url: message.client.user.avatarURL(),
                },
                timestamp: new Date(),
                footer: {
                  text: "© Britta",
                },
              },
            });
            return;
          }

          song = {
            link: results[0].link,
            title: results[0].title,
            description: results[0].description,
            thumbnail: results[0].thumbnails.high.url,
          };
          console.log(song);

          if (serverQueue) {
            serverQueue.songs.push(song);
            message.channel.send({
              embed: {
                color: message.client.messageEmbedData.color,
                author: {
                  name: "Song has been added to queue",
                  icon_url: message.client.resources.youtubeIcon,
                },
                title: song.title,
                url: song.link,
                description: song.description,
                thumbnail: {
                  url: song.thumbnail,
                },
                timestamp: new Date(),
                footer: {
                  icon_url: message.client.user.avatarURL,
                  text: "© Britta",
                },
              },
            });
            return;
          } else {
            const queueConstruct = {
              textChannel: message.channel,
              voiceChannel: message.member.voice.channel,
              connection: null,
              songs: [],
              volume: 100,
              playing: true,
            };

            message.client.queue.set(message.guild.id, queueConstruct);
            queueConstruct.songs.push(song);

            try {
              const connection = await message.member.voice.channel.join();
              queueConstruct.connection = connection;
              play(queueConstruct.songs[0]);
            } catch (error) {
              console.error(`I could not join the voice channel: ${error}`);
              message.client.queue.delete(message.guild.id);
              return message.channel.send({
                embed: {
                  color: message.client.messageEmbedData.color,
                  author: {
                    name: "❗ I could not join your voice channel",
                    icon_url: message.client.user.avatarURL(),
                  },
                  timestamp: new Date(),
                  footer: {
                    text: "© Britta",
                  },
                },
              });
              message.member.voice.channel.leave();
            }
          }

          message.channel.send({
            embed: {
              color: message.client.messageEmbedData.color,
              author: {
                name: "Song has been added to queue",
                icon_url: message.client.resources.youtubeIcon,
              },
              title: song.title,
              url: song.link,
              description: song.description,
              thumbnail: {
                url: song.thumbnail,
              },
              timestamp: new Date(),
              footer: {
                text: "© Britta",
              },
            },
          });
        });
      } catch (error) {
        message.channel.send({
          embed: {
            color: message.client.messageEmbedData.color,
            author: {
              name: "⚠️ There was an error adding your song to queue",
              icon_url: message.client.user.avatarURL(),
            },
            timestamp: new Date(),
            footer: {
              text: "© Britta",
            },
          },
        });
      }
    }
    // if (message.client.queue.songs.length > 0) {
    //   play(queue, voiceChannel, message, dispatcher);
    // }
  },
};
