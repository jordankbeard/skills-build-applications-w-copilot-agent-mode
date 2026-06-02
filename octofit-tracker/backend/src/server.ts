import express, { Express } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

export function createApp(): Express {
  const app = express();
  const port = process.env.PORT ? Number(process.env.PORT) : 8000;
  const codespaceName = process.env.CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;

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

  return app;
}

export function startServer(app: Express, port: number, mongoUri: string): void {
  const codespaceName = process.env.CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;

  app.listen(port, () => {
    console.log(`Backend listening on http://0.0.0.0:${port}`);
    if (codespaceName) {
      console.log(`Codespaces API URL: ${apiUrl}`);
    }
    console.log(`MongoDB connected at ${mongoUri}`);
  });
}
