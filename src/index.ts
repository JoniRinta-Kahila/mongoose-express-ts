import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import { playerRouter } from './routes/player';
import dotenv from 'dotenv';
import { Server } from 'http';

dotenv.config();

const app = express();
app.use(json());

// routes
app.use(playerRouter);

// listener
const server = app.listen(process.env.APP_PORT);

server.on('listening', () => {
  console.log('Server is UP & RUNNING on PORT', process.env.APP_PORT);
  
  // database connection
  mongoose.connect(process.env.DB_CONNECTION_STRING!, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (err) => {
    console.log(err ? err : 'Connected to database.');
  });

});

server.on('close', () => {
  
  mongoose.disconnect()
    .then(() => console.log('database disconnected'))
    .catch((err) => console.log('Cant  disconnect database', err.message));

  console.log('Server is shutting down');

});

server.on('error', (err) => console.log(err.message));
