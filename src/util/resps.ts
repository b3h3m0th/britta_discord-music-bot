import { BrittaEmbed, ErrorEmbed } from "./embed";
import { ResponseType } from "../types/Response";

module.exports = (message: any, type: ResponseType) => {
  let result;
  switch (type) {
    case ResponseType.noPermissionConnect:
      result = new ErrorEmbed(message, {
        author: {
          name: "I have dont have permission to connect to a voice channel",
          icon_url: message.author.avatarURL(),
        },
        description: " ",
      });
      break;
    case ResponseType.noPermissionSpeak:
      result = new ErrorEmbed(message, {
        author: {
          name: "I have dont have permission to speak in voice channels",
          icon_url: message.author.avatarURL(),
        },
        description: " ",
      });
      break;
    case ResponseType.noPremium:
      result = new ErrorEmbed(message, {
        author: {
          name: `🔒 You have discovered a Britta Premium feature`,
          icon_url: message.author.avatarURL(),
        },
        description: `You can access this feature temporarily by [voting here](${message.client.config.client.top_gg_vote_link}).\nSick of voting? Consider purchasing **Britta Premium** [here](${message.client.config.client.donate_link}).`,
      });
      break;
    case ResponseType.noVoiceChannel:
      result = new ErrorEmbed(message, {
        author: {
          name: `Please connect to a Voice Channel first`,
          icon_url: message.author.avatarURL(),
        },
        description: " ",
      });
      break;
    case ResponseType.joinedVoiceChannel:
      result = new BrittaEmbed(message, {
        author: {
          name: `✔️ Hey, I joined your channel`,
          icon_url: message.author.avatarURL(),
        },
        description: " ",
      });
      break;
    case ResponseType.leftVoiceChannel:
      result = new BrittaEmbed(message, {
        author: {
          name: `⭕ Bye, I left your channel`,
          icon_url: message.author.avatarURL(),
        },
        description: " ",
      });
      break;
    case ResponseType.nothingPlaying:
      result = new ErrorEmbed(message, {
        author: {
          name: `⭕ There is nothing playing`,
          icon_url: message.author.avatarURL(),
        },
        description: " ",
      });
      break;
    case ResponseType.noSearchResults:
      result = new ErrorEmbed(message, {
        author: {
          name: `No matching songs found`,
          icon_url: message.author.avatarURL(),
        },
        description: " ",
      });
      break;
    case ResponseType.filterNotExists:
      result = new ErrorEmbed(message, {
        author: {
          name: `⭕ That filter doesn't exist`,
          icon_url: message.author.avatarURL(),
        },
        description: `Type \`${message.client.prefix}filters\` to get a list of all available audio filters `,
      });
      break;
    case ResponseType.forwardedTooFar:
      result = new ErrorEmbed(message, {
        author: {
          name: `❌ Cannot forward beyond the songs duration`,
          icon_url: message.author.avatarURL(),
        },
        description: " ",
      });
      break;
    default:
      result = new ErrorEmbed(message, {
        author: {
          name: `Something must have gone wrong. You shouldn't see this...`,
          icon_url: message.author.avatarURL(),
        },
        description: " ",
      });
  }

  return message.channel.send(result);
};
