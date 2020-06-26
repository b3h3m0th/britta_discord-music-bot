const Discord = require("discord.js");
const ytdl = require("ytdl-core");

const client = new Discord.Client();

const guild = new Discord.Guild(client);

//Britta data
const { PREFIX, TOKEN, YOUTUBE_API } = require("./config/config.json");
var VERSION = 1.0;

client.on("ready", () => {
  console.log(
    "Sodele i bin jetzt parat mit minara version " + VERSION.toString()
  );
  client.user.setUsername("Britta usam Bregenzerwald");
  client.user.setActivity("Britta", { type: "STREAMING" });
  // guild.roles
  //   .create({
  //     data: {
  //       name: "Super Cool People",
  //       color: "BLUE",
  //     },
  //     reason: "we needed a role for Super Cool People",
  //   })
  //   .then(console.log)
  //   .catch(console.error);

  //Britta role
  // let role;
  // role = await message.guild.createRole({
  //   name: "Britta",
  //   color: "#000",
  //   permission: [
  //     ADMINISTRATOR
  //   ]
  // })
});

//YOUTUBE
var ytSearch = require("youtube-search");
console.log(YOUTUBE_API);

var opts = {
  maxResults: 1,
  key: YOUTUBE_API,
  type: "video",
};

//QUEUE
let queue = [];
let dispatcher;

