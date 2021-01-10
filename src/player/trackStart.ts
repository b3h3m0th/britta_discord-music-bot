import { LoopingVariants, PlayingMessageReactions } from "../types/Reaction";
import { PlayingEmbed } from "../util/embed";
const { MessageEmbed } = require("discord.js");
const config = require("../config");

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

  const filter = (reaction: any, user: any) =>
    user.id !== client.user.id &&
    [
      ...Object.values(PlayingMessageReactions),
      ...Object.values(LoopingVariants),
      player.queueRepeat
        ? LoopingVariants.LOOP_TRACK
        : LoopingVariants.LOOP_QUEUE,
    ].includes(reaction.emoji.name);

  const collector = player.playingEmbed.createReactionCollector(filter, {
    time: 60000,
  });

  collector.on("collect", async (reaction: any, user: any) => {
    switch (reaction.emoji.name) {
      case PlayingMessageReactions.PLAY_PAUSE:
        player.pause(player.playing);
        break;
      case PlayingMessageReactions.SKIP:
        if (player.trackRepeat) player.setTrackRepeat(false);
        if (player.queueRepeat) player.setQueueRepeat(false);
        player.stop();
        await player.playingEmbed.delete();
        break;
      case PlayingMessageReactions.STOP:
        player.destroy();
        await player.playingEmbed.delete();
        player.playingEmbed.channel.send(
          new MessageEmbed()
            .setColor(config.colors.primary)
            .setAuthor("", client.user.avatarURL())
            .setDescription(
              `⭕ Queue has ended. Enjoying ${config.client.name}? Consider voting **[here](${config.client.top_gg_vote_link})**.`
            )
        );
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

    const userReactions = player.playingEmbed.reactions.cache.filter(
      (reaction) => reaction.users.cache.has(user.id)
    );
    try {
      for (const reaction of userReactions.values()) {
        await reaction.users.remove(user.id);
      }
    } catch (err) {
      console.log(err);
    }
  });
};
