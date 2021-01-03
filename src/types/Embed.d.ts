export type EmbedOptions = {
  color?: string;
  title?: string;
  url?: string;
  author?: { name: string; icon_url?: string };
  description?: string;
  thumbnail?: string;
  fields?: { name: string; value: string }[];
  image?: { url: string };
  timestamp?: Date;
  footer?: { text: string; icon_url?: string };
};

export type ErrorEmbebOptions = {
  errorMessage: string;
};
