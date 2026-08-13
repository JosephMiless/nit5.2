const { Sequelize } = require("sequelize");

  const sequelize = new Sequelize("nit5.2-db", "postgres", "1234567890", {
  host: "localhost",
  dialect: "postgres",
  port: 5433,
});


module.exports =  sequelize