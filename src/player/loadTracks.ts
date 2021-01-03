const ytsr = require("ytsr");
import { TrackSource } from "../types/Music";
import { ErrorEmbed, QueuedEmbed } from "../util/embed";

export default (
  message,
  playMessage,
  player,
  searchQuery,
  playlist: Boolean,
  source: TrackSource
) => {
  let tries = 0;
  const load = async (search) => {
    let res = await message.client.manager.search(search, message.author);
    if (res.loadType !== "NO_MATCHES" && res.loadType !== "LOAD_FAILED") {
      if (res.loadType == "TRACK_LOADED" || res.loadType == "SEARCH_RESULT") {
        res.tracks[0].querySource = source;
        player.queue.add(res.tracks[0]);
        if (!playlist && playMessage)
          playMessage.edit(
            new QueuedEmbed(
              res.tracks[0].title,
              res.tracks[0].uri,
              res.tracks[0].duration,
              null,
              res.tracks[0].requester
            )
          );
        if (!player.playing && !player.paused && !player.queue.length)
          player.play();
      } else if (res.loadType == "PLAYLIST_LOADED") {
        for (const track of res.tracks) {
          track.querySource = source;
          player.queue.add(track);
          if (!player.playing && !player.paused && !player.queue.length)
            player.play();
        }
        playMessage.edit(
          new QueuedEmbed(
            res.playlist.name,
            res.playlist.uri,
            res.tracks.reduce((acc, cure) => ({
              duration: acc.duration + cure.duration,
            })).duration,
            res.tracks.length,
            res.tracks[0].requester.id
          )
        );
      }
      return;
    } else {
      const searchResult = await ytsr(searchQuery, { limit: 1 });
      if (tries > 7)
        return playMessage.edit(
          new ErrorEmbed(message, {
            author: {
              name: `No matching songs found`,
              icon_url: message.author.avatarURL(),
            },
            description: " ",
          })
        );
      else {
        tries++;
        return load(searchResult.items[0].link);
      }
    }
  };
  return load(searchQuery);
};
