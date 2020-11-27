const { canModifyQueue } = require("../util/shuffleUtil");
const { MessageEmbed } = require("discord.js");
const config = require("../config.js");
let langs = ["english", "turkish"];

module.exports = {
  name: "setlang",
  cooldown: 5,
  aliases: ["dil-değiştir", "dil"],
  description: "Shuffle queue",
  execute(message, args) {
    let thisLang = "english";
    const language = require(`../languages/${thisLang}`);

    if (!langs.includes(args[0])) return message.channel.send(language("error").mission_language);
    db.set(`${message.guild.id}.language`, args[0]);
    message.channel
      .send(
        new MessageEmbed()
          .setAuthor(
            language("succes").language_updated.replace("{language}", args[0]),
            message.author.avatarURL()
          )
          .setColor(config.colors.succes)
      )
      .catch(console.error);
  }
};
