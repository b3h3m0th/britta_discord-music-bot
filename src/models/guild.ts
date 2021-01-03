const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
  id: String,
  name: String,
  prefix: String,
  premium: Boolean,
});

module.exports = mongoose.model("Guild", guildSchema);
export {};
