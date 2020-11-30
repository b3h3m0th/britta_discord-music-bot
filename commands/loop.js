const { canModifyQueue } = require("../util/shuffleUtil");
const { MessageEmbed } = require("discord.js");
const config = require("../config.js");

module.exports = {
  name: "loop",
  aliases: ["l"],
  description: "Toggle music loop",
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

    // toggle from false to true and reverse
    queue.loop = !queue.loop;
    return queue.textChannel
      .send(
        new MessageEmbed()
          .setAuthor(
            `${language("succes").queue_loop} ${queue.loop ? "on" : "off"}`,
            message.author.avatarURL()
          )
          .setColor(config.colors.succes)
      )
      .catch(console.error);
  },
};
