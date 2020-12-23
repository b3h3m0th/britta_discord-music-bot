const {
  commands: { categories },
} = require("../config");

module.exports = {
  name: "chucknorris",
  categories: [categories.fun],
  usage: [""],
  examples: [""],
  description: "Tells you a Chuck Norris joke",
  execute: async (message) => {
    let joke = await global.fetch("https://api.chucknorris.io/jokes/random");
    console.log(joke);
  },
};
