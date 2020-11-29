module.exports = {
  getFormattedTime: (time) => {
    return time < 3600
      ? new Date(time * 1000).toISOString().substr(14, 5)
      : new Date(time * 1000).toISOString().substr(11, 8);
  },
};
