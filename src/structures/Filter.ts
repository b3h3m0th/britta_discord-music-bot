import { FilterEQ, IFilter, FilterOptions, FilterType } from "../types/Filter";

module.exports = class Filter implements IFilter {
  client: any;
  name: FilterType;
  EQ: FilterEQ;
  premium: Boolean;

  constructor(options: FilterOptions) {
    this.name = options.name;
    this.EQ = options.EQ;
    this.premium = options.premium;
    this.client = options.client;
  }
};
