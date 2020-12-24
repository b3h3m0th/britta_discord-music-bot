const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const config = require("../config.js");
const {
  commands: { categories },
} = require("../config");
const { hasVoted } = require("../util/authorizationUtil");
const { getPremiumCommandErrorEmbed } = require("../util/embedUtil.js");

module.exports = {
  name: "lyrics",
  aliases: ["ly"],
  categories: [categories.music, categories.premium],
  usages: ["", "songname"],
  examples: ["", "Pantera - Cowboys from Hell"],
  description: "Get lyrics for the currently playing song",
  async execute(message, args) {
    if (!(await hasVoted(message.author))) {
      return message.channel.send(getPremiumCommandErrorEmbed(message));
    }
    let thisLang = "english";
    const language = require(`../languages/${thisLang}`);

    const queue = message.client.queue.get(message.guild.id);
    let lyrics = null;
    let lyricsEmbed = new MessageEmbed()
      .setTimestamp()
      .setColor(config.colors.primary);

    const setLyricsNotFound = () => {
      lyricsEmbed.setAuthor("No lyrics found for this song :(");
      lyricsEmbed.setColor(config.colors.failed);
    };

    if (args.length) {
      const searchQuery = args.join(" ");
      try {
        lyrics = await lyricsFinder(searchQuery, "");
        if (!lyrics) {
          setLyricsNotFound();
        } else {
          lyricsEmbed.setDescription(lyrics);
          lyricsEmbed.setAuthor(`Lyrics for "${searchQuery}"`);
        }
      } catch (err) {
        setLyricsNotFound();
      }
    } else {
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

      try {
        lyrics = await lyricsFinder(queue.songs[0].title, "");
        if (!lyrics) {
          setLyricsNotFound();
        } else {
          lyricsEmbed.setAuthor(`Lyrics for ${queue.songs[0].title}`);
          lyricsEmbed.setDescription(lyrics);
        }
      } catch (error) {
        setLyricsNotFound();
      }
    }

    if (lyricsEmbed.description && lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
  },
};
