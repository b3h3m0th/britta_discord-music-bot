const { dev } = require("../config");
module.exports = {
  isDeveloper: async (user) => {
    for (let d in Object.keys(dev)) {
      console.log(d);
      if (d.id === user.id) {
        return true;
      }
    }
  },
};
