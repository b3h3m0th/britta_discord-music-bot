import { IFilter } from "../types/Filter";
import { BrittaEmbed } from "../util/embed";

export default (message: any, player: any, filter: IFilter) => {
  player.clearEQ();
  //   player.setEQ(...filter.EQ.equalizer);
  //   player.node.send({ op: "filter", guildID: message.guild.id, ...filter.EQ });
  player.setDistortion(true);
  return message.channel.send(
    new BrittaEmbed(message, {
      author: null,
      description: `📶 ${message.author} enabled **${filter.name}**. This may take one or two seconds.`,
    })
  );
};
