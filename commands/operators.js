const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require("ytdl-core");
const play = require("../commands/play");

let stop = (message, currentPlaynow_link, voiceChannel) => {
  try {
    voiceChannel.join().then((connection) => {
      stream = ytdl(currentPlaynow_link, {
        filter: "audioonly",
      });
      dispatcher = connection.play(stream);
      dispatcher.end();
    });

    message.channel.send("Sodele, da song isch jetzt auf Pause.");
  } catch (error) {
    message.channel.send("Aue, mir isch an Fehler unterlaufa");
  }
};

let resume = (message, currentPlaynow_link, voiceChannel) => {
  try {
    voiceChannel.join().then((connection) => {
      stream = ytdl(currentPlaynow_link, {
        filter: "audioonly",
      });
      dispatcher = connection.play(stream);
      dispatcher.resume();
    });

    message.channel.send("Sodele, da song läuft jetzt witta.");
  } catch (error) {
    message.channel.send("Aue, mir isch an Fehler unterlaufa");
  }
};

module.exports = {
  stop: stop,
  resume: resume,
};
