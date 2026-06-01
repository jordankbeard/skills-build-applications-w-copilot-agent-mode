import mongoose, { Document } from 'mongoose';

export interface LeaderboardEntryDoc extends Document {
  userId: string;
  name: string;
  score: number;
  rank: number;
  updatedAt: Date;
  createdAt: Date;
}

const leaderboardEntrySchema = new mongoose.Schema<LeaderboardEntryDoc>(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const LeaderboardEntry =
  mongoose.models.LeaderboardEntry ||
  mongoose.model<LeaderboardEntryDoc>('LeaderboardEntry', leaderboardEntrySchema);
