const config = require("../config");
const mongoose = require("mongoose");
const User = require("../models/user");
const Guild = require("../models/guild");

export const isDeveloper = (user) => {
  for (const d in config.dev) {
    if (config.dev[d].id === user.id) {
      return true;
    }
  }
  return false;
};

export const hasVoted = async (user: any, client: any) => {
  const voted = await client.topggAPI.hasVoted(user.id);
  return voted;
};

export const hasPremium = async (user: any, client: any) => {
  const u = await User.findOne({ id: user.id });
  if (u && u.premium) return true;
  else return false;
};

export const hasPremiumOrVoted = async (user: any, client: any) => {
  return (await hasVoted(user, client)) || (await hasPremium(user, client));
};
