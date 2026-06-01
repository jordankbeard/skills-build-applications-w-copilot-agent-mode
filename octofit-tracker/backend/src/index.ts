import express from 'express';
import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://8000-${codespaceName}.githubpreview.dev`
  : `http://localhost:${port}`;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-tracker-backend', apiUrl });
});

app.get('/api/users', async (_req, res) => {
  const data = await User.find().sort({ name: 1 });
  res.json({ data });
});

app.get('/api/teams', async (_req, res) => {
  const data = await Team.find().sort({ name: 1 });
  res.json({ data });
});

app.get('/api/activities', async (_req, res) => {
  const data = await Activity.find().sort({ date: -1 });
  res.json({ data });
});

app.get('/api/leaderboard', async (_req, res) => {
  const data = await LeaderboardEntry.find().sort({ rank: 1 });
  res.json({ data });
});

app.get('/api/workouts', async (_req, res) => {
  const data = await Workout.find().sort({ title: 1 });
  res.json({ data });
});

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend listening on http://0.0.0.0:${port}`);
      if (codespaceName) {
        console.log(`Codespaces API URL: ${apiUrl}`);
      }
      console.log(`MongoDB connected at ${mongoUri}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
