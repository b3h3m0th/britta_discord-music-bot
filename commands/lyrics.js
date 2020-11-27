const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const config = require("../config.js");

module.exports = {
  name: "lyrics",
  aliases: ["ly"],
  description: "Get lyrics for the currently playing song",
  async execute(message) {
    let thisLang = "english";
    const language = require(`../languages/${thisLang}`);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.channel
        .send(
          new MessageEmbed()
            .setAuthor(language("error").nothing_music, message.author.avatarURL())
            .setColor(config.colors.failed)
        )
        .catch(console.error);

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = language("error").lyrics_not_found.replace("{song.title}", queue.songs[0].title);
    } catch (error) {
      lyrics = language("error").lyrics_not_found.replace("{song.title}", queue.songs[0].title);
    }

    let lyricsEmbed = new MessageEmbed()
      .setTitle(language("succes").nowplaying_lyrics_title)
      .setDescription(lyrics)
      .setColor(config.colors.default)
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
  }
};
