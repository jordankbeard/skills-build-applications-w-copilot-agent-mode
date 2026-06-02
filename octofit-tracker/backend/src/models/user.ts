import mongoose, { Document } from 'mongoose';

export interface UserDoc extends Document {
  _id: string;
  username: string;
  email: string;
  team?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserDoc>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    team: { type: String },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model<UserDoc>('User', userSchema);
