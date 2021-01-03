const Command = require("../structures/Command");
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
      usages: ["filter"],
      examples: [`${FilterType.EARRAPE.toLocaleString().toLowerCase()}`],
      cooldown: 5,
      voteLocked: false,
    });
  }

  async execute(message, args) {
    console.log(message.client.filters);

    const filterQuery = args[0] && args[0].toLowerCase();

    if (!filterQuery) {
      const player = message.client.manager.get(message.guild.id);
      if (!player)
        return message.client.response(message, ResponseType.nothingPlaying);

      return message.channel.send(
        new ErrorEmbed(message, {
          author: { name: "You need to provide a filter type." },
          description: `Type \`${await getGuildPrefix(
            message.guild.id
          )}filter list\` in order to get a list of all filters available`,
        })
      );
    } else if (filterQuery === "list") {
      const listEmbed = new BrittaEmbed(message, {
        author: { name: "Britta Filter List" },
      })
        .addField(
          "🔓 Free Filters",
          message.client.filters
            .filter((f) => !f.premium)
            .map((fi) => `\`${fi.name}\``)
        )
        .addField(
          "🔒 Premium Filters",
          message.client.filters
            .filter((f) => f.premium)
            .map((fi) => `\`${fi.name}\``)
        );

      message.channel.send(listEmbed);
    } else if (filterQuery === "reset" || "disable" || "off") {
      const player = message.client.manager.get(message.guild.id);
      if (!player)
        return message.client.response(message, ResponseType.nothingPlaying);

      //reset filters
    } else {
      const player = message.client.manager.get(message.guild.id);
      if (!player)
        return message.client.response(message, ResponseType.nothingPlaying);

      const filter = message.client.filters.find(
        (fil) => fil.name === filterQuery
      );
      if (!filter)
        return message.client.response(message, ResponseType.filterNotExists);
    }
  }
};
