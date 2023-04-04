import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import cityRoute from './routes/cities.js';
import citizenRoute from './routes/citizens.js';

// app init
const app = express();
dotenv.config();

// server consts
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// middleware
app.use(cors());
app.use(express.json());

// app routes
app.use('/api/cities', cityRoute);
app.use('/api/citizens', citizenRoute);

// connect to mongodb
async function connect() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@steady.r0k4h4t.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    );
    app.listen(PORT, () => {
      console.log(`server started at ${PORT} port`);
    });
  } catch (e) {
    console.log('db connect error: ', e);
  }
}

connect();
