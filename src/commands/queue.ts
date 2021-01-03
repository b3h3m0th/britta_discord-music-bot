const Command = require("../structures/Command");
import { CommandOptions } from "../types/Command";
import { BrittaEmbed } from "../util/embed";
const {
  commands: { categories },
} = require("../config");
import paginate from "../util/paginate";
import getQueueDuration from "../util/getQueueDuration";
import formatDuration from "../util/formatDuration";
import { ResponseType } from "../types/Response";

module.exports = class Queue extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "queue",
      description: "Displays the song queue",
      categories: [categories.music],
      aliases: ["q"],
      usages: [""],
      examples: [""],
      cooldown: 3,
      voteLocked: false,
    });
  }

  async execute(message, args) {
    const player = message.client.manager.get(message.guild.id);
    if (!player)
      return message.client.response(message, ResponseType.nothingPlaying);

    const { title, requester, duration, uri } = player.queue.current;

    const parsedDuration = formatDuration(duration);
    const parsedQueueDuration = formatDuration(getQueueDuration(player));
    let pagesNum = Math.ceil(player.queue.length / 10);
    if (pagesNum === 0) pagesNum = 1;

    const songStrings = [];
    for (let i = 0; i < player.queue.length; i++) {
      const song = player.queue[i];
      songStrings.push(
        `**${i + 1}.** [${song.title}](${song.uri}) \`[${formatDuration(
          song.duration
        )}]\` • <@${!song.requester.id ? song.requester : song.requester.id}>
				`
      );
    }

    const user = `<@${!requester.id ? requester : requester.id}>`;
    const pages = [];
    for (let i = 0; i < pagesNum; i++) {
      const str = songStrings.slice(i * 10, i * 10 + 10).join("");
      const embed = new BrittaEmbed(message)
        .setAuthor(`Queue - ${message.guild.name}`, message.guild.iconURL())
        .setDescription(
          `**🔊 Now Playing**: [${title}](${uri}) \`[${parsedDuration}]\` • ${user}.\n\n**Up Next**:${
            str == "" ? "  Nothing" : "\n" + str
          }`
        )
        .setFooter(
          `Page ${i + 1}/${pagesNum} • ${
            player.queue.length
          } song(s) • ${parsedQueueDuration} total duration`
        );
      pages.push(embed);
    }

    if (!args[0]) {
      if (pages.length == pagesNum && player.queue.length > 10)
        paginate(
          message.client,
          message,
          pages,
          ["🔼", "🔽"],
          120000,
          player.queue.length,
          parsedQueueDuration
        );
      else return message.channel.send(pages[0]);
    } else {
      if (isNaN(args[0])) return message.channel.send("Page must be a number");
      if (args[0] > pagesNum)
        return message.channel.send(
          `There are only ${pagesNum} pages available`
        );
      const pageNum = args[0] == 0 ? 1 : args[0] - 1;
      return message.channel.send(pages[pageNum]);
    }
  }
};
