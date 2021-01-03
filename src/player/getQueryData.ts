import { Track } from "../types/Music";

const queryRegExes = {
    spotify: /(https?:\/\/open.spotify.com\/(track|user|artist|album)\/[a-zA-Z0-9]+(\/playlist\/[a-zA-Z0-9]+|)|spotify:(track|user|artist|album):[a-zA-Z0-9]+(:playlist:[a-zA-Z0-9]+|))/,
    youtube: 
};

export default (query: string): Track[] => {
  return [{ link: "done" }];
};
