const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  guildID: String,
  guildName: String,
  prefix: String,
});

module.exports = mongoose.model("Guild", guildSchema);
