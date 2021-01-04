const Filter = require("../structures/Filter");
import { FilterOptions, FilterType } from "../types/Filter";

module.exports = class Bass extends Filter {
  constructor(client: any) {
    super(<FilterOptions>{
      client: client,
      name: FilterType.BASS,
      EQ: {
        equalizer: [
          { band: 0, gain: 0.5 },
          { band: 1, gain: 0.3 },
          { band: 2, gain: 0.15 },
          { band: 3, gain: 0.05 },
          { band: 4, gain: 0.01 },
          { band: 5, gain: 0 },
          { band: 6, gain: 0 },
          { band: 7, gain: 0 },
          { band: 8, gain: 0 },
          { band: 9, gain: 0 },
          { band: 10, gain: 0 },
          { band: 11, gain: 0 },
          { band: 12, gain: 0 },
          { band: 13, gain: 0 },
        ],
      },
      premium: false,
    });
  }

  apply(player: any) {
    player.setEQ(...this.EQ.equalizer);
    return;
  }
};
