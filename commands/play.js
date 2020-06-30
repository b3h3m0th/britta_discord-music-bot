const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require("ytdl-core");

let play = (queue, voiceChannel) => {
  voiceChannel.join().then((connection) => {
    stream = ytdl(queue[0].link, {
      filter: "audioonly",
    });
    console.log(queue[0]);
    dispatcher = connection.play(stream);

    dispatcher.on("end", () => {
      queue.shift();
      if (queue.length > 0) {
        play(queue, voiceChannel);
      } else return;
    });
  });
};

module.exports = play;
