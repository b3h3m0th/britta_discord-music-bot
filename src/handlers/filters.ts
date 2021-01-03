const fs = require("fs");
const filters = fs.readdirSync("./src/filters/");

module.exports = (client: any) => {
  try {
    filters
      .filter((file) => file.endsWith(".ts"))
      .forEach((filter) => {
        const fil = require(`../filters/${filter.split(".")[0]}`);
        client.filters.set(fil.name.toLowerCase(), new fil(client));
      });
  } catch (err) {
    client.log(err);
  }
};

export {};
