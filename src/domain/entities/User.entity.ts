import mongoose from 'mongoose';
import { IUser } from '../interfaces/IUser.interface';

export const userEntity = () => {
  let userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    mail: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
  });

  // Introduce the collection
  return mongoose.models.users || mongoose.model<IUser>('users', userSchema);
};
