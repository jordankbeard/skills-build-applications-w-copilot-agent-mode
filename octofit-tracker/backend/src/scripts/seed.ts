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
      username: 'avery_lane',
      email: 'avery.lane@octofit.com',
      team: 'Sunrise Striders',
    },
    {
      username: 'jordan_blake',
      email: 'jordan.blake@octofit.com',
      team: 'Sunrise Striders',
    },
    {
      username: 'maya_chen',
      email: 'maya.chen@octofit.com',
      team: 'Sunrise Striders',
    },
    {
      username: 'noah_patel',
      email: 'noah.patel@octofit.com',
      team: 'Night Owl Training',
    },
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Sunrise Striders',
      description: 'A competitive morning running crew for high-energy endurance workouts.',
      members: ['avery_lane', 'jordan_blake', 'maya_chen'],
      score: 3950,
    },
    {
      name: 'Night Owl Training',
      description: 'Evening cross-training team focused on recovery and strength.',
      members: ['jordan_blake', 'noah_patel'],
      score: 2555,
    },
  ]);

  const activities = await Activity.insertMany([
    {
      user: 'jordan_blake',
      type: 'running',
      duration: 42,
      caloriesBurned: 380,
      date: new Date('2026-05-28T07:05:00.000Z'),
      description: 'Steady 9K morning run with tempo intervals and a strong finish.',
    },
    {
      user: 'maya_chen',
      type: 'cycling',
      duration: 55,
      caloriesBurned: 620,
      date: new Date('2026-05-27T18:15:00.000Z'),
      description: 'Hill repeats on the city route with a focus on cadence and recovery.',
    },
    {
      user: 'noah_patel',
      type: 'strength',
      duration: 35,
      caloriesBurned: 300,
      date: new Date('2026-05-29T20:00:00.000Z'),
      description: 'Full-body strength circuit with weighted squats and kettlebell swings.',
    },
    {
      user: 'avery_lane',
      type: 'yoga',
      duration: 25,
      caloriesBurned: 130,
      date: new Date('2026-05-29T09:30:00.000Z'),
      description: 'Recovery flow focusing on mobility and breathing after a long run.',
    },
  ]);

  const leaderboard = await LeaderboardEntry.insertMany([
    { userId: 'jordan_blake', username: 'jordan_blake', score: 1380, rank: 1, team: 'Sunrise Striders', activities: 8 },
    { userId: 'maya_chen', username: 'maya_chen', score: 1290, rank: 2, team: 'Sunrise Striders', activities: 7 },
    { userId: 'noah_patel', username: 'noah_patel', score: 1175, rank: 3, team: 'Night Owl Training', activities: 6 },
    { userId: 'avery_lane', username: 'avery_lane', score: 1105, rank: 4, team: 'Sunrise Striders', activities: 5 },
  ]);

  const workouts = await Workout.insertMany([
    {
      name: 'Full Body HIIT',
      difficulty: 'medium',
      duration: 30,
      exercises: ['burpees', 'mountain climbers', 'jump squats', 'push-ups'],
      description: 'High-intensity interval training for cardio and strength',
    },
    {
      name: 'Recovery Yoga',
      difficulty: 'easy',
      duration: 20,
      exercises: ['downward dog', 'child pose', 'gentle stretching', 'breathing'],
      description: 'Restorative yoga focusing on mobility and recovery',
    },
    {
      name: 'Weekend Endurance Ride',
      difficulty: 'hard',
      duration: 75,
      exercises: ['sustained climbing', 'interval efforts', 'recovery pace'],
      description: 'Long-distance cycling workout for endurance building',
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
