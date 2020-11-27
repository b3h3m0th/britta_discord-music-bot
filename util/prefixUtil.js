const fs = require("fs");
const config = require("../config");

module.exports = {
  getGuildPrefix: (guildID) => {
    let prefixes = JSON.parse(fs.readFileSync("./data/prefixes.json", "utf-8"));

    if (!prefixes[guildID]) {
      prefixes[guildID] = {
        prefix: config.client.prefix,
      };
      fs.writeFileSync("./data/prefixes.json", JSON.stringify(prefixes));
    }

    return prefixes[guildID].prefix;
  },

  getAllGuildPrefixes: () => {
    return JSON.parse(fs.readFileSync("./data/prefixes.json", "utf-8"));
  },
};
