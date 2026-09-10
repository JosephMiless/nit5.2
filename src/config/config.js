const env = require("./env");
module.exports = {
  development: {
    url: env.dburl,
    dialect: "postgres",
  },
  test: {
    url: env.dburl,
    dialect: "postgres",
  },
  production: {
    url: env.dburl,
    dialect: "postgres",
  },
};
