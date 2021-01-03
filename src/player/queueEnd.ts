const { MessageEmbed } = require("discord.js");
const config = require("../config");

export default (client: any, player: any) => {
  player.playingMessage && player.playingMessage.delete();
  client.channels.cache
    .get(player.textChannel)
    .send(
      new MessageEmbed()
        .setColor(config.colors.primary)
        .setAuthor("", client.user.avatarURL())
        .setDescription("⭕ Queue has ended")
    );

  return player.destroy();
};
