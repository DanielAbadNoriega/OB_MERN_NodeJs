import mongoose from "mongoose";

export const userEntity = () => {
  let userSchema = new mongoose.Schema(
    {
      name: String,
      mail: String,
      age: Number,
    }
  )

  // Introduce the collection
  return mongoose.model('users', userSchema);
}