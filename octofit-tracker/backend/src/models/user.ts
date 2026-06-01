import mongoose, { Document } from 'mongoose';

export interface UserDoc extends Document {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserDoc>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: 'member' },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model<UserDoc>('User', userSchema);
