import mongoose, { Schema } from 'mongoose';

export const roleSchema = Schema({
  roleName: String,
});

export default mongoose.model('Role', roleSchema);
