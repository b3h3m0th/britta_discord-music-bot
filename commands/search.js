const { MessageEmbed } = require("discord.js");
const config = require("../config");
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(config.api.youtube_key);
const {
  commands: { categories },
} = require("../config");

module.exports = {
  name: "search",
  description: "Search and select videos to play",
  categories: [categories.music],
  async execute(message, args) {
    if (!args.length)
      return message
        .reply(
          `Usage: ${message.client.prefix}${module.exports.name} <Video Name>`
        )
        .catch(console.error);
    if (message.channel.activeCollector)
      return message.reply(
        "A message collector is already active in this channel."
      );
    if (!message.member.voice.channel)
      return message
        .reply("You need to join a voice channel first!")
        .catch(console.error);

    const search = args.join(" ");

    let resultsEmbed = new MessageEmbed()
      .setAuthor(
        `Reply with the song number you want to play`,
        config.resources.youtubeIcon
      )
      .setDescription(`Results for: ${search}`)
      .setColor(config.colors.primary);

    try {
      const results = await youtube.searchVideos(search, 10);
      results.map((video, index) =>
        resultsEmbed.addField(video.shortURL, `${index + 1}. ${video.title}`)
      );

      var resultsMessage = await message.channel.send(resultsEmbed);

      const filter = (msg) => {
        const pattern = /(^[1-9][0-9]{0,1}$)/g;
        return (
          pattern.test(msg.content) &&
          parseInt(msg.content.match(pattern)[0]) <= 10
        );
      };

      message.channel.activeCollector = true;
      const response = await message.channel.awaitMessages(filter, {
        max: 1,
        time: 30000,
        errors: ["time"],
      });
      const choice = resultsEmbed.fields[parseInt(response.first()) - 1].name;

      message.channel.activeCollector = false;
      message.client.commands.get("play").execute(message, [choice]);
      resultsMessage.delete().catch(console.error);
    } catch (error) {
      console.error(error);
      message.channel.activeCollector = false;
    }
  },
};
