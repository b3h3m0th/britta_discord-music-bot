const mongoose = require("mongoose");
const { MONGODB_CONNECTION_STRING } = require("../../config/config.json");

module.exports = {
  init: async () => {
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4,
    };

    await mongoose.connect(MONGODB_CONNECTION_STRING, dbOptions);

    mongoose.set("useFindAndModify", false);
    mongoose.Promise = global.Promise;

    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    mongoose.connection.on("err", () => {
      console.log("MongoDB error");
    });
  },
};
