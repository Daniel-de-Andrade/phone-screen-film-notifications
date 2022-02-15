const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const { SERVER_PORT } = process.env;

assert(SERVER_PORT, "Server port is required");

module.exports = {
  SERVER_PORT,
};