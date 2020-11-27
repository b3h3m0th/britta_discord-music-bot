const { MessageEmbed, splitMessage, escapeMarkdown } = require("discord.js");
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
            .setAuthor(language("error").nothing_music, message.author.avatarURL())
            .setColor(config.colors.failed)
        )
        .catch(console.error);

    const description = queue.songs.map((song, index) => `${index + 1}. ${escapeMarkdown(song.title)}`);

    let queueEmbed = new MessageEmbed()
      .setTitle(language("succes").queue_title)
      .setDescription(description)
      .setColor("#F8AA2A");

    const splitDescription = splitMessage(description, {
      maxLength: 2048,
      char: "\n",
      prepend: "",
      append: ""
    });

    splitDescription.forEach(async (m) => {
      queueEmbed.setDescription(m);
      message.channel.send(queueEmbed);
    });
  }
};
