const { GENIUS_API } = require("../config/config.json");
module.exports = {
  name: "lyrics",
  description:
    "Prints out the lyrics to the currently playing song. You can also search other song lyrics if you add the title of that song as a parameter to the command. ",
  category: "music",
  execute(message, args) {
    const lyrics = require("genius-lyrics-api");
    args.shift();

    try {
      if (args.length >= 2) {
        console.log(args);
        var searchSongRequest = args.join(" ");
        console.log(searchSongRequest);

        const searchOptions = {
          apiKey: GENIUS_API,
          title: searchSongRequest,
          artist: " ",
        };

        lyrics.getSong(searchOptions).then((song) => {
          message.channel
            .send({
              embed: {
                color: message.client.messageEmbedData.color,
                author: {
                  name: "Getting lyrics from Genius Lyrics...",
                  icon_url:
                    "https://images.genius.com/8ed669cadd956443e29c70361ec4f372.1000x1000x1.png",
                },
                timestamp: new Date(),
                footer: {
                  text: "© Britta",
                },
              },
            })
            .then((m) => {
              m.edit({
                embed: {
                  color: message.client.messageEmbedData.color,
                  author: {
                    name: "Britta",
                    icon_url:
                      "https://images.genius.com/8ed669cadd956443e29c70361ec4f372.1000x1000x1.png",
                  },
                  title: "Lyrics of " + song.url,
                  description: song.lyrics,
                  thumbnail: {
                    url: song.albumArt,
                  },
                  timestamp: new Date(),
                  footer: {
                    text: "© Britta",
                  },
                },
              });
            });
        });
      } else {
        if (!message.member.voice.channel) {
          message.channel.send({
            embed: {
              color: message.client.messageEmbedData.color,
              author: {
                name: "❗ You are not in a voice channel",
              },
              timestamp: new Date(),
              footer: {
                text: "© Britta",
              },
            },
          });
          return;
        }
        var serverQueue = message.client.queue.get(message.guild.id);

        if (!serverQueue) {
          message.channel.send({
            embed: {
              color: message.client.messageEmbedData.color,
              author: {
                name: "❗ There is no music playing right now",
              },
              timestamp: new Date(),
              footer: {
                text: "© Britta",
              },
            },
          });
          return;
        }

        const searchOptions = {
          apiKey: GENIUS_API,
          title: serverQueue.songs[0].title,
          artist: " ",
        };

        lyrics.getSong(searchOptions).then((song) => {
          console.log(song);
          message.channel
            .send({
              embed: {
                color: message.client.messageEmbedData.color,
                author: {
                  name: "Getting lyrics from Genius Lyrics...",
                  icon_url:
                    "https://images.genius.com/8ed669cadd956443e29c70361ec4f372.1000x1000x1.png",
                },
                timestamp: new Date(),
                footer: {
                  text: "© Britta",
                },
              },
            })
            .then((m) => {
              m.edit({
                embed: {
                  color: message.client.messageEmbedData.color,
                  author: {
                    name: "Britta",
                    icon_url:
                      "https://images.genius.com/8ed669cadd956443e29c70361ec4f372.1000x1000x1.png",
                  },
                  title: "Lyrics of " + song.url,
                  description: song.lyrics,
                  thumbnail: {
                    url: song.albumArt,
                  },
                  timestamp: new Date(),
                  footer: {
                    text: "© Britta",
                  },
                },
              });
            });
        });
      }
    } catch (error) {
      console.log(error);
      message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "❗ There was an error finding the lyrics to this song",
          },
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
    }
  },
};
