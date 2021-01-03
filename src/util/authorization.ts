const config = require("../config");

export const isDeveloper = (user) => {
  for (const d in config.dev) {
    if (config.dev[d].id === user.id) {
      return true;
    }
  }
  return false;
};

export const hasVoted = async (user, client) => {
  const voted = await client.topggAPI.hasVoted(user.id);
  return voted;
};
