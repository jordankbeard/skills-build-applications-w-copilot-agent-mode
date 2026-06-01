import mongoose, { Document } from 'mongoose';

export interface ActivityDoc extends Document {
  id: string;
  userId: string;
  teamId?: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  distanceKm?: number;
  date: Date;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new mongoose.Schema<ActivityDoc>(
  {
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    teamId: { type: String },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    distanceKm: { type: Number },
    date: { type: Date, required: true },
    notes: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Activity = mongoose.models.Activity || mongoose.model<ActivityDoc>('Activity', activitySchema);
