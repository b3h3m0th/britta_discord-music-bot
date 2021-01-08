import { IFilter } from "../types/Filter";
import { ResponseType } from "../types/Response";
import { hasPremiumOrVoted } from "../util/authorization";
import { BrittaEmbed } from "../util/embed";

export default async (message: any, player: any, filter: IFilter) => {
  if (
    filter.premium &&
    !(await hasPremiumOrVoted(message.author, message.client))
  )
    return message.client.response(message, ResponseType.noPremium);
  player.clearEQ();
  player.setVolume(100);
  player.clearEffects();
  filter.apply(player);

  return message.channel.send(
    new BrittaEmbed(message, {
      author: null,
      description: `📶 ${message.author} enabled **${filter.name}**. This may take one or two seconds.`,
    })
  );
};
