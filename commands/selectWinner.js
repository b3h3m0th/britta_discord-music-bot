module.exports = {
  name: "selectwinner",
  description: "Select winner from giveaway",
  category: "moderation",
  execute(message, args) {
    let channel = message.mentions.channels.first();

    channel.send(
      `
:tada:  **The Alps BTE 1000 members giveaway has ended!**

` +
        `*(221 valid entries)*

🎉  The **winners** of the giveaway are:

@paulijumper#5008
@gessio#0001
@Leah__#9725

🎉  Congratulations!
            `
    );
  },
};
