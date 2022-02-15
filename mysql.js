const mysql = require("mysql");
const config = require("./config");

const pool = mysql.createPool({
  port: config.MYSQL_PORT,
  host: config.MYSQL_HOST,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE,
});

module.exports = pool;
