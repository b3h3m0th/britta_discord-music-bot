const Filter = require("../structures/Filter");
import { FilterOptions, FilterType } from "../types/Filter";

module.exports = class Winsi extends Filter {
  constructor(client: any) {
    super(<FilterOptions>{
      client: client,
      name: FilterType.WINSI,
      EQ: {
        equalizer: [
          //   { band: 0, gain: 0 },
          //   { band: 1, gain: -0.1 },
          //   { band: 2, gain: -0.2 },
          //   { band: 3, gain: -0.3 },
          //   { band: 4, gain: -0.4 },
          //   { band: 5, gain: -0.5 },
          //   { band: 6, gain: -0.4 },
          //   { band: 7, gain: -0.3 },
          //   { band: 8, gain: -0.2 },
          //   { band: 9, gain: -0.1 },
          //   { band: 10, gain: 0 },
          { band: 0, gain: 0 },
          { band: 1, gain: -6 },
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
