const Discord = require("discord.js");
const client = new Discord.Client();

let britta = (message) => {
  message.channel.send(
    "Habedeehre i bin dBritta und i los suppa musik lofa. I segs da jetzt isch party hard"
  );
};

module.exports = britta;
