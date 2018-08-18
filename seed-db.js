'use strict';
require('dotenv').config();
const mongoose  = require('mongoose');
const { DATABASE_URL } = require('./config');

const Data = require('./models');

const seedData = require('./seed-data');

mongoose.connect(DATABASE_URL)
  .then(() => {
    return mongoose.connection.db.dropDatabase();
  })
  .then(() => {
    return Promise.all([
      Data.insertMany(seedData)
    ]);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.log('seeding db FAILED');
    console.error(`ERROR: ${err.message}`);
    console.error(err);    
  });