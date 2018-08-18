"use strict";
require('dotenv').config();

const express = require("express");
const cors = require('cors');
const { DATABASE_URL, PORT, CLIENT_ORIGIN } = require("./config");

const app = express();

const mongoose = require("mongoose");
const router = express.Router();

mongoose.Promise = global.Promise;

//ROUTES
const barsRouter = require('./routes/bars');

// CORS
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use(express.json());

//Endpoints
app.use('/', barsRouter);

let server;

// connect to database, then start the server
function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
        .on("error", err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing server");
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { runServer, app, closeServer };
