const config = require("./config");
import Britta from "./structures/Client";
const client = new Britta(config.client.token);

client.init();

["events", "commands"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});
