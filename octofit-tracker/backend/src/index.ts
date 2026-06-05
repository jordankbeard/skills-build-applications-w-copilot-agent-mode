import { connectToDatabase, mongoUri } from './config/database';
import { createApp, startServer } from './server';

const port = process.env.PORT ? Number(process.env.PORT) : 8000;

const app = createApp();

connectToDatabase(mongoUri)
  .then(() => {
    startServer(app, port, mongoUri);
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
