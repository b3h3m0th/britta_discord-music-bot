const Filter = require("../structures/Filter");
import { FilterOptions, FilterType } from "../types/Filter";

module.exports = class Soft extends Filter {
  constructor(client: any) {
    super(<FilterOptions>{
      client: client,
      name: FilterType.SOFT,
      EQ: {
        equalizer: [
          { band: 0, gain: 0 },
          { band: 1, gain: 0 },
          { band: 2, gain: 0 },
          { band: 3, gain: 0 },
          { band: 4, gain: 0 },
          { band: 5, gain: 0 },
          { band: 6, gain: 0 },
          { band: 7, gain: 0 },
          { band: 8, gain: -0.15 },
          { band: 9, gain: -0.15 },
          { band: 10, gain: -0.15 },
          { band: 11, gain: -0.15 },
          { band: 12, gain: -0.15 },
          { band: 13, gain: -0.15 },
          { band: 14, gain: -0.15 },
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
