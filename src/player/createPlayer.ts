const fs = require("fs");
const plugins = fs.readdirSync("./src/player/plugins/");
console.log(plugins);
plugins.forEach((p) => {
  require(`./plugins/${p.split(".")[0]}`);
});
const { Player } = require("erela.js");

export default async (message) => {
  const player = new Player({
    guild: message.guild.id,
    textChannel: message.channel.id,
    voiceChannel: message.member.voice.channel.id,
    selfDeafen: true,
  });
  player.previous = null;
  player.connect();
  return player;
};
