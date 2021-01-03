import { IEvent } from "../types/Event";

export default class Event implements IEvent {
  client: any;
  name: string;

  constructor(client, eventName) {
    this.client = client;
    this.name = eventName;
  }

  reload() {
    const path = `../events/${this.name}.ts`;
    delete require.cache[path];
    require(`../events/${this.name}.ts`);
  }
}
