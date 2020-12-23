const config = require("../config");
const Topgg = require("@top-gg/sdk");
const api = new Topgg.Api(config.api.top_gg_token);

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
  hasVoted: async (user) => {
    const voted = await api.hasVoted(user.id);
    console.log(voted);
    return voted;
  },
};
