import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import { playerRouter } from './routes/player';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(json());

// routes
app.use(playerRouter);

// database connection
mongoose.connect(process.env.DB_CONNECTION_STRING!, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  console.log(err ? err : 'Connected to database.');
});

// listener
app.listen(process.env.APP_PORT, () => {
  console.log('Server is UP & RUNNING on PORT', process.env.APP_PORT);
});