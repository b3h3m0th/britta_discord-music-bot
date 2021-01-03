const { Manager } = require("erela.js");
const Spotify = require("erela.js-spotify");
const config = require("../config");
const chalk = require("chalk");
import queueEnd from "../player/queueEnd";
import trackStart from "./trackStart";

export default (client: any) => {
  client.manager = new Manager({
    nodes: [
      {
        host: config.lavalink.host,
        password: config.lavalink.password,
        port: config.lavalink.port,
      },
    ],
    plugins: [
      new Spotify({
        clientID: config.api.spotify_client_id,
        clientSecret: config.api.spotify_client_secret,
      }),
    ],
    autoPlay: true,
    send(id, payload) {
      const guild = client.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    },
  })
    .on("nodeConnect", (node) =>
      client.log(
        chalk.yellow.bold(
          `✔️  Lavalink -> ${node.options.identifier} is online!`
        )
      )
    )
    .on("nodeError", (node, error) => {
      client.log(chalk.yellow.bold(`❌ Lavalink -> ${error.message}`));
    })
    .on(
      "trackStart",
      async (player, track) => await trackStart(client, player, track)
    )
    .on("queueEnd", (player) => queueEnd(client, player));

  client.once("ready", () => {
    client.log(chalk.yellow.bold(`✔️  Lavalink is ready!`));
    client.manager.init(client.user.id);
  });

  client.on("raw", (d) => client.manager.updateVoiceState(d));
};
