const { MessageEmbed } = require("discord.js");
const config = require("../config");
const { colors, client, dev, resources } = require("../config");
import { EmbedOptions } from "../types/Embed";
import { TrackSource } from "../types/Music";
import { PlayingMessageReactions } from "../types/Reaction";
import formatDuration from "./formatDuration";

export class BrittaEmbed extends MessageEmbed {
  constructor(message, options?: EmbedOptions) {
    super(
      options
        ? {
            color: options.color ? options.color : colors.primary,
            title: options.title ? options.title : null,
            url: options.url ? options.url : null,
            author: options.author
              ? {
                  name: options.author.name
                    ? options.author.name
                    : message.client.user.username,
                  icon_url: options.author.icon_url
                    ? options.author.icon_url
                    : message.client.user.avatarURL(),
                }
              : null,
            description: options.description ? options.description : null,
            thumbnail: options.thumbnail ? options.thumbnail : null,
            fields: options.fields ? options.fields : null,
            image: options.image
              ? {
                  url: options.image.url ? options.image.url : null,
                }
              : null,
            timestamp: options.timestamp ? options.timestamp : null,
            footer: options.footer
              ? {
                  text: options.footer.text ? options.footer.text : null,
                  icon_url: options.footer.icon_url
                    ? options.footer.icon_url
                    : null,
                }
              : null,
          }
        : {
            color: colors.primary,
          }
    );
  }
}

export class BrittaIntroEmbed extends MessageEmbed {
  constructor(message: any, options?: EmbedOptions) {
    super(
      options
        ? {
            color: options.color ? options.color : colors.primary,
            title: options.title
              ? options.title
              : `👋 Hello I'm ${client.name}`,
            url: options.url ? options.url : null,
            author: options.author
              ? {
                  name: options.author.name
                    ? options.author.name
                    : message.client.user.username,
                  icon_url: options.author.icon_url
                    ? options.author.icon_url
                    : message.client.user.avatarURL(),
                }
              : {
                  name: message.client.username,
                  icon_url: message.client.user.avatarURL(),
                },
            description: options.description
              ? options.description
              : "I am your personal music bot",
            thumbnail: options.thumbnail ? options.thumbnail : null,
            fields: options.fields
              ? options.fields
              : [
                  {
                    name: "❓ Support Server",
                    value: `${config.support.server.invite_link}`,
                    inline: false,
                  },
                  {
                    name: `📑 Vote for ${config.client.name}`,
                    value: `${config.client.top_gg_vote_link}`,
                    inline: false,
                  },
                  {
                    name: "🛠️ Developer",
                    value: `${config.dev.behemoth.name}#${config.dev.behemoth.discriminator}`,
                    inline: false,
                  },
                ],
            image: options.image
              ? {
                  url: options.image.url ? options.image.url : null,
                }
              : null,
            timestamp: options.timestamp ? options.timestamp : new Date(),
            footer: options.footer
              ? {
                  text: options.footer.text ? options.footer.text : null,
                  icon_url: options.footer.icon_url
                    ? options.footer.icon_url
                    : null,
                }
              : null,
          }
        : {
            color: colors.primary,
            title: `👋 Hello I'm ${client.name}`,
            author: {
              name: client.name,
              icon_url: message.client.user.avatarURL(),
            },
            description: "I am your personal music bot",
            fields: [
              {
                name: "❓ Support Server",
                value: `${config.support.server.invite_link}`,
                inline: false,
              },
              {
                name: `📑 Vote for ${config.client.name}`,
                value: `${config.client.top_gg_vote_link}`,
                inline: false,
              },
              {
                name: "🛠️ Developer",
                value: `${config.dev.behemoth.name}#${config.dev.behemoth.discriminator}`,
                inline: false,
              },
            ],
            timestamp: new Date(),
          }
    );
  }
}

export class ErrorEmbed extends MessageEmbed {
  constructor(message, options?: EmbedOptions) {
    super(
      options
        ? {
            color: options.color ? options.color : colors.failed,
            title: options.title ? options.title : null,
            url: options.url ? options.url : null,
            author: options.author
              ? {
                  name: options.author.name
                    ? options.author.name
                    : "Oops something went wrong",
                  icon_url: options.author.icon_url
                    ? options.author.icon_url
                    : message.client.user.avatarURL(),
                }
              : {
                  name: "Oops something went wrong...",
                  icon_url: message.client.user.avatarURL(),
                },
            description: options.description
              ? options.description
              : `Please contact ${
                  message.client.users.cache.find(
                    (user) => user.id === dev.behemoth.id
                  ) || `${dev.behemoth.name}#${dev.behemoth.discriminator}`
                } if you keep getting this error!`,
            thumbnail: options.thumbnail ? options.thumbnail : null,
            fields: options.fields ? options.fields : null,
            image: options.image
              ? {
                  url: options.image.url ? options.image.url : null,
                }
              : null,
            timestamp: options.timestamp ? options.timestamp : null,
            footer: options.footer
              ? {
                  text: options.footer.text ? options.footer.text : null,
                  icon_url: options.footer.icon_url
                    ? options.footer.icon_url
                    : null,
                }
              : null,
          }
        : {
            author: {
              name: "Oops something went wrong...",
              icon_url: message.client.user.avatarURL(),
            },
            color: colors.failed,
            description: `Please contact ${
              message.client.users.cache.find(
                (user) => user.id === dev.behemoth.id
              ) || `${dev.behemoth.name}#${dev.behemoth.discriminator}`
            } if you keep getting this error!`,
            timestamp: new Date(),
          }
    );
  }
}

export class QueuedEmbed extends MessageEmbed {
  constructor(
    trackName: string,
    trackLink: string,
    trackDuration: string,
    tracks: any,
    trackRequester: any
  ) {
    let embedString = "Queued ";
    if (trackName && !trackLink) embedString += `**${trackName}**`;
    if (trackName && trackLink)
      embedString += `**[${trackName}](${trackLink})**`;
    if (trackDuration)
      embedString += ` [${formatDuration(parseInt(trackDuration))}]`;
    if (tracks) embedString += ` (${tracks} tracks)`;
    if (trackRequester) {
      if (!trackRequester.id) embedString += ` • <@${trackRequester}>`;
      else embedString += ` • <@${trackRequester.id}>`;
    }

    super({ color: colors.primary, description: embedString });
  }
}

export class PlayingEmbed extends MessageEmbed {
  constructor(track: any, source: TrackSource) {
    let avatarIcon;
    switch (source) {
      case TrackSource.YOUTUBE:
        avatarIcon = resources.youtubeIcon;
        break;
      case TrackSource.SPOTIFY:
        avatarIcon = resources.spotifyIcon;
        break;
      case TrackSource.SOUNDCLOUD:
        avatarIcon = resources.soundcloudIcon;
        break;
      case TrackSource.TWITCH:
        avatarIcon = resources.twitchIcon;
        break;
      default:
        break;
    }
    super({
      author: { name: track.title, icon_url: avatarIcon, url: track.uri },
      color: colors.primary,
      fields: [
        { name: "Artist", value: track.author, inline: true },
        { name: "Requester", value: track.requester, inline: true },
      ],
      thumbnail: { url: track.thumbnail },
      timestamp: new Date(),
    });
  }
}
