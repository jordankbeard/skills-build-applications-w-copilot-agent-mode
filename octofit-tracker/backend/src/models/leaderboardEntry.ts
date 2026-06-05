import mongoose, { Document } from 'mongoose';

export interface LeaderboardEntryDoc extends Document {
  _id: string;
  rank?: number;
  userId: string;
  username?: string;
  score: number;
  team?: string;
  activities?: number;
  updatedAt: Date;
  createdAt: Date;
}

const leaderboardEntrySchema = new mongoose.Schema<LeaderboardEntryDoc>(
  {
    rank: { type: Number },
    userId: { type: String, required: true, unique: true },
    username: { type: String },
    score: { type: Number, required: true },
    team: { type: String },
    activities: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const LeaderboardEntry =
  mongoose.models.LeaderboardEntry ||
  mongoose.model<LeaderboardEntryDoc>('LeaderboardEntry', leaderboardEntrySchema);
