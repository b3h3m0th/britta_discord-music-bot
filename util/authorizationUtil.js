const config = require("../config");

// const DBL = require("dblapi.js");
// const dbl = new DBL("Your top.gg token", client);

module.exports = {
  isDeveloper: (user) => {
    for (const d in config.dev) {
      if (config.dev[d].id === user.id) {
        return true;
      }
    }
    return false;
  },
  hasVoted: async (user, client) => {
    const voted = await client.topggAPI.hasVoted(user.id);
    return voted;
  },
};
