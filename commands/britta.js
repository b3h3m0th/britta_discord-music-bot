const Discord = require("discord.js");
const client = new Discord.Client();
const Canvas = require("canvas");

let britta = async (message, guild, channel, member) => {
  guild.roles
    .create({
      name: "Britta",
      color: "#fff",
      reason: "Habedeehre i bin dBritta",
    })
    .then(console.log)
    .catch(console.error);
  message.channel.send(
    "Habedeehre i bin dBritta und i los suppa musik lofa. I segs da jetzt isch party hard"
  );

  const emoji = message.guild.emojis.cache.find(
    (emoji) => emoji.name === "Britta"
  );
  if (emoji) {
    message.react(emoji);
  }

  if (!channel) return;

  const canvas = Canvas.createCanvas(1000, 250);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage("./britta.jpg");
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Select the font size and type from one of the natively available fonts
  ctx.font = "60px Open Sans";
  // Select the style that will be used to fill the text in
  ctx.fillStyle = "#000";
  // Actually fill the text with a solid color
  ctx.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.8);

  ctx.beginPath();
  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(
    member.user.displayAvatarURL({ format: "jpg" })
  );
  ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "britta-isch-do.png"
  );

  channel.send(`I hoaß di recht herzlich willkommen, ${member}!`, attachment);
};

module.exports = britta;
