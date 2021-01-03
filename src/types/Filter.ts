export enum FilterType {
  NONE,
  EARRAPE,
  BASS,
  NIGHTCORE,
  VAPORWAVE,
  TREBLEBASS,
  POP,
}

export type FilterEQ = { band: Number; gain: Number }[];

export interface IFilter {
  client: any;
  name: String;
  EQ: FilterEQ;
  premium: Boolean;
}

export type FilterOptions = {
  client: any;
  name: String;
  EQ: FilterEQ;
  premium: Boolean;
};
