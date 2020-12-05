const { MessageEmbed } = require("discord.js");
const { canModifyQueue } = require("../util/shuffleUtil");
const language = require("../languages/english");
const {
  commands: { categories },
} = require("../config");

module.exports = {
  name: "shuffle",
  description: "Shuffle queue",
  aliases: ["sh"],
  categories: [categories.music],
  execute: (message) => {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.channel.send(
        new MessageEmbed()
          .setAuthor(
            language("error").nothing_music,
            message.author.avatarURL()
          )
          .setColor(message.client.config.colors.failed)
      );
    if (!canModifyQueue(message.member)) return;

    let songs = queue.songs;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    queue.songs = songs;
    message.client.queue.set(message.guild.id, queue);
    queue.textChannel
      .send(
        new MessageEmbed()
          .setAuthor(
            `🔀 ${message.author.username} shuffled te queue`,
            message.author.avatarURL()
          )
          .setColor(message.client.config.colors.primary)
      )
      .catch(console.error);
  },
};
