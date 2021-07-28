/* eslint-disable no-console */
const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
const handleErrors = require("./middlewares/errorHandler");
require("dotenv").config();
const { logger } = require("./utils/logger");

const app = express();
const port = process.env.PORT || 3001;

// Connection URL
const url = process.env.MONGODB_URL;
// Database Name
const dbName = "yourNotesDB";

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to Database

MongoClient.connect(url, (err, client) => {
  const db = client.db(dbName);
  const notesCollection = db.collection("notes");

  app.locals.notesCollection = notesCollection;
});

// Routes

app.use("/", routes);
app.use(handleErrors);

app.listen(port, () => {
  logger.info(`Server listening at http://localhost:${port}`);
});
