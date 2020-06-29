const Discord = require("discord.js");
const client = new Discord.Client();

let britta = (message, guild) => {
  guild.roles
    .create({
      name: "Britta",
      color: "#fff",
      reason: "Habedeehre i bin dBritta",
    })
    .then(console.log)
    .catch(console.error);
  message.channel.send(
    "Habedeehre i bin dBritta und i los suppa musik lofa. I segs da jetzt isch party hard"
  );
};

module.exports = britta;
