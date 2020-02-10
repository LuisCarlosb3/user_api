const Client = require("pg").Client;

let _client;

const connectDatabase = async () => {
  _client = new Client({
    user: "postgres",
    host: "localhost",
    database: "user_api_test",
    password: "root",
    port: "5432"
  });
  return _client.connect();
};

const getConnection = () => {
  if (_client) {
    return _client;
  } else {
    throw "Nenhuma conexão com o banco";
  }
};
module.exports = {
  connectDatabase,
  getConnection
};
