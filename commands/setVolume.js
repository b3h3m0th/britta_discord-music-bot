const Discord = require("discord.js");
const client = new Discord.Client();

let setVolume = (message, args, dispatcher) => {
  if (dispatcher) {
    if (args.length >= 2 && Number.isInteger(parseInt(args[1]))) {
      dispatcher.setVolume(args[1] / 100);
      message.channel.send("I hob dVolume jetzt uf " + args[1] + "% gestellt");
      if (dispatcher.volume >= 1000) {
        message.channel.send(
          "Hosch an Vogel dMusik so lut zum macha?? Do kut no glei da nochbur umme, he"
        );
      }
    } else {
      message.channel.send("Seg ma halt wia lut i singa söll, Schwerzkeks");
    }
  } else {
    message.channel.send("Im Moment lauft kua musik");
  }
};

module.exports = setVolume;
