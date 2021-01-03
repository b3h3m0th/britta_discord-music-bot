import { ICommand, CommandOptions, CommandCategories } from "../types/Command";
import { BotPermission } from "../types/Permission";

module.exports = class Command implements ICommand {
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

  constructor(options: CommandOptions) {
    this.client = options.client;
    this.name = options.name;
    this.description = options.description || "No description provided";
    this.categories = options.categories || ["No category for this command"];
    this.usages = options.usages || ["No usages provided"];
    this.examples = options.examples || ["No examples provided"];
    this.aliases = options.aliases;
    this.cooldown = options.cooldown || 0;
    this.voteLocked = options.voteLocked || false;
    this.permissions = options.permissions || [];
  }
};
