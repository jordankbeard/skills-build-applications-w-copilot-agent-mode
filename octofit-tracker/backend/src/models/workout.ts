import mongoose, { Document } from 'mongoose';

export interface WorkoutDoc extends Document {
  _id: string;
  name: string;
  exercises: string[];
  duration: number;
  difficulty: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new mongoose.Schema<WorkoutDoc>(
  {
    name: { type: String, required: true },
    exercises: { type: [String], required: true, default: [] },
    duration: { type: Number, required: true },
    difficulty: { type: String, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Workout = mongoose.models.Workout || mongoose.model<WorkoutDoc>('Workout', workoutSchema);
