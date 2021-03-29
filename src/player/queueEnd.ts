const { MessageEmbed } = require("discord.js");
const config = require("../config");

export default (client: any, player: any) => {
  try {
    player.playingEmbed.delete();
  } catch (err) {
    console.log(err);
  }
  client.channels.cache
    .get(player.textChannel)
    .send(
      new MessageEmbed()
        .setColor(config.colors.primary)
        .setAuthor("", client.user.avatarURL())
        .setDescription(
          `⭕ Queue has ended. Enjoying ${config.client.name}? Consider voting **[here](${config.client.top_gg_vote_link})**.`
        )
    );

  return player.destroy();
};
