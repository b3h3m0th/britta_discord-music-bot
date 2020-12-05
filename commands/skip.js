const { canModifyQueue } = require("../util/shuffleUtil");
const {
  commands: { categories },
} = require("../config");

module.exports = {
  name: "skip",
  aliases: ["s"],
  categories: [categories.music],
  description: "Skip the currently playing song",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message
        .reply("There is nothing playing that I could skip for you.")
        .catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;
    queue.connection.dispatcher.end();
    queue.textChannel
      .send(`${message.author} ⏭ skipped the song`)
      .catch(console.error);
  },
};
