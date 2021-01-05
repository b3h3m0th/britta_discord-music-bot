const Command = require("../structures/Command");
import { CommandOptions } from "../types/Command";
import { ResponseType } from "../types/Response";
import { BrittaEmbed } from "../util/embed";
import formatDuration from "../util/formatDuration";
const {
  commands: { categories },
} = require("../config");

module.exports = class NowPlaying extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "nowplaying",
      description: "Displays the currently playing song",
      categories: [categories.music],
      aliases: ["np"],
      usages: [""],
      examples: [""],
      cooldown: 5,
      voteLocked: false,
    });
  }

  async execute(message) {
    const player = message.client.manager.get(message.guild.id);
    if (!player || !player.queue.current)
      return message.client.response(message, ResponseType.nothingPlaying);

    const {
      title,
      duration,
      author,
      uri,
      identifier,
      requester,
    } = player.queue.current;

    const parsedCurrentDuration = formatDuration(player.position);
    const parsedDuration = formatDuration(duration);
    const part = Math.floor((player.position / duration) * 30);
    const uni = player.playing ? "▶" : "⏸️";
    const user = `<@${!requester.id ? requester : requester.id}>`;
    const thumbnail = `https://img.youtube.com/vi/${identifier}/default.jpg`;

    const embed = new BrittaEmbed(message)
      .setAuthor(
        player.playing ? "Now Playing" : "Paused",
        message.client.config.resources.now_playing
      )
      .setThumbnail(thumbnail)
      .setDescription(`**[${title}](${uri})**`)
      .addField("Artist", author, true)
      .addField("Requester", user, true)
      .addField(
        "\u200B",
        `\`\`\`${parsedCurrentDuration}/${parsedDuration}  ${uni} ${
          "─".repeat(part) + "⚪" + "─".repeat(30 - part)
        }\`\`\``
      );

    return message.channel.send("", embed);
  }
};
