const { MessageEmbed } = require("discord.js");
const config = require("../config.js");
const { play } = require("../include/play");
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(config.api.youtube_key);
const {
  commands: { categories },
} = require("../config");

module.exports = {
  name: "playlist",
  cooldown: 3,
  aliases: ["pl"],
  categories: [categories.music],
  usages: ["playlist_name", "playlist_url"],
  examples: [
    "Far Beyond Driven - Pantera album",
    "https://www.youtube.com/watch?v=yRxg8yVhbQY&list=OLAK5uy_kgCe3XwLN3N-QUoKKvLume7MKqAXAUnaU",
  ],
  description: "Play a playlist from YouTube",
  async execute(message, args) {
    const { channel } = message.member.voice;
    let thisLang = "english";
    const language = require(`../languages/${thisLang}`);

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && channel !== message.guild.me.voice.channel)
      return message
        .reply(`You must be in the same channel as ${message.client.user}`)
        .catch(console.error);
    if (!args.length)
      return message.channel
        .send(
          new MessageEmbed()
            .setAuthor(language("error").play_args, message.author.avatarURL())
            .setColor(config.colors.failed)
        )
        .catch(console.error);
    if (!channel)
      return message.channel
        .send(
          new MessageEmbed()
            .setAuthor(
              language("error").joinvoicechannel,
              message.author.avatarURL()
            )
            .setColor(config.colors.failed)
        )
        .catch(console.error);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return message.channel
        .send(
          new MessageEmbed()
            .setAuthor(
              language("perrmissions").connect,
              message.author.avatarURL()
            )
            .setColor(config.colors.failed)
        )
        .catch(console.error);
    if (!permissions.has("SPEAK"))
      return message.channel
        .send(
          new MessageEmbed()
            .setAuthor(
              language("perrmissions").speak,
              message.author.avatarURL()
            )
            .setColor(config.colors.failed)
        )
        .catch(console.error);

    const search = args.join(" ");
    const pattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
    const url = args[0];
    const urlValid = pattern.test(args[0]);

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true,
    };

    let song = null;
    let playlist = null;
    let videos = [];

    if (urlValid) {
      try {
        playlist = await youtube.getPlaylist(url, { part: "snippet" });
        videos = await playlist.getVideos(config.max_playlist_size || 10, {
          part: "snippet",
        });
      } catch (error) {
        console.error(error);
        return message.channel
          .send(
            new MessageEmbed()
              .setAuthor(
                language("error").matching_playlist,
                message.author.avatarURL()
              )
              .setColor(config.colors.failed)
          )
          .catch(console.error);
      }
    } else {
      try {
        const results = await youtube.searchPlaylists(search, 1, {
          part: "snippet",
        });
        playlist = results[0];
        videos = await playlist.getVideos(config.api.max_playlist_size || 10, {
          part: "snippet",
        });
      } catch (error) {
        console.error(error);
        return message.channel
          .send(
            new MessageEmbed()
              .setAuthor(
                language("error").matching_playlist,
                message.author.avatarURL()
              )
              .setColor(config.colors.failed)
          )
          .catch(console.error);
      }
    }

    videos.forEach((video) => {
      song = {
        title: video.title,
        url: video.url,
        duration: undefined,
        thumbnail: video.thumbnails.high.url,
      };

      if (serverQueue) {
        serverQueue.songs.push(song);
        // message.channel
        //   .send(
        //     new MessageEmbed()
        //       .setAuthor(
        //         language("succes")
        //           .playing_playlist.replace("{song.title}", song.title)
        //           .replace("{author}", message.author),
        //         message.author.avatarURL()
        //       )
        //       .setColor(config.colors.succes)
        //   )
        //   .catch(console.error);
      } else {
        queueConstruct.songs.push(song);
      }
    });

    let map = {
      0: "<:zero:741005686795927692>",
      1: "<:one:741005685155954688>",
      2: "<:two:741005686070050937>",
      3: "<:three:741005686556852245>",
      4: "<:four:741005685168537671>",
      5: "<:five:741005686367846430>",
      6: "<:six:741005686569173013>",
      7: "<:seven:741005686258925650>",
      8: "<:eight:741005686736945173>",
      9: "<:nine:741005686288285750>",
      10: "<:one:741005685155954688><:zero:741005686795927692>",
    };

    let playlistEmbed = new MessageEmbed()
      .setAuthor(
        language("succes").started_playlist.replace(
          "{tracks}",
          `${playlist.videos.length}`
        ),
        message.author.avatarURL()
      )
      .setTitle(`${playlist.title}`)
      .setURL(playlist.url)
      .setColor(config.colors.primary)
      .setTimestamp();

    playlistEmbed.setDescription(
      queueConstruct.songs.map(
        (song, index) => `**${index + 1}.** [${song.title}](${song.url})`
      )
    );
    if (playlistEmbed.description.length >= 2048)
      playlistEmbed.description =
        playlistEmbed.description.substr(0, 2007) +
        "\n" +
        language("error").playlist_character +
        " ";

    message.channel.send(playlistEmbed);

    if (!serverQueue)
      message.client.queue.set(message.guild.id, queueConstruct);

    if (!serverQueue) {
      try {
        queueConstruct.connection = await channel.join();
        await queueConstruct.connection.voice.setSelfDeaf(true);
        play(queueConstruct.songs[0], message);
      } catch (error) {
        console.error(error);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel
          .send(
            new MessageEmbed()
              .setAuthor(
                language("error").joinvoicechannel_2.replace,
                message.author.avatarURL()
              )
              .setColor(config.colors.failed)
          )
          .catch(console.error);
      }
    }
  },
};
