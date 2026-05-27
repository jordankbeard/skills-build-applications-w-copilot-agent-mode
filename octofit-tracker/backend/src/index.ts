import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit-tracker';

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'octofit-tracker-backend' });
});

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend listening on http://0.0.0.0:${port}`);
      console.log(`MongoDB connected at ${mongoUri}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
