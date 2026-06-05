import mongoose, { Document } from 'mongoose';

export interface ActivityDoc extends Document {
  _id: string;
  user: string;
  type: string;
  duration: number;
  caloriesBurned: number;
  date: Date;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new mongoose.Schema<ActivityDoc>(
  {
    user: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Activity = mongoose.models.Activity || mongoose.model<ActivityDoc>('Activity', activitySchema);
