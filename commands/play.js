const { play } = require("../include/play");
const config = require("../config.js");
const youtube_key = config.api.youtube_key;
const SOUNDCLOUD_CLIENT_ID = "";
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(youtube_key);
const scdl = require("soundcloud-downloader");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "play",
  cooldown: 3,
  aliases: ["p"],
  description: "Plays audio from YouTube or Soundcloud",
  async execute(message, args) {
    let thisLang = "english";
    const language = require(`../languages/${thisLang}`);

    const { channel } = message.member.voice;

    const serverQueue = message.client.queue.get(message.guild.id);
    // console.log(language("error").soundcloud.soundcloud_client_id)
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
    if (serverQueue && channel !== message.guild.me.voice.channel)
      return message.channel
        .send(
          new MessageEmbed()
            .setAuthor(
              language("error").joinsamechannel.replace(
                "{client}",
                message.client.user.tag
              ),
              message.author.avatarURL()
            )
            .setColor(config.colors.failed)
        )
        .catch(console.error);

    if (!args.length)
      return message.channel
        .send(
          new MessageEmbed()
            .setAuthor(language("error").play_args, message.author.avatarURL())
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
    const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
    const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
    const url = args[0];
    const urlValid = videoPattern.test(args[0]);

    // Start the playlist if playlist url was provided
    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      return message.client.commands.get("playlist").execute(message, args);
    }

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true,
    };

    let songInfo = null;
    let song = null;

    if (urlValid) {
      try {
        songInfo = await ytdl.getInfo(url);
        song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          duration: songInfo.videoDetails.lengthSeconds,
          thumbnail:
            songInfo.videoDetails.thumbnail.thumbnails[
              songInfo.videoDetails.thumbnail.thumbnails.length - 1
            ].url,
        };
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    } else if (scRegex.test(url)) {
      // It is a valid Soundcloud URL
      if (!SOUNDCLOUD_CLIENT_ID)
        return message.channel.send(
          new MessageEmbed()
            .setAuthor(
              language("error").soundcloud.client_id,
              message.author.avatarURL()
            )
            .setColor(config.colors.failed)
        );
      try {
        const trackInfo = await scdl.getInfo(url, SOUNDCLOUD_CLIENT_ID);
        song = {
          title: trackInfo.title,
          url: url,
        };
      } catch (error) {
        if (error.statusCode === 404)
          return message.channel.send(
            new MessageEmbed()
              .setAuthor(
                language("error").soundcloud.piece_not_found,
                message.author.avatarURL()
              )
              .setColor(config.colors.failed)
          );
        return message.channel.send(
          new MessageEmbed()
            .setAuthor(
              language("error").soundcloud.piece_error,
              message.author.avatarURL()
            )
            .setColor(config.colors.failed)
        );
      }
    } else {
      try {
        const results = await youtube.searchVideos(search, 1);
        songInfo = await ytdl.getInfo(results[0].url);
        song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          duration: songInfo.videoDetails.lengthSeconds,
          thumbnail:
            songInfo.videoDetails.thumbnail.thumbnails[
              songInfo.videoDetails.thumbnail.thumbnails.length - 1
            ].url,
        };
      } catch (error) {
        console.error(error);
        return message.channel
          .send(
            new MessageEmbed()
              .setAuthor(
                language("error").matching_video,
                message.author.avatarURL()
              )
              .setColor(config.colors.failed)
          )
          .catch(console.error);
      }
    }

    if (serverQueue) {
      serverQueue.songs.push(song);
      return serverQueue.textChannel
        .send(
          new MessageEmbed()
            .setAuthor(
              language("succes").playing_music.replace(
                "{song.title}",
                song.title
              ),
              message.client.config.resources.youtubeIcon
            )
            .setURL(song.url)
            .setColor(message.client.config.colors.primary)
            .setThumbnail(song.thumbnail)
        )
        .catch(console.error);
    }

    queueConstruct.songs.push(song);
    message.client.queue.set(message.guild.id, queueConstruct);

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
  },
};
