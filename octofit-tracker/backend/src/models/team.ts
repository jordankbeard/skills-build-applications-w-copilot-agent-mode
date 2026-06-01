import mongoose, { Document } from 'mongoose';

export interface TeamDoc extends Document {
  id: string;
  name: string;
  description: string;
  members: string[];
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new mongoose.Schema<TeamDoc>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: { type: [String], required: true, default: [] },
  },
  {
    timestamps: true,
  }
);

export const Team = mongoose.models.Team || mongoose.model<TeamDoc>('Team', teamSchema);
