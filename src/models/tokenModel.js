import mongoose from 'mongoose';
import bluebird from 'bluebird';

const tokenSchema = mongoose.Schema({
  userName: String,
  refreshToken: String,
});

mongoose.Promise = bluebird;
export default mongoose.model('Token', tokenSchema);
