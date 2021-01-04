const Filter = require("../structures/Filter");
import { FilterOptions, FilterType } from "../types/Filter";

module.exports = class Blackmetal extends Filter {
  constructor(client: any) {
    super(<FilterOptions>{
      client: client,
      name: FilterType.BLACK_METAL,
      EQ: {
        equalizer: [
          { band: 0, gain: -0.1 },
          { band: 1, gain: 0 },
          { band: 2, gain: 0.1 },
          { band: 3, gain: 0.2 },
          { band: 4, gain: 0.1 },
          { band: 5, gain: 0 },
          { band: 6, gain: -0.1 },
          { band: 7, gain: -0.2 },
          { band: 8, gain: -0.1 },
          { band: 9, gain: 0 },
          { band: 10, gain: 0.1 },
          { band: 11, gain: 0.2 },
          { band: 12, gain: 0.1 },
          { band: 13, gain: 0 },
          { band: 14, gain: -0.1 },
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
