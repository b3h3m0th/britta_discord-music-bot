const languageData = {
  client: {
    mention: `I'm Britta and my prefix is {prefix}`,
  },

  error: {
    language_no_exists: "This language does not exist",
    mission_language: "You must specify a valid language! (english or turkish)",

    play_args: "Usage: /play <YouTube URL | Video Name | Soundcloud URL>",
    playlist_args: "Usage: /playlist <YouTube Playlist URL | Playlist Name>",
    remove_args: "Usage: {prefix}remove <Queue Number>",

    queue_isnot: "The queue is not paused.",

    command_error: `There was an error executing that command.`,

    joinvoicechannel:
      "You have to be connected to a voice channel before you can use this command!",
    joinvoicechannel_2: "Could not join the channel!",
    joinsamechannel: `{client} You must be in the same channel as`,

    soundcloud: {
      client_id: "Missing Soundcloud Client ID in config",
      piece_not_found: "Could not find that Soundcloud track.",
      piece_error: "There was an error playing that Soundcloud track.",
    },

    matching_video: "No video was found with a matching title",
    matching_playlist: "Playlist not found :(",
    playlist_character: "Playlist larger than character limit...",
    nothing_music: "There is nothing playing.",

    lyrics_not_found: "No lyrics found for **{song.title}**",
  },

  succes: {
    language_updated: "| Bot language updated to {language}",

    playing_music: "✅ {song.title} has been added to the queue by {author}",
    playing_playlist:
      "✅ **${song.title}** has been added to the queue by ${message.author}",
    started_playlist: "| Started a playlist",
    music_remove: "{author} ❌ removed **${song.title}** from the queue.",

    paused_music: "{author} ⏸ paused the music.",
    resumed_music: "${author} ▶ resumed the music!",

    queue_title: "Britta music queue",

    nowplaying_title: "Now Playing",
    nowplaying_lyrics_title: "Lyrics",

    queue_loop: "loop is now",
  },

  warning: {
    cooldown: `please wait **{timeLeft}** more second(s) before reusing the \`{command.name}\` command.`,
  },

  perrmissions: {
    connect:
      "I cannot connect to the audio channel Make sure I have the proper permissions.",
    speak:
      "I cannot speak in this voice channel, make sure I have the proper permissions!",
  },
};

const translate = (key, ...args) => {
  const translation = languageData[key];
  if (typeof translation === "function") return translation(...args);
  else return translation;
};

module.exports = translate;
