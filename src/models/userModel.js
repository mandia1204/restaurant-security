import mongoose from 'mongoose';
import bluebird from 'bluebird';

const userSchema = mongoose.Schema({
  name: String,
  userName: String,
  password: String,
  isAdmin: Boolean,
  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  }],
});

mongoose.Promise = bluebird;
export default mongoose.model('User', userSchema);
