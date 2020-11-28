const { MessageEmbed, splitMessage } = require("discord.js");
const { getFormattedTime } = require("../util/formatUtil");
const config = require("../config.js");

module.exports = {
  name: "queue",
  aliases: ["q"],
  description: "Show the music queue and now playing.",
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

    let description = `🔊 **Now Playing**:\n[${queue.songs[0].title.slice(
      0,
      50
    )}](${queue.songs[0].url})  **[${getFormattedTime(
      queue.songs[0].duration
    )}]**\n\n🔊 **Coming up next**:\n`;

    for (let i = 1; i < queue.songs.length; i++) {
      description += `**${i}.** [${queue.songs[i].title.slice(0, 50)}](${
        queue.songs[i].url
      })  **[${getFormattedTime(queue.songs[i].duration)}]**\n`;
    }

    let queueEmbed = new MessageEmbed()
      .setAuthor(
        language("succes").queue_title,
        message.client.config.resources.now_playing
      )
      .setDescription(description)
      .setColor(config.colors.primary);

    const splitDescription = splitMessage(description, {
      maxLength: 2048,
      char: "\n",
      prepend: "",
      append: "",
    });

    splitDescription.forEach(async (m) => {
      queueEmbed.setDescription(m);
      message.channel.send(queueEmbed);
    });
  },
};
