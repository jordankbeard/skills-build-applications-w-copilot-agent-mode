import mongoose from 'mongoose';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboardEntry';
import { Team } from '../models/team';
import { User } from '../models/user';
import { Workout } from '../models/workout';

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');
  console.log(`Connecting to ${mongoUri}`);

  await mongoose.connect(mongoUri);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    {
      id: 'u1',
      name: 'Avery Lane',
      email: 'avery.lane@octofit.com',
      role: 'coach',
    },
    {
      id: 'u2',
      name: 'Jordan Blake',
      email: 'jordan.blake@octofit.com',
      role: 'athlete',
    },
    {
      id: 'u3',
      name: 'Maya Chen',
      email: 'maya.chen@octofit.com',
      role: 'athlete',
    },
    {
      id: 'u4',
      name: 'Noah Patel',
      email: 'noah.patel@octofit.com',
      role: 'athlete',
    },
  ]);

  const teams = await Team.insertMany([
    {
      id: 't1',
      name: 'Sunrise Striders',
      description: 'A competitive morning running crew for high-energy endurance workouts.',
      members: ['u1', 'u2', 'u3'],
    },
    {
      id: 't2',
      name: 'Night Owl Training',
      description: 'Evening cross-training team focused on recovery and strength.',
      members: ['u2', 'u4'],
    },
  ]);

  const activities = await Activity.insertMany([
    {
      id: 'a1',
      userId: 'u2',
      teamId: 't1',
      type: 'running',
      durationMinutes: 42,
      caloriesBurned: 380,
      distanceKm: 9.2,
      date: new Date('2026-05-28T07:05:00.000Z'),
      notes: 'Steady 9K morning run with tempo intervals and a strong finish.',
    },
    {
      id: 'a2',
      userId: 'u3',
      teamId: 't1',
      type: 'cycling',
      durationMinutes: 55,
      caloriesBurned: 620,
      distanceKm: 22.4,
      date: new Date('2026-05-27T18:15:00.000Z'),
      notes: 'Hill repeats on the city route with a focus on cadence and recovery.',
    },
    {
      id: 'a3',
      userId: 'u4',
      teamId: 't2',
      type: 'strength',
      durationMinutes: 35,
      caloriesBurned: 300,
      date: new Date('2026-05-29T20:00:00.000Z'),
      notes: 'Full-body strength circuit with weighted squats and kettlebell swings.',
    },
    {
      id: 'a4',
      userId: 'u1',
      type: 'yoga',
      durationMinutes: 25,
      caloriesBurned: 130,
      date: new Date('2026-05-29T09:30:00.000Z'),
      notes: 'Recovery flow focusing on mobility and breathing after a long run.',
    },
  ]);

  const leaderboard = await LeaderboardEntry.insertMany([
    { userId: 'u2', name: 'Jordan Blake', score: 1380, rank: 1 },
    { userId: 'u3', name: 'Maya Chen', score: 1290, rank: 2 },
    { userId: 'u4', name: 'Noah Patel', score: 1175, rank: 3 },
    { userId: 'u1', name: 'Avery Lane', score: 1105, rank: 4 },
  ]);

  const workouts = await Workout.insertMany([
    {
      id: 'w1',
      title: 'Full Body HIIT',
      difficulty: 'medium',
      durationMinutes: 30,
      focusAreas: ['cardio', 'strength', 'core'],
      experienceLevel: 'intermediate',
    },
    {
      id: 'w2',
      title: 'Recovery Yoga',
      difficulty: 'easy',
      durationMinutes: 20,
      focusAreas: ['mobility', 'breathwork'],
      experienceLevel: 'beginner',
    },
    {
      id: 'w3',
      title: 'Weekend Endurance Ride',
      difficulty: 'hard',
      durationMinutes: 75,
      focusAreas: ['endurance', 'leg strength'],
      experienceLevel: 'advanced',
    },
  ]);

  console.log('Seed completed successfully');
  console.log(`Users: ${users.length}`);
  console.log(`Teams: ${teams.length}`);
  console.log(`Activities: ${activities.length}`);
  console.log(`Leaderboard entries: ${leaderboard.length}`);
  console.log(`Workouts: ${workouts.length}`);

  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seed script failed:', error);
  process.exit(1);
});
