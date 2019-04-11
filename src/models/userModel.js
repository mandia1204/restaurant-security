import mongoose, { Schema } from 'mongoose';

const userSchema = Schema({
  name: String,
  userName: String,
  password: String,
  isAdmin: Boolean,
  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  }],
});

export default mongoose.model('User', userSchema);
