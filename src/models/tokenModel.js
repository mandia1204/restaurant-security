import mongoose, { Schema } from 'mongoose';

const tokenSchema = Schema({
  userName: String,
  refreshToken: String,
});

export default mongoose.model('Token', tokenSchema);
