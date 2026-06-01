import mongoose, { Document } from 'mongoose';

export interface WorkoutDoc extends Document {
  id: string;
  title: string;
  difficulty: string;
  durationMinutes: number;
  focusAreas: string[];
  experienceLevel: string;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new mongoose.Schema<WorkoutDoc>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    focusAreas: { type: [String], required: true, default: [] },
    experienceLevel: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Workout = mongoose.models.Workout || mongoose.model<WorkoutDoc>('Workout', workoutSchema);
