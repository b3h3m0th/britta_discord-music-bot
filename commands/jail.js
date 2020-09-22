const jimp = require("jimp");
const { substring } = require("ffmpeg-static");
const { arrayFill } = require("ascii-table");
module.exports = {
  name: "jail",
  description: "Sends a user to jail ;)",
  category: "fun",
  async execute(message, args) {
    args.shift();

    var userToJail;
    var userToJailAvatar;
    var userToJailID;

    async function jailUser(userToJailAvatar) {
      var images = [userToJailAvatar, jailImgPath];
      var jimps = [];
      for (var i = 0; i < images.length; i++) {
        jimps.push(jimp.read(images[i]));
      }
      await Promise.all(jimps)
        .then(function (data) {
          return Promise.all(jimps);
        })
        .then(async function (data) {
          data[0].composite(data[1], 0, 0); //adds the second specified image (the jail bars) on top of the first specified image (the avatar). "0, 0" define where the second image is placed, originating from the top left corner
          data[1].resize(128, 128);

          data[0].write("./assets/img/jailProfiles/jailed.png");
        });

      message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "🚔 Sent to jail!",
          },
          files: ["./assets/img/jailProfiles/jailed.png"],
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
    }

    var jailImgPath =
      "https://i.pinimg.com/originals/17/55/07/17550783dc69c6cfd95ec758f21d8bf5.png";

    if (args.length < 1) {
      userToJailAvatar = message.author.avatarURL({
        format: "jpg",
        size: 1024,
      });
      jailUser(userToJailAvatar);
    } else {
      userToJailID = args[0].trim().substring(3).replace(">", "");
      message.guild.members.cache.forEach((element) => {
        if (element.user.id == userToJailID) {
          userToJailAvatar = `https://cdn.discordapp.com/avatars/${userToJailID}/${element.user.avatar}.png?size=512`;
        }
      });
      jailUser(userToJailAvatar);
    }
  },
};
