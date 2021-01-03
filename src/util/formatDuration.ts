const format = require("format-duration");

export default (ms: any): string => {
  if (ms > 3600000000) return "Live";
  if (isNaN(ms) || typeof ms === "undefined") return "00:00";
  return format(ms);
};
