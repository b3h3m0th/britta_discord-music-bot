const fs = require("fs");
const eventFolder = fs.readdirSync("./src/events/");
const path = require("path");

module.exports = (client) => {
  eventFolder.forEach(async (eventFolder) => {
    const file = require(`../events/${eventFolder.split(".")[0]}`);
    const event = new file(client, file);

    client.on(event.name, (...args) => {
      event.run(...args);
    });
  });
};
