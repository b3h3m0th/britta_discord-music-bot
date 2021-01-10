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
    time: 6000000,
  });

  collector.on("collect", async (reaction: any, user: any) => {
    switch (reaction.emoji.name) {
      case PlayingMessageReactions.PLAY_PAUSE:
        player.pause(player.playing);
        player.playingEmbed.channel.send(
          new MessageEmbed({
            color: config.colors.primary,
            author: null,
            description: ` ${
              player.playing
                ? "▶️ Music is now playing again"
                : "⏸️ Music is now paused"
            }`,
          })
        );
        break;
      case PlayingMessageReactions.SKIP:
        if (player.trackRepeat) player.setTrackRepeat(false);
        if (player.queueRepeat) player.setQueueRepeat(false);
        player.stop();
        await player.playingEmbed.delete();
        await player.playingEmbed.channel.send(
          new MessageEmbed({
            color: config.colors.primary,
            author: null,
            description: `⏭️ ${user} skipped a song`,
          })
        );
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
        player.setTrackRepeat(true);
        await player.playingEmbed.reactions.cache
          .get(LoopingVariants.LOOP_TRACK)
          .remove();
        await player.playingEmbed.react(LoopingVariants.LOOP_QUEUE);
        player.playingEmbed.channel.send(
          new MessageEmbed({
            color: config.colors.primary,
            author: null,
            description: "🔂 **Song** loop is now **on**",
          })
        );
        break;
      case LoopingVariants.LOOP_QUEUE:
        player.setQueueRepeat(true);
        await player.playingEmbed.reactions.cache
          .get(LoopingVariants.LOOP_QUEUE)
          .remove();
        await player.playingEmbed.react(LoopingVariants.LOOP_TRACK);
        player.playingEmbed.channel.send(
          new MessageEmbed({
            color: config.colors.primary,
            author: null,
            description: "🔁 **Queue** loop is now **on**",
          })
        );
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
