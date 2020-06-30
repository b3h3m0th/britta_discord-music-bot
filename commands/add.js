const Discord = require("discord.js");
const client = new Discord.Client();

var ytSearch = require("youtube-search");
const { PREFIX, TOKEN, YOUTUBE_API } = require("../config/config.json");

var opts = {
  maxResults: 1,
  key: YOUTUBE_API,
  type: "video",
};

let add = (client, message, args, queue) => {
  let songRequest;

  if (args.length < 2) {
    message.channel.send("Couldn't find a song request");
    return;
  }
  if (
    args[1].includes("https://youtube.com/watch") ||
    args[1].includes("https://www.youtube.com/watch") ||
    args[1].includes("http://youtube.com/watch") ||
    args[1].includes("http://www.youtube.com/watch") ||
    args[1].includes("https://youtu.be/") ||
    args[1].includes("https://www.youtu.be/") ||
    args[1].includes("http://www.youtu.be/") ||
    args[1].includes("http://youtu.be/")
  ) {
    songRequest = args[1];
    message.channel.send("Song has been added to queue");
    queue.push(songRequest);
  } else {
    args.shift();
    songRequest = args.join(" ");
    ytSearch(songRequest, opts, function (err, results) {
      if (err) return;

      if (!results) {
        message.channel.send("This song could not be found");
        return;
      }

      let songRequest_data = results[0];
      queue.push(songRequest_data.link);
      let songRequest_link = results[0].link;
      let songRequest_title = results[0].title;
      let songRequest_description = results[0].description;
      let songRequest_thumbnail = results[0].thumbnails.high.url;
      console.log(results[0].link);

      message.channel.send({
        embed: {
          color: 3447003,
          author: {
            name: "Song has been added to queue",
            icon_url: client.user.avatarURL,
          },
          title: songRequest_title,
          url: songRequest_link,
          description: songRequest_description,
          thumbnail: {
            url: songRequest_thumbnail,
          },
          fields: [
            {
              name: "Brittas social media:",
              value: "[brittas website](https://britta.com)",
            },
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Britta",
          },
        },
      });
    });
  }
};

module.exports = add;
