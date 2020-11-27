const { canModifyQueue } = require("../util/shuffleUtil");
const { MessageEmbed } = require("discord.js");
const config = require("../config.js");

module.exports = {
  name: "remove",
  description: "Remove song from the queue",
  execute(message, args) {
    const thisLang = "english";
    const language = require(`../languages/${thisLang}`);

    const queue = args[0];
    const queues = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.channel
        .send(
          new MessageEmbed()
            .setAuthor(language("error").nothing_music, message.author.avatarURL())
            .setColor(config.colors.failed)
        )
        .catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!args.length)
      return message.channel
        .send(
          new MessageEmbed()
            .setAuthor(
              language("error").remove_args.replace("{prefix}", client.prefix),
              message.author.avatarURL()
            )
            .setColor(config.colors.failed)
        )
        .catch(console.error);
    if (isNaN(args[0]))
      return message.channel
        .send(
          new MessageEmbed()
            .setAuthor(
              language("error").remove_args.replace("{prefix}", client.prefix),
              message.author.avatarURL()
            )
            .setColor(config.colors.failed)
        )
        .catch(console.error);

    const song = queues.songs.splice(args[0] - 1, 1);
    queues.textChannel
      .send(
        new MessageEmbed()
          .setAuthor(
            language("succes")
              .music_remove.replace("{author}", message.author.tag)
              .replace("{song.title}", song[0].title),
            message.author.avatarURL()
          )
          .setColor(config.colors.failed)
      )
      .catch(console.error);
  }
};
