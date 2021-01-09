import { CommandOptions } from "../types/Command";
import { ResponseType } from "../types/Response";
import { BrittaEmbed } from "../util/embed";
const Command = require("../structures/Command");
const {
  commands: { categories },
} = require("../config");
const lyricsFinder = require("lyrics-finder");

module.exports = class Lyrics extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "lyrics",
      description: "Prints lyrics of the current or any other song",
      categories: [categories.music],
      usages: ["", "song_name"],
      examples: ["", "Cowboys from Hell"],
      cooldown: 5,
      voteLocked: true,
    });
  }

  async execute(message, args) {
    const player = message.client.manager.get(message.guild.id);
    if (!args.length) {
      if (!player)
        return message.client.response(message, ResponseType.nothingPlaying);

      const song = player.queue.current;
      const lyricsEmbed = await message.channel.send(
        new BrittaEmbed(message, { description: "🎶 Fetching lyrics..." })
      );

      const lyrics =
        (await lyricsFinder(song.title)) ||
        `No lyrics found for this song :(\nTry searching manually: \`${message.client.prefix}${this.name} <${this.usages[1]}>\``;

      lyricsEmbed.edit(
        new BrittaEmbed(message, {
          author: {
            name: `Lyrics - ${
              song.title.length >= 256
                ? `${song.title.slice(0, 256)}...`
                : song.title
            }`,
            icon_url: message.client.config.resources.geniusIcon,
          },
          description: `${
            lyrics.length >= 2044 ? `${lyrics.slice(0, 2044)}...` : lyrics
          }`,
          footer: {
            text: "Powered by genius.com",
            icon_url: message.client.config.resources.geniusIcon,
          },
        })
      );
    } else {
      const song = args.join(" ");
      const lyricsEmbed = await message.channel.send(
        new BrittaEmbed(message, {
          description: `🎶 Fetching lyrics for "${song}"`,
        })
      );

      const lyrics =
        (await lyricsFinder(song)) ||
        `No lyrics found for this song :(\nTry searching manually: \`${message.client.prefix}${this.name} <${this.usages[1]}>\``;

      return lyricsEmbed.edit(
        new BrittaEmbed(message, {
          author: {
            name: `Lyrics - ${
              song.length >= 256 ? `${song.slice(0, 256)}...` : song
            }`,
            icon_url: message.client.config.resources.geniusIcon,
          },
          description: `${
            lyrics.length >= 2044 ? `${lyrics.slice(0, 2044)}...` : lyrics
          }`,
          footer: {
            text: "Powered by genius.com",
            icon_url: message.client.config.resources.geniusIcon,
          },
        })
      );
    }
  }
};
