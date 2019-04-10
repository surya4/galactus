'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

exports.inititalize = async (dbUrl = 'localhost:27017', dbName = 'galactus') => {
  try {
    await mongoose.connect(`mongodb://${dbUrl}/${dbName}`, { useNewUrlParser: true });
    console.log('Connected to mongo!!!');
  } catch (error) {
    console.log('Could not connect to MongoDB', error);
  }
};
