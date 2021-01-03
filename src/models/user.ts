const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: String,
  username: String,
  discriminator: Number,
  premium: Boolean,
});

module.exports = mongoose.model("User", userSchema);
