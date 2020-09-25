const mongoose = require("mongoose");
const { MONGODB_CONNECTION_STRING } = require("../../config/config.json");

module.exports = {
  init: async () => {
    // const dbOptions = {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   autoIndex: false,
    //   poolSize: 5,
    //   connectTimeoutMS: 10000,
    //   family: 4,
    // };

    const combineDbURI = () => {
      return `${MONGODB_CONNECTION_STRING}`;
    };

   const connect = async function () {
    const uri = combineDbURI(); // Will return DB URI 
    console.log(`Connecting to DB - uri: ${uri}`);
    return mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4,
    });
    };
    connect().then(() => {
      console.log('handle success here');
   }).catch((e) => {
      console.log('handle error here: ', e.message)
   })

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
