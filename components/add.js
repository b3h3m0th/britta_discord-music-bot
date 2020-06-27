const Discord = require("discord.js");
const client = new Discord.Client();

var ytSearch = require("youtube-search");
const { PREFIX, TOKEN, YOUTUBE_API } = require("../config/config.json");

var opts = {
  maxResults: 1,
  key: YOUTUBE_API,
  type: "video",
};

let add = (client, message, songRequest, queue) => {
  ytSearch(songRequest, opts, function (err, results) {
    if (err) return console.log(err);

    if (!results) {
      message.channel.send("Sorry aba i hob dean Song ned finda künna");
      return;
    }

    let songRequest_data = results[0];
    queue.push(songRequest_data);
    console.log(results);
    let songRequest_link = results[0].link;
    let songRequest_title = results[0].title;
    let songRequest_description = results[0].description;
    let songRequest_thumbnail = results[0].thumbnails.high.url;
    console.log(songRequest_thumbnail);
    console.log(results[0].link);

    message.channel.send({
      embed: {
        color: 3447003,
        author: {
          name: "Obacht! d'" + client.user.username + " hot sWort",
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
    message.channel.send("I hob din song zur queue dazua tau");
  });
};

module.exports = add;
