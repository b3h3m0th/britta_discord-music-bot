import { IFilter } from "../types/Filter";

export default (message: any, player: any, filter: IFilter) => {
  player.setEQ(...filter.EQ);
  message.channel.send("done");
};
