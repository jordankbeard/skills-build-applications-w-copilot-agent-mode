import express, { Express } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

export function createApp(): Express {
  const app = express();
  const port = process.env.PORT ? Number(process.env.PORT) : 8000;
  const codespaceName = process.env.CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}--8000.app.github.dev`
    : `http://localhost:${port}`;

  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-tracker-backend', apiUrl });
  });

  app.get('/api/users', async (_req, res) => {
    try {
      const data = await User.find().sort({ username: 1 });
      res.json({ data });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });

  app.get('/api/teams', async (_req, res) => {
    try {
      const data = await Team.find().sort({ name: 1 });
      res.json({ data });
    } catch (error) {
      console.error('Error fetching teams:', error);
      res.status(500).json({ error: 'Failed to fetch teams' });
    }
  });

  app.get('/api/activities', async (_req, res) => {
    try {
      const data = await Activity.find().sort({ date: -1 });
      res.json({ data });
    } catch (error) {
      console.error('Error fetching activities:', error);
      res.status(500).json({ error: 'Failed to fetch activities' });
    }
  });

  app.get('/api/leaderboard', async (_req, res) => {
    try {
      const data = await LeaderboardEntry.find().sort({ score: -1 });
      res.json({ data });
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
  });

  app.get('/api/workouts', async (_req, res) => {
    try {
      const data = await Workout.find().sort({ name: 1 });
      res.json({ data });
    } catch (error) {
      console.error('Error fetching workouts:', error);
      res.status(500).json({ error: 'Failed to fetch workouts' });
    }
  });

  return app;
}

export function startServer(app: Express, port: number, mongoUri: string): void {
  const codespaceName = process.env.CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}--8000.app.github.dev`
    : `http://localhost:${port}`;

  app.listen(port, () => {
    console.log(`Backend listening on http://0.0.0.0:${port}`);
    if (codespaceName) {
      console.log(`Codespaces API URL: ${apiUrl}`);
    }
    console.log(`MongoDB connected at ${mongoUri}`);
  });
}
