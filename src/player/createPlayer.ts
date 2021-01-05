// const fs = require("fs");
// const plugins = fs.readdirSync("./src/player/plugins/");
// plugins.forEach((p) => {
//   require(`./plugins/${p.split(".")[0]}`);
// });
const BrittaPlayer = require("./plugins/CustomFilters");
const { Player } = require("erela.js");

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
