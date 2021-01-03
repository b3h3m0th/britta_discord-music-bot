const Guild = require("../models/guild");

export const getGuildPrefix: (guildID: string) => Promise<string> = async (
  guildID: string
) => {
  const guild = await Guild.findOne({ id: guildID });
  return guild.prefix;
};

export const setNewGuildPrefix: (
  guildID: string,
  newPrefix: string
) => Promise<void> = async (guildID: string, newPrefix: string) => {
  await Guild.updateOne({ id: guildID }, { prefix: newPrefix });
};
