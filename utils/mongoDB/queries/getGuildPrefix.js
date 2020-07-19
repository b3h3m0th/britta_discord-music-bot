const mongoose = require("mongoose");
const Guild = require("../models/guild");

var prefix;
const getGuildPrefix = (message) => {
  try {
    Guild.findOne({ guildID: message.guild.id }, async (err, data) => {
      if (err) {
        return console.log(err);
      }
      if (!data) {
        let newGuild = new Guild({
          _id: mongoose.Types.ObjectId(),
          guildID: message.guild.id,
          guildName: message.guild.name,
          prefix: message.client.PREFIX,
        });
        newGuild.save();
        prefix = message.client.PREFIX;
      } else {
        prefix = data.prefix;
      }
    });
  } catch (err) {
    console.log(err);
  }
  return prefix;
};

module.exports = getGuildPrefix;
