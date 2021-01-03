const { Player } = require("erela.js");
const BetterPlayer = require("../player/plugins/PlayerFilters");

export default async (message) => {
  const player = new BetterPlayer({
    guild: message.guild.id,
    textChannel: message.channel.id,
    voiceChannel: message.member.voice.channel.id,
    selfDeafen: true,
  });
  player.previous = null;
  player.connect();
  return player;
};
