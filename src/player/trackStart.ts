import { PlayingEmbed } from "../util/embed";

export default async (client: any, player: any, track: any) => {
  if (player.playingEmbed) player.playingEmbed.delete();

  player.playingEmbed = await client.channels.cache
    .get(player.textChannel)
    .send(new PlayingEmbed(track, track.querySource));
};
