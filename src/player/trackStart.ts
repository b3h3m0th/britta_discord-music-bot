import { LoopingVariants, PlayingMessageReactions } from "../types/Reaction";
import { PlayingEmbed } from "../util/embed";

const addReactionCommands = async (message: any, player: any) => {
  for (const reaction of Object.values(PlayingMessageReactions)) {
    await message.react(reaction);
  }
  if (player.queueRepeat) await message.react(LoopingVariants.LOOP_TRACK);
  else await message.react(LoopingVariants.LOOP_QUEUE);
};

export default async (client: any, player: any, track: any) => {
  if (player.playingEmbed) player.playingEmbed.delete();

  player.playingEmbed = await client.channels.cache
    .get(player.textChannel)
    .send(new PlayingEmbed(track, track.querySource));

  await addReactionCommands(player.playingEmbed, player);

  const filter = (reaction: any, user: any) => user.id !== client.user.id;
  //   const collector = player.playingEmbed.createReactionCollector(filter, {
  //     time: 60000,
  //   });

  //     collector.on("collect", (reaction: any, user: any) => {

  //     })

  player.playingEmbed
    .awaitReactions(
      (reaction, user) =>
        [
          ...Object.values(PlayingMessageReactions),
          ...Object.values(LoopingVariants),
          player.queueRepeat
            ? LoopingVariants.LOOP_TRACK
            : LoopingVariants.LOOP_QUEUE,
        ].includes(reaction.emoji.name),
      { max: 1, time: 60000, errors: ["time"] }
    )
    .then(async (collected) => {
      const reaction = collected.first();

      switch (reaction.emoji.name) {
        case PlayingMessageReactions.PLAY_PAUSE:
          player.pause(player.playing);
          if (player.playing) player.pause(true);
          else player.pause(false);
          break;
        case PlayingMessageReactions.SKIP:
          console.log("skip");
          break;
        case PlayingMessageReactions.STOP:
          console.log("stop");
          break;
        case LoopingVariants.LOOP_TRACK:
          console.log("track");
          break;
        case LoopingVariants.LOOP_QUEUE:
          console.log("queue");
          break;
        default:
          break;
      }
      console.log(user.id);
      const userReactions = player.playingEmbed.reactions.cache.filter(
        (reaction) => reaction.users.cache.has(user.id)
      );
      try {
        for (const reaction of userReactions.values()) {
          await reaction.users.remove(user.id);
        }
      } catch (error) {
        console.error("Failed to remove reactions.");
      }
    });
};
