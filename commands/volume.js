const { canModifyQueue } = require("../util/shuffleUtil");
const {
  commands: { categories },
} = require("../config");

module.exports = {
  name: "volume",
  aliases: ["v"],
  categories: [categories.music],
  usages: ["", "new_volume"],
  examples: ["", "20", "100"],
  description: "Change volume of currently playing music",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue)
      return message.reply("There is nothing playing.").catch(console.error);
    if (!canModifyQueue(message.member))
      return message
        .reply("You need to join a voice channel first!")
        .catch(console.error);

    if (!args[0])
      return message
        .reply(`🔊 The current volume is: **${queue.volume}%**`)
        .catch(console.error);
    if (isNaN(args[0]))
      return message
        .reply("Please use a number to set volume.")
        .catch(console.error);
    if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0)
      return message
        .reply("Please use a number between 0 - 100.")
        .catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel
      .send(`Volume set to: **${args[0]}%**`)
      .catch(console.error);
  },
};
