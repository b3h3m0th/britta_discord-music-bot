const { play } = require("../include/play");
const {
  YOUTUBE_API_KEY,
  SPOTIFY_ACCESS_TOKEN,
  SOUNDCLOUD_CLIENT_ID,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI
} = require("../config.json");
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);
const scdl = require("soundcloud-downloader");
const { MessageEmbed } = require("discord.js");
const config = require("../config.js");

var SpotifyWebApi = require("spotify-web-api-node");

var spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
  redirectUri: SPOTIFY_REDIRECT_URI
});

spotifyApi.setAccessToken(SPOTIFY_ACCESS_TOKEN);

const getSpotifyTrackID = (uri) => {
  try {
    if (uri.includes("https://")) {
      let url_parameters = uri.split("?");
      let actual_url = url_parameters[0];
      url_parts = actual_url.split("/");
      return url_parts[url_parts.length - 1];
    } else {
      let uri_parts = uri.split(":");
      return uri_parts[uri_parts.length - 1];
    }
  } catch (err) {
    console.log("error " + err);
  }
};

const getSpotifyAlbumID = (uri) => {
  try {
    if (uri.includes("https://")) {
      let url_parameters = uri.split("?");
      let actual_url = url_parameters[0];
      url_parts = actual_url.split("/");
      return url_parts[url_parts.length - 1];
    } else {
      let uri_parts = uri.split(":");
      return uri_parts[uri_parts.length - 1];
    }
  } catch (err) {
    console.log("error " + err);
  }
};

const getSpotifyPlaylistID = (uri) => {
  try {
    if (uri.includes("https://")) {
      let url_parameters = uri.split("?");
      let actual_url = url_parameters[0];
      url_parts = actual_url.split("/");
      return url_parts[url_parts.length - 1];
    } else {
      let uri_parts = uri.split(":");
      return uri_parts[uri_parts.length - 1];
    }
  } catch (err) {
    console.log("error " + err);
  }
};

module.exports = {
  name: "playspotify",
  cooldown: 3,
  aliases: ["ps"],
  description: "Plays audio from Spotify",
  async execute(message, args) {
    let thisLang = "english";
    const language = require(`../languages/${thisLang}`);

    const { channel } = message.member.voice;

    const serverQueue = message.client.queue.get(message.guild.id);
    if (!channel)
      return message.channel.send(
        new MessageEmbed()
          .setAuthor(language("error").joinvoicechannel, message.author.avatarURL())
          .setColor(config.colors.failed)
      );
    if (serverQueue && channel !== message.guild.me.voice.channel)
      return message.channel.send(
        new MessageEmbed()
          .setAuthor(
            language("error").joinsamechannel.replace("{client}", message.client.user.tag),
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
          .setAuthor(language("perrmissions").connect, message.author.avatarURL())
          .setColor(config.colors.failed)
      );
    if (!permissions.has("SPEAK"))
      return message.channel.send(
        new MessageEmbed()
          .setAuthor(language("perrmissions").speak, message.author.avatarURL())
          .setColor(config.colors.failed)
      );

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

    const spotifyTracks = [];

    if (url.includes("https://open.spotify.com/track/") || url.includes("spotify:track:")) {
      spotifyApi.getTrack(getSpotifyTrackID(url)).then(
        function (data) {
          const track = data.body;
          spotifyTracks.push({ songName: track.name, artist: track.artists[0] });
        },
        function (err) {
          console.log(err);
        }
      );
    } else if (url.includes("https://open.spotify.com/album/") || url.includes("spotify:album:")) {
      spotifyApi.getAlbumTracks(getSpotifyAlbumID(url)).then(
        function (data) {
          let tracks = data.body.items;
          tracks.forEach((track) => {
            spotifyTracks.songs.push({ songName: track.name, artist: track.artists[0] });
          });
        },
        function (err) {
          console.log(err);
        }
      );
    }

    // Now you have the song data. You can search the song now with the Youtube API and add it to the queue
  }
};
