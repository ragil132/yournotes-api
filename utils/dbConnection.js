const { MongoClient } = require("mongodb");
require("dotenv").config();

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);
const dbName = "yourNotesDB";

let db;

const connect = (callback) => {
  client.connect((err, client) => {
    db = client.db(dbName);
    return callback(err, client);
  });
};

const getDb = () => {
  return db;
};

module.exports = { connect, getDb };
