const Filter = require("../structures/Filter");
import { FilterOptions } from "../types/Filter";

module.exports = class Bass extends Filter {
  constructor(client: any) {
    super(<FilterOptions>{
      client: client,
      name: "bass",
      EQ: [
        { band: 0, gain: 0.6 },
        { band: 1, gain: 0.67 },
        { band: 2, gain: 0.67 },
        { band: 3, gain: 0 },
        { band: 4, gain: -0.5 },
        { band: 5, gain: 0.15 },
        { band: 6, gain: -0.45 },
        { band: 7, gain: 0.23 },
        { band: 8, gain: 0.35 },
        { band: 9, gain: 0.45 },
        { band: 10, gain: 0.55 },
        { band: 11, gain: 0.6 },
        { band: 12, gain: 0.55 },
        { band: 13, gain: 0 },
      ],
      premium: false,
    });
  }
};
