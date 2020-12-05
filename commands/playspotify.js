const { play } = require("../include/play");
const config = require("../config");
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(config.api.youtube_key);
const { MessageEmbed } = require("discord.js");
const spotifyUtil = require("../util/spotifyUtil");
const spotifyUri = require("spotify-uri");
const ytdl = require("ytdl-core");
const SpotifyWebApi = require("spotify-web-api-node");
const {
  commands: { categories },
} = require("../config");

const spotifyApi = new SpotifyWebApi({
  clientId: config.api.spotify_client_id,
  clientSecret: config.api.spotify_client_secret,
  redirectUri: config.api.spotify_redirect_uri,
});

spotifyUtil.getSpotifyAccessToken(spotifyApi);

module.exports = {
  name: "playspotify",
  cooldown: 3,
  aliases: ["ps"],
  categories: [categories.music],
  description: "Plays audio from Spotify",
  async execute(message, args) {
    let thisLang = "english";
    const language = require(`../languages/${thisLang}`);

    const { channel } = message.member.voice;

    const serverQueue = message.client.queue.get(message.guild.id);
    if (!channel)
      return message.channel.send(
        new MessageEmbed()
          .setAuthor(
            language("error").joinvoicechannel,
            message.author.avatarURL()
          )
          .setColor(config.colors.failed)
      );
    if (serverQueue && channel !== message.guild.me.voice.channel)
      return message.channel.send(
        new MessageEmbed()
          .setAuthor(
            language("error").joinsamechannel.replace(
              "{client}",
              message.client.user.tag
            ),
            message.author.avatarURL()
          )
          .setColor(config.colors.failed)
      );

    if (!args.length)
      return message.channel.send(
        new MessageEmbed()
          .setAuthor(language("error").play_args, message.author.avatarURL())
          .setColor(config.colors.failed)
      );

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return message.channel.send(
        new MessageEmbed()
          .setAuthor(
            language("perrmissions").connect,
            message.author.avatarURL()
          )
          .setColor(config.colors.failed)
      );
    if (!permissions.has("SPEAK"))
      return message.channel.send(
        new MessageEmbed()
          .setAuthor(language("perrmissions").speak, message.author.avatarURL())
          .setColor(config.colors.failed)
      );

    const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
    const url = args[0];

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true,
    };

    // Start the playlist if playlist url was provided
    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      return message.client.commands.get("playlist").execute(message, args);
    }

    let songData;
    let songInfo;
    const spotifyTracks = [];
    let spotifyEmbed = new MessageEmbed().setTimestamp();

    try {
      songData = spotifyUri.parse(url);
    } catch (err) {
      console.log(err);
      return message.channel.send(
        new MessageEmbed()
          .setAuthor(
            language("error").spotify_invalid_uri,
            message.client.config.resources.spotifyIcon
          )
          .setColor(message.client.config.colors.failed)
      );
    }

    if (songData.type === "track") {
      spotifyApi
        .getTrack(songData.id)
        .then(async (data) => {
          const track = data.body;
          const results = await youtube.searchVideos(
            `${track.name} ${track.artists[0].name}`
          );
          songInfo = await ytdl.getInfo(results[0].url);

          await spotifyTracks.push({
            title: track.name,
            url: songInfo.videoDetails.video_url,
            duration: Math.floor(track.duration_ms / 1000),
            thumbnail:
              songInfo.videoDetails.thumbnail.thumbnails[
                songInfo.videoDetails.thumbnail.thumbnails.length - 1
              ].url,
          });

          spotifyEmbed
            .setAuthor(
              `✔️ ${songInfo.videoDetails.title} has been added to queue.`,
              message.client.config.resources.spotifyIcon
            )
            .setThumbnail(
              songInfo.videoDetails.thumbnail.thumbnails[
                songInfo.videoDetails.thumbnail.thumbnails.length - 1
              ].url
            );

          message.channel.send(spotifyEmbed);
        })
        .catch((err) => console.log(err));
      // } else if (songData.type === "album") {
      //   spotifyApi.getAlbum(songData.id).then((data) => {
      //     const album = data.body;
      //     const tracks = album.tracks.items;
      //     let thumbnail;

      //     console.log(tracks);

      //     tracks.forEach(async (track) => {
      //       const results = await youtube.searchVideos(
      //         `${track.name} ${track.artists[0].name}`
      //       );
      //       songInfo = await ytdl.getInfo(results[0].url);
      //       thumbnail =
      //         songInfo.videoDetails.thumbnail.thumbnails[
      //           songInfo.videoDetails.thumbnail.thumbnails.length - 1
      //         ].url;

      //       await spotifyTracks.push({
      //         title: track.name,
      //         url: songInfo.videoDetails.video_url,
      //         duration: Math.floor(track.duration_ms / 1000),
      //         thumbnail: thumbnail,
      //       });
      //     });

      //     spotifyEmbed
      //       .setAuthor(
      //         `✔️ ${album.name} with ${tracks.length} songs has been added to queue.`,
      //         message.client.config.resources.spotifyIcon
      //       )
      //       .setThumbnail(thumbnail);

      //     message.channel.send(spotifyEmbed);
      //   });
    } else if (songData.type === "playlist") {
      spotifyApi.getPlaylistTracks(songData.id).then((data) => {
        const playlist = data.body;

        if (playlist.items.length <= config.api.max_playlist_size) {
          playlist.items.forEach(async (item) => {
            const results = await youtube.searchVideos(
              `${item.track.name} ${item.track.artists[0].name}`
            );
            songInfo = await ytdl.getInfo(results[0].url);

            await spotifyTracks.push({
              title: item.track.name,
              url: songInfo.videoDetails.video_url,
              duration: Math.floor(item.track.duration_ms / 1000),
              thumbnail:
                songInfo.videoDetails.thumbnail.thumbnails[
                  songInfo.videoDetails.thumbnail.thumbnails.length - 1
                ].url,
            });
          });
          spotifyEmbed.setAuthor(
            `✔️ A Playlist with ${playlist.items.length} songs has been added to queue.`,
            message.client.config.resources.spotifyIcon
          );

          message.channel.send(spotifyEmbed);
        } else {
          return message.channel.send(
            new MessageEmbed()
              .setTimestamp()
              .setAuthor(
                `This playlist is longer than the maximum of ${config.api.max_playlist_size} songs.`,
                config.resources.spotifyIcon
              )
              .setColor(config.colors.failed)
          );
        }
      });
    } else {
      return message.channel.send(
        new MessageEmbed()
          .setAuthor(
            language("error").spotify_invalid_uri,
            message.client.config.resources.spotifyIcon
          )
          .setColor(message.client.config.colors.failed)
      );
    }

    setTimeout(async () => {
      spotifyTracks.forEach((track) => {
        if (serverQueue) {
          serverQueue.songs.push(track);
        } else {
          queueConstruct.songs.push(track);
        }
      });

      if (!serverQueue)
        message.client.queue.set(message.guild.id, queueConstruct);

      if (!serverQueue) {
        try {
          queueConstruct.connection = await channel.join();
          await queueConstruct.connection.voice.setSelfDeaf(true);
          play(queueConstruct.songs[0], message);
        } catch (err) {
          console.error(err);
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
    }, 6000);
  },
};
