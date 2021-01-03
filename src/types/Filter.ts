export enum FilterType {
  NONE = "none",
  EARRAPE = "earrape",
  BASS = "bass",
  NIGHTCORE = "nightcore",
  VAPORWAVE = "vaporwave",
  TREBLEBASS = "treblebass",
  POP = "pop",
}

export type FilterEQ = {
  equalizer: { band: Number; gain: Number }[];
  timescale?: { pitch: Number };
  tremolo?: { depth: Number; frequency: Number };
};

export interface IFilter {
  client: any;
  name: FilterType;
  EQ: FilterEQ;
  premium: Boolean;
}

export type FilterOptions = {
  client: any;
  name: FilterType;
  EQ: FilterEQ;
  premium: Boolean;
};