//EARRAPE
let earrape = false;

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.content.substring(0, 1) !== PREFIX) return;
  let args = message.content.substring(PREFIX.length).split(" ");
  console.log(args);

  //COMMANDS
  switch (args[0]) {
    case "version":
      message.channel.send(
        "Habe die ehre, min nama isch britta und i lof uf da version " +
          VERSION.toString()
      );
    case "play":
      play = () => {
        try {
          let songRequest = args[1];

          if (message.channel.type !== "text") return;
          const voiceChannel = message.member.voice.channel;
          if (!voiceChannel) {
            return message.channel.send(
              "Du seckel hoksch ned in anam Voicechat"
            );
          }

          ytSearch(songRequest, opts, function (err, results) {
            if (err) return console.log(err);

            if (!results) return;

            let songRequest_data = results[0];
            console.log(results);
            console.log(results[0].thumbnails.high);
            queue.push(songRequest_data);
            let songRequest_link = results[0].link;
            let songRequest_title = results[0].title;
            let songRequest_description = results[0].description;
            let songRequest_thumbnail = results[0].thumbnails.high.url;
            console.log(songRequest_thumbnail);
            console.log(results[0].link);

            voiceChannel.join().then((connection) => {
              const stream = ytdl(results[0].link, {
                filter: "audioonly",
              });
              dispatcher = connection.play(stream);

              dispatcher.on("end", () => {
                queue.shift();
                play();
                //queue shift
              });
            });

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
          });
        } catch (error) {
          message.channel.send(
            "Es hot an Fehler gea, aba i woas ned was genau passiert isch."
          );
        }
      };

      play();

      break;
    case "help":
      message.channel.send(
        "Uansch musch wissa. Vo da Britta krigsch kua Hilfe"
      );
      break;

    case "skip":
      if (queue[1]) {
        queue.shift();
        console.log(queue[0]);
        message.channel.send(
          "Der song gfallt ma ned. i hob dean übersprunga, bürschle"
        );
        play();
        queue.shift();
      } else {
        message.channel.send("Es lauft grad kua Liad, des ma skippen kann");
      }
      break;
    case "stop":
      try {
        dispatcher.pause();
        message.channel.send("Sodele, da song isch jetzt auf Pause.");
      } catch (error) {
        message.channel.send("Aue, mir isch an Fehler unterlaufa");
      }
      break;

    case "resume":
      dispatcher.resume();
      message.channel.send("Sodele, da song läuft jetzt witta.");
      break;

    case "np":
      try {
        message.channel.send("Jetzt lauft gad " + queue[0].title);
      } catch (error) {
        message.channel.send("Im Moment lauft kua Liad.");
      }
      break;

    case "leave":
      if (message.member.voice.channel) {
        message.member.voice.channel.leave();
        message.channel.send("Tschö mit Ö!");
      } else {
        message.channel.send("I bin ned mol gejoined du Sack");
      }
      break;

    case "clear":
      message.channel.send(
        "Dine Liste isch jetzt widda leer wia a leeres array"
      );
      queue = [];
      break;

    case "queue":
      let output = "";
      queue.forEach((element, index) => {
        output += index + 1 + ") " + element.title.toString() + "\n";
      });
      if (!output) {
        message.channel.send("Im Moment sind kua Liader in da queue");
      } else {
        message.channel.send({
          embed: {
            color: 3447003,
            author: {
              name: "Obacht! d'" + client.user.username + " hot sWort",
              icon_url: client.user.avatarURL,
            },
            title: "Des isch dine Song Liste: ",
            description: output,
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
      }
      break;

    case "join":
      if (message.member.voice.channel) {
        message.member.voice.channel.join().then((connection) => {
          connection.play("assets/audios/britta_join.mp3", {
            volume: 5,
          });
        });
      } else {
        message.channel.send("Du befindesch di ned in uanam Sprachkanal");
      }

    case "britta":
      message.channel.send(
        "Habedeehre i bin dBritta und i los suppa musik lofa. I segs da jetzt isch party hard"
      );
      break;

    case "gibarua":
      message.channel.send("Na.");
      break;

    // case "prefix":
    //   if (typeof args[1] !== undefined) {
    //     switch (args[1]) {
    //       case "set":
    //         if (args.length >= 3) {
    //           newPREFIX = args[2];
    //           PREFIX = newPREFIX;
    //           message.channel.send("Din neuer Prefix: " + PREFIX);
    //         } else {
    //           message.channel.send(
    //             "I hob kuan neua Prefix in dinara message entdecka künna."
    //           );
    //         }
    //         break;

    //       case "show":
    //         message.channel.send("Din aktueller Prefix: " + PREFIX);
    //         break;

    //       default:
    //         message.channel.send({
    //           embed: {
    //             color: 3447003,
    //             author: {
    //               name: "Obacht! d'" + client.user.username + " hot sWort",
    //               icon_url: client.user.avatarURL,
    //             },
    //             title: "I hilf da do a bizle: ",
    //             description:
    //               "set Prefix: " +
    //               PREFIX +
    //               "set [neua Prefix]\nshow Prefix: " +
    //               PREFIX +
    //               "show [neua Prefix]",
    //             fields: [
    //               {
    //                 name: "Brittas social media:",
    //                 value: "[brittas website](https://britta.com)",
    //               },
    //             ],
    //             timestamp: new Date(),
    //             footer: {
    //               icon_url: client.user.avatarURL,
    //               text: "© Britta",
    //             },
    //           },
    //         });
    //         break;
    //     }
    //   }
    //   break;

    case "setVolume":
      if (args.length >= 2 && Number.isInteger(parseInt(args[1]))) {
        dispatcher.setVolume(args[1] / 100);
        message.channel.send(
          "I hob dVolume jetzt uf " + args[1] + "% gestellt"
        );
        if (dispatcher.volume >= 1000) {
          message.channel.send(
            "Hosch an Vogel dMusik so lut zum macha?? Do kut no glei da nochbur umme, he"
          );
        }
      } else {
        message.channel.send("Seg ma halt wia lut i singa söll Schwerzkeks");
      }
      break;

    case "earrape":
      if (!earrape) {
        dispatcher.setVolume(99999);
        earrape = true;
        message.channel.send("Alta jetzt gohts ab!");
      } else {
        dispatcher.setVolume(1);
        earrape = false;
        message.channel.send("Jetzt isch widda guat");
      }
      break;

    default:
      message.channel.send("Des Kommando kennt dBritta neda, sorry");
      break;
  }
});

client.login(TOKEN);
