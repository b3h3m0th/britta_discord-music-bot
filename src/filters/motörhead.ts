const Filter = require("../structures/Filter");
import { FilterOptions, FilterType } from "../types/Filter";

module.exports = class Motörhead extends Filter {
  constructor(client: any) {
    super(<FilterOptions>{
      client: client,
      name: FilterType.MOTÖRHEAD,
      EQ: {
        equalizer: [
          { band: 0, gain: -12 },
          { band: 1, gain: -12 },
          { band: 2, gain: -12 },
          { band: 3, gain: 0 },
          { band: 4, gain: 0 },
          { band: 5, gain: 0.6 },
          { band: 6, gain: 0.6 },
          { band: 7, gain: 0.6 },
          { band: 8, gain: 0.6 },
          { band: 9, gain: 0.6 },
          { band: 10, gain: 0 },
          { band: 11, gain: 0 },
          { band: 12, gain: -12 },
          { band: 13, gain: -12 },
          { band: 14, gain: -12 },
        ],
      },
      premium: true,
    });
  }

  apply(player: any) {
    player.setEQ(...this.EQ.equalizer);
    return;
  }
};
