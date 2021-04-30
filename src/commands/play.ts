const Command = require("../structures/Command");
import { CommandOptions } from "../types/Command";
import { BrittaEmbed, ErrorEmbed, QueuedEmbed } from "../util/embed";
const {
  commands: { categories },
} = require("../config");
import createPlayer from "../player/createPlayer";
const { getData, getPreview } = require("spotify-url-info");
import loadTracks from "../player/loadTracks";
import { ResponseType } from "../types/Response";
import { BotPermission } from "../types/Permission";
import checkBotPermissions from "../util/checkBotPermissions";
import getTrackSource from "../player/getTrackSource";

module.exports = class Play extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "play",
      description: "Plays a song, an album or a playlist",
      categories: [categories.music],
      aliases: ["p", "add"],
      usages: ["song_name", "song_url", "album_url", "playlist_url"],
      examples: [
        "Cowboys From Hell",
        "https://www.youtube.com/watch?v=i97OkCXwotE",
        "https://open.spotify.com/album/5UWUDx2090yLdH6Aot5x86?si=gyBAfGGETIGL1FUz1XtK1w",
        "https://open.spotify.com/playlist/37i9dQZF1DWWOaP4H0w5b0?si=R4Lz42x8QFSH1XbJqBGFtA",
      ],
      cooldown: 2,
      voteLocked: false,
      permissions: [BotPermission.CONNECT, BotPermission.SPEAK],
    });
  }

  async execute(message, args) {
    if (!message.member.voice.channel)
      return message.client.response(message, ResponseType.noVoiceChannel);

    if (checkBotPermissions(message, this.permissions)) return;

    let player = message.client.manager.get(message.guild.id);
    if (player && !player.playing && player.current)
      return message.channel.send(
        new ErrorEmbed(message, {
          author: {
            name:
              `Resume the music first before queuing or playing new songs` +
              "`(" +
              message.client.prefix +
              "resume)`",
          },
        })
      );
    if (!player) player = await createPlayer(message);

    const playMessage = await message.channel.send(
      new BrittaEmbed(message, {
        author: { name: `🔎 Searching for \"${args.join(" ")}\" ...` },
      })
    );
    if (
      args[0].match(
        new RegExp(
          /(https?:\/\/open.spotify.com\/(track|user|artist|album)\/[a-zA-Z0-9]+(\/playlist\/[a-zA-Z0-9]+|)|spotify:(track|user|artist|album):[a-zA-Z0-9]+(:playlist:[a-zA-Z0-9]+|))/
        )
      )
    ) {
      const data = await getData(args.join(" "));
      if (data.type == "playlist" || data.type == "album") {
        const sL = 100;
        let songsToAdd = 0;
        if (!player.queue.length) {
          songsToAdd = Math.min(sL, data.tracks.items.length);
        } else {
          const totalSongs = player.queue.length + data.tracks.items.length;
          if (totalSongs > sL)
            songsToAdd = Math.min(
              sL - player.queue.length,
              data.tracks.items.length
            );
          else songsToAdd = data.tracks.items.length;
        }

        if (data.type == "playlist") {
          for (let i = 0; i < songsToAdd; i++) {
            const song = data.tracks.items[i];
            loadTracks(
              message,
              playMessage,
              player,
              `${song.track.name} ${song.track.artists[0].name}`,
              true,
              getTrackSource(args[0])
            );
          }
        } else {
          await data.tracks.items.forEach((song) => {
            loadTracks(
              message,
              playMessage,
              player,
              `${song.name} ${song.artists[0].name}`,
              true,
              getTrackSource(args[0])
            );
          });
        }

        const playlistInfo = await getPreview(args.join(" "));
        if (data.tracks.items.length != songsToAdd) {
          playMessage.edit(
            new QueuedEmbed(
              playlistInfo.title,
              args[0],
              null,
              songsToAdd,
              message.author
            ).setFooter(
              "You have reached the max amount of songs in the queue. Purchase premium to get more."
            )
          );
        } else {
          playMessage.edit(
            new QueuedEmbed(
              playlistInfo.title,
              args[0],
              null,
              songsToAdd,
              message.author
            )
          );
        }
      } else if (data.type == "track") {
        const track = await getPreview(args.join(" "));
        loadTracks(
          message,
          playMessage,
          player,
          `${track.title} ${track.artist}`,
          false,
          getTrackSource(args[0])
        );
      } else if (data.type == "artist") {
        const sL = 100;
        let songsToAdd = 0;
        if (!player.queue.length) {
          songsToAdd = Math.min(sL, data.tracks.length);
        } else {
          const totalSongs = player.queue.length + data.tracks.length;
          if (totalSongs > sL)
            songsToAdd = Math.min(sL - player.queue.length, data.tracks.length);
          else songsToAdd = data.tracks.length;
        }

        for (let i = 0; i < songsToAdd; i++) {
          const song = data.tracks[i];
          loadTracks(
            message,
            playMessage,
            player,
            `${song.name} ${song.artists[0].name}`,
            true,
            getTrackSource(args[0])
          );
        }

        const playlistInfo = await getPreview(args.join(" "));
        if (data.tracks.length != songsToAdd) {
          playMessage.edit(
            new QueuedEmbed(
              playlistInfo.title,
              args[0],
              null,
              songsToAdd,
              message.author
            ).setFooter(
              "You have reached the max amount of songs in the queue. Purchase premium to get more."
            )
          );
        } else {
          playMessage.edit(
            new QueuedEmbed(
              playlistInfo.title,
              args[0],
              null,
              songsToAdd,
              message.author
            )
          );
        }
      }
    } else {
      const searchQuery = {
        source: "soundcloud",
        query: args.slice(0).join(" "),
      };
      loadTracks(
        message,
        playMessage,
        player,
        searchQuery,
        false,
        getTrackSource(args[0])
      );
    }
  }
};
