module.exports = {
  development: {
    username: "Miles",
    password: "magic7300",
    database: "nit5.2-db",
    host: "127.0.0.1",
    dialect: "postgres",
    "port": 5432
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
