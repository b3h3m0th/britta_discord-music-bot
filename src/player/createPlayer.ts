const BrittaPlayer = require("./plugins/CustomFilters");

export default async (message) => {
  const player = new BrittaPlayer({
    guild: message.guild.id,
    textChannel: message.channel.id,
    voiceChannel: message.member.voice.channel.id,
    selfDeafen: true,
  });
  player.previous = null;
  player.connect();
  return player;
};
