const Filter = require("../structures/Filter");
import { FilterOptions, FilterType } from "../types/Filter";

module.exports = class Distortion extends Filter {
  constructor(client: any) {
    super(<FilterOptions>{
      client: client,
      name: FilterType.EARRAPE,
      EQ: {
        equalizer: [
          { band: 0, gain: 0.5 },
          { band: 1, gain: 0.5 },
          { band: 2, gain: 0.5 },
          { band: 3, gain: 0.5 },
          { band: 4, gain: 0.5 },
          { band: 5, gain: 0.5 },
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
