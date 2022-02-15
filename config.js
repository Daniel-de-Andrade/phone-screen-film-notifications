const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
  SERVER_PORT,
  MYSQL_PORT,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env;

assert(SERVER_PORT, "Server port is required");

module.exports = {
  SERVER_PORT,
  MYSQL_PORT,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
};
