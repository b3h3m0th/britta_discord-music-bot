const { MessageEmbed } = require("discord.js");
const { canModifyQueue } = require("../util/shuffleUtil");
const config = require("../config.js");

module.exports = {
  name: "resume",
  aliases: ["r"],
  description: "Resume currently playing music",
  execute(message) {
    const thisLang = "english";
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
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel
        .send(
          new MessageEmbed()
            .setAuthor(
              language("succes").resumed_music.replace(
                "{author}",
                message.author.username
              ),
              message.author.avatarURL()
            )
            .setColor(config.colors.failed)
        )
        .catch(console.error);
    }

    return queue.textChannel
      .send(
        new MessageEmbed()
          .setAuthor(language("error").queue_isnot, message.author.avatarURL())
          .setColor(config.colors.primary)
      )
      .catch(console.error);
  },
};
