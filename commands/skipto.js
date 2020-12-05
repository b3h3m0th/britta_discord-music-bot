const { canModifyQueue } = require("../util/shuffleUtil");
const {
  commands: { categories },
} = require("../config");

module.exports = {
  name: "skipto",
  aliases: ["st"],
  categories: [categories.music],
  usages: ["queue_number"],
  examples: ["3"],
  description: "Skip to the selected queue number",
  execute: (message, args) => {
    if (!args.length)
      return message.reply(
        `Usage: ${message.client.prefix}${module.exports.name} <Queue Number>`
      );

    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.channel.send("There is no queue.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;
    queue.songs = queue.songs.slice(args[0] - 1);
    queue.connection.dispatcher.end();
    queue.textChannel
      .send(`${message.author} ⏭ skipped ${args[0]} songs`)
      .catch(console.error);
  },
};
