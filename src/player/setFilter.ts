import { IFilter } from "../types/Filter";
import { ResponseType } from "../types/Response";
import { hasPremiumOrVoted } from "../util/authorization";
import { BrittaEmbed } from "../util/embed";

export default async (message: any, player: any, filter: IFilter) => {
  console.log(player);
  if (
    filter.premium &&
    !(await hasPremiumOrVoted(message.author, message.client))
  )
    return message.client.response(message, ResponseType.noPremium);
  player.clearEQ();
  player.setVolume(100);
  filter.apply(player);
  //   player.setEQ(...filter.EQ.equalizer);
  //   player.node.send({ op: "filter", guildID: message.guild.id, ...filter.EQ });
  //   player.setDistortion(true);
  //   player.node.send({
  //     op: "filters",
  //     guildID: message.guild.id,
  //     ...{
  //       equalizer: [
  //         { band: 1, gain: 0.3 },
  //         { band: 0, gain: 0.3 },
  //       ],
  //       timescale: { pitch: 1.2 },
  //       tremolo: { depth: 0.3, frequency: 14 },
  //     },
  //   });
  return message.channel.send(
    new BrittaEmbed(message, {
      author: null,
      description: `📶 ${message.author} enabled **${filter.name}**. This may take one or two seconds.`,
    })
  );
};
