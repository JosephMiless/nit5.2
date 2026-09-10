const { Sequelize } = require("sequelize");
const env = require("./env");

const sequelize = new Sequelize(env.dburl);

module.exports = sequelize;
