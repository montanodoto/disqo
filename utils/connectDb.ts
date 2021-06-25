/* eslint-disable no-console */
import mongoose from 'mongoose';

import MONGODB_URI from 'constants/index';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function dbConnect() {
  await mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .catch(err => {
      console.log(
        `MongoDB connection error. Please make sure MongoDB is running and mongodb env configuration valid. ${err}`,
      );
    });
}

export default dbConnect;
