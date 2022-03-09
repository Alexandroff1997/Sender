const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const { Redis } = require('./redis');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4001;

app.use(bodyParser());
app.use('/', require('./routes/router'));

async function start() {
  try {
    const mongoUri = process.env.MONGO_URI;
    mongoose
      .connect(mongoUri)
      .then(() => {
        console.log('DB connection established');
      })
      .catch((err) => {
        console.log(err);
      });

    await Redis.initInstance();

    app.listen(PORT, () =>
      console.log(`Server has been started on port: ${PORT}`)
    );
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

start();
