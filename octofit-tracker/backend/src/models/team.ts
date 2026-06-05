import mongoose, { Document } from 'mongoose';

export interface TeamDoc extends Document {
  _id: string;
  name: string;
  members: string[];
  score?: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new mongoose.Schema<TeamDoc>(
  {
    name: { type: String, required: true, unique: true },
    members: { type: [String], required: true, default: [] },
    score: { type: Number },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Team = mongoose.models.Team || mongoose.model<TeamDoc>('Team', teamSchema);
