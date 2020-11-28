const { MessageEmbed } = require("discord.js");
const config = require("../config.js");

module.exports = {
  name: "nowplaying",
  aliases: ["np"],
  description: "Show now playing song",
  execute(message) {
    let thisLang = "english";
    const language = require(`../languages/${thisLang}`);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.channel
        .send(
          new MessageEmbed()
            .setAuthor(
              language("error").nothing_music,
              message.author.avatarURL()
            )
            .setColor(config.colors.failed)
        )
        .catch(console.error);
    const song = queue.songs[0];

    let nowPlaying = new MessageEmbed()
      .setAuthor(
        language("succes").nowplaying_title,
        message.client.config.resources.now_playing
      )
      .setDescription(`${song.title}\n${song.url}`)
      .setColor(config.colors.primary);

    if (song.duration > 0)
      nowPlaying.setFooter(
        new Date(song.duration * 1000).toISOString().substr(11, 8)
      );

    return message.channel.send(nowPlaying);
  },
};
