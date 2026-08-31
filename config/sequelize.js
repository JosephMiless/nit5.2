const { Sequelize } = require("sequelize");

  const sequelize = new Sequelize("nit5.2-db", "postgres", "1234567890", {
  host: "localhost",
  dialect: "postgres",
  port: 5433,
});

  // const sequelize = new Sequelize("nit5.2-db", "Miles", "magic7300", {
  //   host: "localhost",
  //   dialect: "postgres",
  //   port: 5432,
  // });


module.exports =  sequelize