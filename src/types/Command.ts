import { BotPermission } from "./Permission";

const {
  commands: { categories },
} = require("../config");
const commandCategories = Object.values(categories);

export type CommandCategories = typeof commandCategories[number];

export interface ICommand {
  client: any;
  name: string;
  description: string;
  categories: CommandCategories[];
  usages: string[];
  examples: string[];
  aliases: string[];
  cooldown: number;
  voteLocked: boolean;
  permissions: BotPermission[];
}

export type CommandOptions = {
  client: any;
  name: string;
  description?: string;
  categories: CommandCategories[];
  usages?: string[];
  examples?: string[];
  aliases?: string[];
  cooldown: number;
  voteLocked: boolean;
  permissions: BotPermission[];
};
