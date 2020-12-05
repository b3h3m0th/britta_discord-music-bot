const { canModifyQueue } = require("../util/shuffleUtil");
const { MessageEmbed } = require("discord.js");
const config = require("../config.js");
const {
  commands: { categories },
} = require("../config");

module.exports = {
  name: "pause",
  description: "Pause the currently playing music",
  categories: [categories.music],
  usages: [""],
  examples: [""],
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

    if (!canModifyQueue(message.member)) return;

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      return queue.textChannel
        .send(
          new MessageEmbed()
            .setAuthor(
              language("succes").paused_music.replace(
                "{author}",
                message.author.username
              ),
              message.author.avatarURL()
            )
            .setColor(config.colors.failed)
        )
        .catch(console.error);
    }
  },
};
