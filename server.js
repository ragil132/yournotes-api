/* eslint-disable no-console */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
const handleErrors = require("./middlewares/errorHandler");
const { connect } = require("./utils/dbConnection");
require("dotenv").config();
const { logger } = require("./utils/logger");

const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to Database

connect((err, client) => {
  if (err) {
    console.log(err);
  }
});

// Routes

app.use("/", routes);
app.use(handleErrors);

app.listen(port, () => {
  logger.info(`Server listening at http://localhost:${port}`);
});
