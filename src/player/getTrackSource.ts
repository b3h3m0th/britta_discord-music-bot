import { TrackSource } from "../types/Music";

export default (uri: string) => {
  if (uri.includes(TrackSource.SPOTIFY.toLowerCase())) {
    return TrackSource.SPOTIFY;
  } else if (uri.includes(TrackSource.SOUNDCLOUD.toLowerCase())) {
    return TrackSource.SOUNDCLOUD;
  } else if (uri.includes(TrackSource.TWITCH.toLowerCase())) {
    return TrackSource.TWITCH;
  } else {
    return TrackSource.YOUTUBE;
  }
};
