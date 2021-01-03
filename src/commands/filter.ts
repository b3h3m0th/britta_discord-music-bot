const Command = require("../structures/Command");
import setFilter from "../player/setFilter";
import { CommandOptions } from "../types/Command";
import { FilterType } from "../types/Filter";
import { ResponseType } from "../types/Response";
import { BrittaEmbed, ErrorEmbed } from "../util/embed";
import { getGuildPrefix } from "../util/prefix";
const {
  commands: { categories },
} = require("../config");

module.exports = class Filter extends Command {
  constructor(client: any) {
    super(<CommandOptions>{
      client: client,
      name: "filter",
      description: "Turns on/off audio filters",
      categories: [categories.music],
      usages: ["filter_name"],
      examples: [`${FilterType.EARRAPE}`],
      cooldown: 5,
      voteLocked: false,
    });
  }

  async execute(message, args) {
    const filterQuery = args[0] && args[0].toLowerCase();

    if (!filterQuery || filterQuery === "list") {
      const freeFilters = message.client.filters
        .filter((f) => !f.premium)
        .map((fi) => `\`${fi.name}\``)
        .join(" ");
      const premiumFilters = message.client.filters
        .filter((f) => f.premium)
        .map((fi) => `\`${fi.name}\``)
        .join(" ");

      const listEmbed = new BrittaEmbed(message, {
        author: { name: "Britta Filter List" },
        description: `Type \`${await getGuildPrefix(
          message.guild.id
        )!}filter <filter_name>\` to enable or disable an audio filter`,
      })
        .addField("🔓 Free Filters", freeFilters ? freeFilters : "`N/A`")
        .addField(
          "🔒 Premium Filters",
          premiumFilters ? premiumFilters : "`N/A`"
        );
      return message.channel.send(listEmbed);
    } else if (
      filterQuery === "reset" ||
      filterQuery === "disable" ||
      filterQuery === "off"
    ) {
      const player = message.client.manager.get(message.guild.id);
      if (!player)
        return message.client.response(message, ResponseType.nothingPlaying);

      player.clearEQ();
      return message.channel.send(
        new BrittaEmbed(message, {
          author: null,
          description: `📶 ${message.author} turned off the audio filter`,
        })
      );
    } else {
      const player = message.client.manager.get(message.guild.id);
      if (!player)
        return message.client.response(message, ResponseType.nothingPlaying);

      const filter = message.client.filters.find(
        (fil) => fil.name === filterQuery
      );
      if (!filter)
        return message.client.response(message, ResponseType.filterNotExists);

      return setFilter(message, player, filter);
    }
  }
};
